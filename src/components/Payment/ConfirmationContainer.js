import React, { useEffect } from 'react'
import { useStaticQuery, graphql, navigate } from 'gatsby'
import Img from 'gatsby-image'
import { css } from '@emotion/core'
import { Container, Row } from 'react-bootstrap'
import CheckoutProgress from '../Checkout/CheckoutProgress'
import CheckoutHeader from '../Checkout/CheckoutHeader'
import CartProduct from '../Cart/CartProduct'
import { window } from 'browser-monads';

const getProduct = flatProduct => {
  return flatProduct.split('|')
}

const ConfirmationContainer = ({ orderContext }) => {
  const checkmarkImageData = useStaticQuery(query).checkmarkImage
    .childImageSharp.fluid
  useEffect(()=>{
    window.onbeforeunload = null
  })

  return (
    <Container fluid css={centerContainer}>
      <Row css={shiftRight}>
        <CheckoutProgress orderContext={orderContext} phase={4} />
      </Row>
      <Row>
        <div
          css={confirmationContainer}
          className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12"
        >
          <CheckoutHeader
            header="Confirmation"
            headerNavigate={() => {
              navigate('/')
            }}
          />

          <div css={receiptContainer}>
            <div css={receiptHeader}>
              <div>Your Request Has Been Placed</div>
              <Img css={checkmarkImage} fluid={checkmarkImageData}></Img>
            </div>
            <div css={thanksContainer}>
              <div>
                <p>
                  {'You will receive a confirmation email shortly at: '}
                  <b>{orderContext.userInfo.email}</b>
                </p>
                <p>
                  Once we ship your item(s), you will receive another email
                  with tracking instructions.{' '}
                </p>
                Thank you for choosing Shounen Stop.
              </div>
            </div>
            <div css={shippingContainer}>
              <div css={shippingContainerInner}>
                <div css={shippingDetailsContainer}>
                  <div css={shippingMethodContainer}>
                    <div css={shippingMethodHeader}>Shipping Method</div>
                    <div css={shippingMethodText}>
                      <span css={shippingLine}>
                        {orderContext.shippingInfo.shippingMethod.name}
                      </span>
                      <span css={shippingLine}>
                        {orderContext.shippingInfo.shippingMethod.speed}
                      </span>
                      <span css={shippingLine}>
                        {'$' + orderContext.shippingInfo.shippingMethod.price}
                      </span>
                    </div>
                  </div>
                  <div css={shippingAddressContainer}>
                    <div css={shippingAddressHeader}>Shipping Address</div>
                    <div css={shippingAddressText}>
                      <span css={addressLine}>
                        {orderContext.userInfo.firstName +
                          ' ' +
                          orderContext.userInfo.lastName}
                      </span>
                      <span css={addressLine}>
                        {orderContext.userInfo.address +
                          ' ' +
                          orderContext.userInfo.apt}
                      </span>
                      <span css={addressLine}>
                        {orderContext.userInfo.city +
                          ', ' +
                          orderContext.userInfo.state +
                          ', ' +
                          orderContext.userInfo.zip +
                          ', USA'}
                      </span>
                      <span css={addressLine}>
                        {orderContext.userInfo.email}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div css={receiptInner}>
              <div css={orderDetailsHeader}>Details</div>
              <>
                {Object.keys(orderContext.productData).map(key => {
                  const cartProductData = orderContext.productData[key]
                  const imgData =
                    cartProductData.metadata.image.childImageSharp.fluid
                  const asin = cartProductData.metadata.asin
                  var productName = ''
                  if (cartProductData.metadata.merchandise === 'weiss') {
                    productName = cartProductData.metadata.displayName
                  } else if (
                    cartProductData.metadata.merchandise === 'comiket'
                  ) {
                    productName =
                      cartProductData.metadata.eventName +
                      ' ' +
                      cartProductData.metadata.producttype
                  } else if (cartProductData.metadata.merchandise === 'other') {
                    productName = cartProductData.metadata.name
                  }
                  const productType = cartProductData.metadata.producttype
                  const primaryColor = cartProductData.metadata.color
                  const price = cartProductData.price
                  const url =
                    '/products/' +
                    cartProductData.metadata.merchandise +
                    '/' +
                    asin.toLowerCase() +
                    '/'
                  const releaseDate =
                    cartProductData.metadata.release !== 'Invalid date'
                      ? cartProductData.metadata.release
                      : ''
                  const initialCartQuantity = cartProductData.quantity
                  return (
                    <CartProduct
                      key={key}
                      pricingQuantity={getProduct(key)[1]}
                      imgData={imgData}
                      asin={asin}
                      productName={productName}
                      productType={productType}
                      primaryColor={primaryColor}
                      price={price}
                      url={url}
                      releaseDate={releaseDate}
                      initialCartQuantity={initialCartQuantity}
                    />
                  )
                })}
              </>
            </div>
            <div css={orderTotal}>
              <div css={orderSummary}>
                <div css={subTotalContainer}>
                  <div css={subTotalText}>
                    {'Subtotal (' + orderContext.totalItems + ' items)'}
                  </div>
                  <div css={subTotalAmount}>
                    {'$' + orderContext.subTotal.toFixed(2)}
                  </div>
                </div>
                <div css={shippingTotalContainer}>
                  <div css={shippingTotalText}>
                    {orderContext.shippingInfo.shippingMethod.name}
                  </div>
                  <div css={shippingTotalAmount}>
                    {'$' +
                      orderContext.shippingInfo.shippingMethod.price.toFixed(2)}
                  </div>
                </div>
                <div css={feesTotalContainer}>
                  <div css={feesTotalText}>Goods and Services fees</div>
                  <div css={feesTotalAmount}>
                    {'$' + (orderContext.paypalFeeInfo.paypalFeesEnabled
                      ? orderContext.paypalFeeInfo.paypalFees
                      : 0).toFixed(2)}
                  </div>
                </div>
                <div css={totalBar}></div>
                <div css={orderTotalContainer}>
                  <div css={orderTotalText}>Total</div>
                  <div css={orderTotalAmount}>
                    {'$' + orderContext.paypalFeeInfo.currentTotal.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Row>
    </Container>
  )
}

export default ConfirmationContainer

const centerContainer = css`
  max-width: 1200px;
`

const shippingContainer = css`
  position: relative;
  padding-bottom: 20px;
  margin-top: 20px;
  justify-content: center;
  display: flex;
`

const shippingContainerInner = css`
  margin-left: 20px;
  margin-right: 20px;
  width: calc(100% - 40px);
`

const thanksContainer = css`
  margin-left: 20px;
  margin-right: 20px;
  font-size: 18px;
  padding-top: 20px;
  padding-bottom: 20px;
  text-align: center;
`

const checkmarkImage = css`
  width: 25px;
  margin-left: 8px;
  margin-right: 10px;
  margin-top: -3px;
`

const shiftRight = css`
  // margin-left: 5px;
`
const receiptHeader = css`
  display: flex;
  font-family: varela round;
  font-weight: 700;
  color: #0f346c;
  padding-top: 5px;
  // padding-right:5px;
  font-size: 24px;
  align-items: center;
  justify-content: center;
  align-content: center;
  text-align: center;
`
const receiptInner = css`
  margin-left: 20px;
  margin-right: 20px;
`

const confirmationContainer = css``

const receiptContainer = css`
  width: 100%;
  box-shadow: rgba(31, 32, 68, 0.16) 0px 2px 8px 0px;
  padding-bottom: 10px;
  margin-bottom: 20px;
  border-radius: 12px;
  font-size: 15px;
  background-color: #fff;
`

const shippingDetailsContainer = css`
  align-content: space-around;
  display: flex;
  justify-content: center;
`

const header = css`
  font-family: varela round;
  font-weight: 700;
  color: #0f346c;
  padding-top: 5px;
  font-size: 20px;
  width: 100%;
`

const shippingMethodHeader = css`
  font-weight: 700;
  color: #151515;
  width: 100%;
`

const shippingMethodContainer = css`
  // width: calc(50% - 15px);

  float: left;
  font-family: lato;
  margin-top: 10px;
  font-size: 18px;
`

const shippingMethodText = css`
  font-size: 15px;
`

const shippingLine = css`
  margin-top: 3px;
  display: block;
`

const addressLine = css`
  margin-top: 3px;
  display: block;
`

const shippingAddressHeader = css`
  font-weight: 700;
  color: #151515;
  width: 100%;
`

const shippingAddressContainer = css`
  float: left;
  padding-left: 30px;
  // width: calc(50% - 15px);
  font-family: lato;
  margin-top: 10px;
  font-size: 18px;
`

const shippingAddressText = css`
  font-size: 15px;
`

const orderDetailsHeader = css`
  font-size: 20px;
  font-family: varela round;
  font-weight: 700;
  color: #0f346c;
  padding-bottom: 20px;
`

const orderTotal = css`
  // width: 100%;
  padding-left: 20px;
  padding-right: 20px;
`

const feesTotalText = css`
  float: left;
`

const feesTotalAmount = css`
  color: #151515;
  font-weight: 700;
  float: right;
`

const feesTotalContainer = css`
  clear: both;
  position: relative;
  padding-top: 20px;
  font-family: Lato;
  width: 100%;
`

const totalPadding = css`
  position: relative;
  height: 35px;
`

const pricingContainer = css`
  padding-right: 10px;
  padding-left: 10px;
  padding-bottom: 20px;
`

const pricesContainer = css`
  box-shadow: rgba(31, 32, 68, 0.16) 0px 2px 8px 0px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;

  border-radius: 12px;
  font-size: 15px;
  background-color: #fff;
`
const orderSummary = css`
  position: relative;
  width: 100%;
`

const subTotalText = css`
  float: left;
`

const subTotalAmount = css`
  color: #151515;
  font-weight: 700;
  float: right;
`

const subTotalContainer = css`
  padding-top: 20px;
  font-family: Lato;
  width: 100%;
`

const totalBar = css`
  background-color: #e6e6ea;
  margin-top: 45px;
  height: 1px;
  clear: both;
  position: relative;
`

const orderTotalText = css`
  // color: #b4b9c4;
  font-size: 20px;
  font-weight: 700;
  float: left;
`

const orderTotalAmount = css`
  color: #151515;
  font-size: 20px;

  font-weight: 700;
  float: right;
`

const orderTotalContainer = css`
  clear: both;
  min-height: 60px;
  position: relative;
  padding-top: 20px;
  color: #151515;
  font-family: lato;
  width: 100%;
`

const shippingTotalText = css`
  float: left;
`

const shippingTotalAmount = css`
  color: #151515;
  font-weight: 700;
  float: right;
`

const shippingTotalContainer = css`
  clear: both;
  position: relative;
  padding-top: 20px;
  font-family: Lato;
  width: 100%;
`

export const query = graphql`
  query {
    checkmarkImage: file(relativePath: { eq: "checkmarkFilled.png" }) {
      childImageSharp {
        fluid(maxWidth: 512, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
