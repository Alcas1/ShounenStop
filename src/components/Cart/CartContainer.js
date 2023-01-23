import React from 'react'
import { useStaticQuery, graphql, navigate, Link } from 'gatsby'
import { css } from '@emotion/core'
import { Container, Row } from 'react-bootstrap'
import ContextConsumer from '../LayoutItems/CartContext'

import OrderSummary from './OrderSummary'
import CartProductList from './CartProductList'
import CheckoutProgress from '../Checkout/CheckoutProgress'

const getProduct = flatProduct => {
  return flatProduct.split('|')
}

const CartContainer = () => {
  const productQuery  = useStaticQuery(query);
  const edges = productQuery.products.edges
  const comiketEventInfo = productQuery.comiketEventInfo.edges

  return (
    <ContextConsumer>
      {context => {
        var paidShipping = false;
        var productData = {}
        var totalPrice = 0
        var totalItems = 0
        Object.keys(context).map(key => {
          const cartQuantity = context[key]
          if (
            key !== 'updateCartQuantity' &&
            key !== 'addQuantityToCart' &&
            key !== 'clearCart' &&
            cartQuantity !== undefined
          ) {
            const pricingQuantity = Number(getProduct(key)[1])

            const asin = getProduct(key)[0]
            var productMetadata = {}
            productMetadata = edges.find(x => x.node.frontmatter.asin === asin)
              .node.frontmatter

            if(productMetadata.merchandise === 'weiss' || productMetadata.merchandise === 'comiket'){
              paidShipping = true;
            }

            if(productMetadata.merchandise === 'comiket'){              
              const {preorder, release, eventName} = comiketEventInfo.find(x => x.node.frontmatter.id === productMetadata.eventId).node.frontmatter
              productMetadata.eventName = eventName
              productMetadata.preorder = preorder;
              productMetadata.release = release;
            }

            const productPrice = productMetadata['pricings'].find(
              x => x.quantity === pricingQuantity
            ).price

            productData[key] = {
              metadata: productMetadata,
              price: productPrice,
              quantity: cartQuantity,
            }

            const subtotal = productPrice * cartQuantity
            totalPrice += Number(subtotal)
            totalItems += Number(cartQuantity)
          }
          return null;
        })

        //make variable later
        const shippingData = {
          shippingMethod: {
            name: 'Shounen Style Shipping',
            price: paidShipping ? 8 : 0,
            speed: '1-2 Weeks',
          },
        }

        const orderContext = {
          productData: productData,
          totalItems: totalItems,
          subTotal: totalPrice,
          totalPrice: totalPrice + shippingData.shippingMethod.price,
          shippingInfo: shippingData,
        }
        return (
          <div css={cartStyles}>
            <Container css={containerStyles} fluid>
              <Row>
                <CheckoutProgress orderContext={orderContext} phase={1} />
              </Row>
              <Row>
                {Object.keys(productData).length < 1 ? (
                  <div css={cartEmpty}>
                    <div css={cartEmptyText}>CART EMPTY</div>
                    <Link to="/" css={cartEmptyHome}>SHOP NOW</Link>
                  </div>
                ) : (
                  <>
                    <CartProductList
                      productData={productData}
                      updateCartQuantity={context.updateCartQuantity}
                    />
                    <OrderSummary
                      checkoutNavigate={() =>
                        navigate('/checkout', {
                          state: { orderContext },
                        })
                      }
                      fees={0}
                      orderContext={orderContext}
                      subTotal={orderContext.subTotal}
                      totalItems={orderContext.totalItems}
                      shippingInfo={orderContext.shippingInfo}
                      navigateMessage="Checkout"
                      disableButton={orderContext.totalItems === 0}
                    />
                  </>
                )}
              </Row>
            </Container>
          </div>
        )
      }}
    </ContextConsumer>
  )
}

export default CartContainer

const cartEmptyHome = css`
  width:100%;
`

const cartEmptyText = css`
  width:100%;
`

const cartEmpty = css`
  font-size: 40px;
  height: 400px;
  display: flex;
  flex-wrap:wrap;
  width:100%;
  justify-content: center;
  align-items: center;
  text-align: center;
`

const cartStyles = css`
  min-height: calc(100vh - 120px);
`

const containerStyles = css`
  padding-bottom: 30px;
`

export const query = graphql`
  query CartPageQuery {
    products: allMarkdownRemark(
      filter: { frontmatter: { merchandise: { ne: null } } }
    ) {
      edges {
        node {
          frontmatter {
            asin
            name
            displayName
            eventId
            producttype
            series
            circle
            color
            image {
              childImageSharp {
                fluid(maxWidth: 1000, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            pricings {
              quantity
              price
            }
            weight
            preorder(formatString: "MMM DD")
            release(formatString: "MMM DD")
            merchandise
          }
        }
      }
    }
    comiketEventInfo: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/comiketEvents/" } }
    ) {
      edges {
        node {
          frontmatter {
            eventName
            eventDesc
            currentEvent
            preorder(formatString: "MMM DD")
            release(formatString: "MMM DD")
            id
          }
        }
      }
    }
  }
`
