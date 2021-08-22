import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { css } from '@emotion/core'

import BackgroundImage from 'gatsby-background-image'

const ComiketBanner = () => {
  const { landingImage } = useStaticQuery(graphql`
    query {
      landingImage: file(relativePath: { eq: "AirComiket2.png" }) {
        childImageSharp {
          fluid(maxWidth: 3000, quality: 80) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  const imageData = landingImage.childImageSharp.fluid
  return (
    <BackgroundImage
      css={landingStyles}
      fluid={imageData}
      backgroundColor={`#fefefe`}
    >
      <div css={landingSection}>
        <div css={landingText}>
          Sunshine Summer 21
          <div css={lineBreakSm}></div>
          <span css={shippingText}>
            All New Playmats and Sleeves!
            <br/> Preorder by June 16th
          </span>
        </div>
        <div css={lineBreakLg}></div>
        <Link to="/products/comiket">
          <div css={shopNow}>
            <span>EXPLORE COMIKET</span>
          </div>
        </Link>
      </div>
    </BackgroundImage>
  )
}

const landingStyles = css`
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  opacity: 1 !important;
  height: 500px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 10px 0 rgba(0, 0, 0, 0.2), 0 1px 0 0 rgba(0, 0, 0, 0.2);
  margin-bottom: 50px;
`

const shopNow = css`
  font-size: 1.25rem;
  letter-spacing: 2px;
  width: 300px;
  height: 80px;
  border: solid 1px #fff;
  display: flex;
  color: #fff;
  text-align: center;
  align-items: center;
  justify-content: center;

  transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1),
    cubic-bezier(0.645, 0.045, 0.355, 1), cubic-bezier(0.645, 0.045, 0.355, 1),
    cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-duration: 300ms, 300ms, 300ms, 300ms;

  &:hover,
  &:active {
    font-size: 24px;
    background-color: #fff;
    color: #000;
    width: 320px;
    height: 90px;
  }
`

const landingText = css`
width: 85%;
font-size: 25px;
color: #fff;
`

const shippingText = css`
  width: 80%;
  font-size: 20px;
  color: #f0f0f0;
`

const landingSection = css`
  max-width: 800px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
`

const lineBreakLg = css`
  height: 50px;
  width: 100%;
`

const lineBreakSm = css`
  height: 10px;
  width: 100%;
`

export default ComiketBanner
