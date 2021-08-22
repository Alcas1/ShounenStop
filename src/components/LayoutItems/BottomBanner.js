import React, { useState, useLayoutEffect,useMemo, useEffect, useCallback } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import iconInfo from '../../images/infoIcon.svg'

import { css } from '@emotion/core'

const bannerDismissedKey = 'bannerDismissed'

function getBannerDismissed() {
  if (sessionStorage.getItem(bannerDismissedKey) === null) {
    sessionStorage.setItem(bannerDismissedKey, JSON.stringify(false))
    return false
  }
  return JSON.parse(sessionStorage.getItem(bannerDismissedKey))
}

function dismissBanner() {
  sessionStorage.setItem(bannerDismissedKey, true)
}

const BottomBanner = () => {
  const data = useStaticQuery(query)
  const [bannerDismissed, setBannerDismissed] = useState(false)

  useLayoutEffect(()=>{
    setBannerDismissed(getBannerDismissed())
  })

  const Banner = useCallback(() => (
    (
      !bannerDismissed && <div css={bottomBannerFullscreenOverlay}>
          <div css={bottomBannerContainer}>
          <div css={bannerTextContainer}>
            <img css={infoIconStyles} src={iconInfo}></img>
            {data.bottomBannerText.frontmatter.bannerText}
          </div>
          <div css={dismissButtonContainer}>
            <div
              css={dismissButton}
              onClick={() => {
                setBannerDismissed(true)
                dismissBanner()
              }}
            >
              Got It ✔
            </div>
          </div>
        </div>
      </div>
  )))

  return(<div className="bannerFade"><Banner/></div>)
}

const bottomBannerFullscreenOverlay = css`
  display: flex;
  align-items: flex-end;
  position: fixed;
  z-index: 9999;
  top: 0;
  height: 100vh;
  width: 100%;
  backdrop-filter: blur(2px);
  background: rgba(0, 10, 20, 0.5);
`

const bannerTextContainer = css`
  padding: 30px;

  @media only screen and (max-width: 640px) {
    padding: 15px 15px 0 15px;
  }
`

const infoIconStyles = css`
  height: 20px;
  width: 20px;
  // vertical-align: middle;
  position: relative;
  top:-2px;
  padding-right:5px;
  `

const bottomBannerContainer = css`
  width: 100%;
  color: #dcecff;
  font-size: 1rem;
  font-family: montserrat;
  background: #13346c;
  display: flex;
  align-items: center;

  @media only screen and (max-width: 640px) {
    flex-direction: column;
  }
`

const dismissButtonContainer = css`
  padding: 15px;
  width: 100%;
`

const dismissButton = css`
  cursor: pointer;
  color: rgba(255, 255, 255, 0.8); */
  padding: 15px 30px;
  background: lightseagreen;
  text-align: center;
  font-weight: bold;
  font-size: 1rem;
  padding: 15px 30px;
  border-radius: 4px;

  transition: color ease-in-out 0.25s;
  &:hover {
    color: rgba(255, 255, 255, 1);
  }
`

export default BottomBanner

export const query = graphql`
  query BottomBannerQuery {
    bottomBannerText: markdownRemark(
      fields: { slug: { eq: "/bottomBanner/" } }
    ) {
      frontmatter {
        bannerText
      }
    }
  }
`
