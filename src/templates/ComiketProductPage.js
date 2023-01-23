import React from 'react'

import { useStaticQuery, graphql } from 'gatsby'

import ComiketProductPageContainer from '../components/Comiket/ComiketProductPageContainer'

const ComiketProductPage = ({ data }) => {
  const {
    image,
    asin,
    eventId,
    producttype,
    pricings,
    description,
    onsale,
  } = data.comiketProduct.frontmatter
  const eventInfo = data.comiketEventInfo.edges.find(
    x => x.node.frontmatter.id === eventId
  ).node.frontmatter

  const price = pricings[0].price

  return (
    <>
      <ComiketProductPageContainer
        imgData={image.childImageSharp.fluid}
        asin={asin}
        eventInfo={eventInfo}
        productType={producttype}
        price={price}
        description={description}
        onsaleOverride={onsale}
      />
    </>
  )
}

export default ComiketProductPage

export const ComiketProductTemplateQuery = graphql`
  query ComiketProductPageQuery($slug: String!) {
    comiketProduct: markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        asin
        producttype
        eventId
        circle
        image {
          childImageSharp {
            fluid(maxWidth: 800, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        onsale
        pricings {
          quantity
          price
        }
        description
        weight
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
            onsale
            preorder(formatString: "MMM DD")
            release(formatString: "MMM DD")
            id
          }
        }
      }
    }
  }
`
