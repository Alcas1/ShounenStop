import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import ProductPageContainer from '../components/Products/ProductPageContainer'

import SEO from '../components/Common/seo'

const Products = () => {
  const edges = useStaticQuery(query).products.edges

  return (
    <>
      <SEO title="Shop" />
      <ProductPageContainer />
    </>
  )
}

export default Products

export const query = graphql`
  query ProductsQuery {
    products: allMarkdownRemark(
      filter: { frontmatter: { merchandise: { ne: null } } }
    ) {
      edges {
        node {
          frontmatter {
            asin
            name
            displayName
            producttype
            series
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
  }
`
