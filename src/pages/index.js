import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import LandingImage from '../components/Index/landingImage'
import ComiketBanner from '../components/Index/ComiketBanner'
import NewReleases from '../components/Index/newReleases'
import SEO from '../components/Common/seo'

// Test

const IndexPage = () => {
  const data = useStaticQuery(query)
  const {
    landingText,
    landingSubtitle,
    landingImage,
    release1,
    release2,
    release3,
  } = data.landingPageInfo.frontmatter

  var release1Data
  if (release1 !== '') {
    release1Data = data.weissProducts.edges.find(
      x => x.node.frontmatter.asin.toLowerCase() === release1.toLowerCase()
    ).node
  }
  var release2Data
  if (release2 !== '') {
    release2Data = data.weissProducts.edges.find(
      x => x.node.frontmatter.asin.toLowerCase() === release2.toLowerCase()
    ).node
  }
  var release3Data
  if (release3 !== '') {
    release3Data = data.weissProducts.edges.find(
      x => x.node.frontmatter.asin.toLowerCase() === release3.toLowerCase()
    ).node
  }

  const newReleaseData = {
    release1: release1Data,
    release2: release2Data,
    release3: release3Data,
  }

  return (
    <>
      <SEO title="Home" keywords={[`Shounen`, `Stop`, `Weiss`]} />
      <LandingImage
        landingImageData={landingImage}
        landingText={landingText}
        landingSubtitle={landingSubtitle}
      />
      <NewReleases releaseList={newReleaseData} />
      <ComiketBanner />
    </>
  )
}
export default IndexPage

export const query = graphql`
  query IndexPageQuery {
    landingPageInfo: markdownRemark(fields: { slug: { eq: "/landingPage/" } }) {
      frontmatter {
        landingText
        landingSubtitle
        producttype
        landingImage {
          childImageSharp {
            fluid(maxWidth: 2000, quality: 90) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        release1
        release2
        release3
      }
    }
    weissProducts: allMarkdownRemark(
      filter: { frontmatter: { merchandise: { eq: "weiss" } } }
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
                fluid(maxWidth: 500, quality: 90) {
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
          fields {
            slug
          }
        }
      }
    }
  }
`
