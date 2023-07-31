import React from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/core'
import BackgroundImage from 'gatsby-background-image'

const LandingImage = ({ landingImageData, landingText, landingSubtitle }) => {
  const imageData = landingImageData.childImageSharp.fluid
  return (
    <BackgroundImage
      css={landingStyles}
      fluid={imageData}
      backgroundColor={`#fefefe`}
    >
      <div css={landingSection}>
        <div css={landingTextStyles}>
          {landingText}
          <div css={lineBreakSm}></div>
          <span css={shippingText}>{landingSubtitle}</span>
        </div>
        <div css={lineBreakSm}></div>
        <Link to="/products/comiket">
          <div css={shopNow}>
            <span>EXPLORE NOW</span>
          </div>
        </Link>
      </div>
    </BackgroundImage>
  )
}

const landingStyles = css`
  background-color: rgba(0, 10, 20, 0.85);
  width: 100%;
  opacity: 1 !important;
  height: 420px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 10px 0 rgba(0, 0, 0, 0.2), 0 1px 0 0 rgba(0, 0, 0, 0.2);
`

const landingTextStyles = css`
  padding: 15px;
  max-width: 640px;
  font-size: 1.8rem;
  font-weight: bold;
  color: #fff;
`

const shippingText = css`
  width: 80%;
  font-size: 20px;
  color: #f0f0f0;
`

const shopNow = css`
  font-size: 1.25rem;
  letter-spacing: 2px;
  padding: 15px 30px;
  background: deepskyblue;
  font-weight: bold;
  box-shadow: 0 2px 16px -4px deepskyblue;
  display: flex;
  color: #fff;
  text-align: center;
  align-items: center;
  justify-content: center;

  transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1),
    cubic-bezier(0.645, 0.045, 0.355, 1), cubic-bezier(0.645, 0.045, 0.355, 1),
    cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-duration: 300ms, 300ms, 300ms, 300ms;

  &:hover, &:active{
    background-color: #fff;
    color: #000;
  }
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

export default LandingImage
