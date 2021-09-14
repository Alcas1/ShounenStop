import React, { useState } from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import { css } from '@emotion/core'
import ContextConsumer from '../LayoutItems/CartContext'

const WeissProductCardNew = ({
  imgData,
  displayName,
  asin,
  color,
  productType,
  preorder,
  lowPrice,
  url,
  blur,
}) => {
  const nameText = css`
    position: relative;
    font-size: 18px;
    padding-left: 10px;

    font-weight: 700;
    letter-spacing: 1.3px;
    color: #fff;
    width: 65%;
    float: left;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    @media only screen and (max-width: 450px) {
      padding-top: 2px;
      font-size: 13px;
    }
  `

  return (
    <ContextConsumer>
      {({ addQuantityToCart }) => (
        <div css={cardPadding} className="row-card fadeItem">
          <div css={cardStatus}>{preorder !== null ? preorder : ''}</div>
          <div css={cardContainer}>
            <div css={imgContainer}>
              <div css={imgCover}>
                <div css={cardBottom}>
                  <div css={nameText}>{displayName}</div>
                  <div css={priceText}>{'From $' + lowPrice.toFixed(2)}</div>
                  <div css={productTypeText}>{productType}</div>
                </div>
              </div>
              <Link to={url} className="link-no-style">
                <Img css={blur ? imgBlurredStyles : imgStyles} fluid={{ ...imgData, aspectRatio: 0.7 }} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </ContextConsumer>
  )
}

const cardBottom = css`
  max-height: 120px;
  bottom: 6px;
  left: 0px;
  position: absolute;
  width:100%;
`

const productTypeText = css`
  padding-left: 10px;
  font-size: 14px;
  color: #fff;
  width: 65%;
  position: relative;

  float: left;
  clear: left;
  max-height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  @media only screen and (max-width: 450px) {
    padding-top: 2px;
    font-size: 13px;
  }
`

const priceText = css`
  position: relative;
  font-weight: 700;
  color: #fff;
  float: right;
  font-size: 16px;
  text-align: right;
  width: 35%;
  padding-right: 10px;

  @media only screen and (max-width: 768px) {
    padding-top: 2px;
    font-size: 14px;
  }
  @media only screen and (max-width: 450px) {
    padding-top: 2px;
    font-size: 11px;
  }
`

const imgCover = css`
  font-family: montserrat;
  pointer-events: none;

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.03) 60%,
    rgba(0, 0, 0, 0.15) 70%,
    rgba(0, 0, 0, 0.4) 82%,
    rgba(0, 0, 0, 0.5) 100%
  );
  z-index: 1;
  border-radius: 6px;
`

const cardPadding = css`
  margin-top: 25px;
  margin-bottom: 5px;
  position: relative;
  padding-left: 10px;
  padding-right: 10px;
  border: none;
  margin-bottom: 2px;
  transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1),
    cubic-bezier(0.645, 0.045, 0.355, 1), cubic-bezier(0.645, 0.045, 0.355, 1),
    cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-duration: 300ms, 300ms, 300ms, 300ms;
  &:hover {
    transform: scale(1.03);
  }
`

const cardContainer = css`
  background-color: #fff;
  box-shadow: 0px 2px 8px 0px rgba(31, 32, 68, 0.16);

  transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1),
    cubic-bezier(0.645, 0.045, 0.355, 1), cubic-bezier(0.645, 0.045, 0.355, 1),
    cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-duration: 300ms, 300ms, 300ms, 300ms;
  border-radius: 6px;
  position: relative;
  &:hover {
    box-shadow: 0px 12px 16px 0px rgba(31, 32, 68, 0.3);
  }
`

const imgContainer = css`
  position: relative;
  width: 100%;
  cursor: pointer;
`

const imgStyles = css`
  border-radius: 6px;
`

const imgBlurredStyles = css`
  border-radius: 6px;
  filter: blur(4px);
  -webkit-filter: blur(4px);
`

const cardStatus = css`
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.4);
  position: absolute;
  top: 5px;
  left: 0;
  font-size: 14px;
  letter-spacing: 1.5px;
  line-height: 30px;
  padding-left: 5px;
  padding-right: 5px;
  font-weight: 300;
  background-color: #0f346c;
  z-index: 1;
  color: #fff;
`

export default WeissProductCardNew
