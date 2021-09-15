import React, { useContext, useState } from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import { css } from '@emotion/core'
import ContextConsumer from '../LayoutItems/CartContext'

const OtherProductCard = ({
  imgData,
  name,
  asin,
  productType,
  price,
  url,
  blur,
}) => {
  return (
    <ContextConsumer>
      {({ addQuantityToCart }) => (
        <div css={cardPadding} className={`row-card fadeItem ${ blur ? 'disabled-link no-select no-drag' : ''}`}>
          <div css={cardContainer}>
            <div css={imgContainer}>
              <div css={imgCover}>
                <div css={cardBottom}>
                  <div css={nameText}>{name}</div>
                  <div css={priceText}>{'$' + price}</div>
                  <div css={productTypeText}>{productType}</div>
                  <div
                  onClick={() => {
                    addQuantityToCart(
                      asin,
                      name,
                      productType,
                      imgData,
                      1,
                      1
                    )
                  }}
                  css={addToCartButton}
                >
                  +
                </div>
                </div>
              </div>
              <Link to={url} className="link-no-style">
                {
                  (blur) && 
                  <div css={imgNSFWOverlay}>
                    <span css={imgNSFWOverlayText}>18+ Content</span>
                  </div>
                }
                <Img css={imgStyles} fluid={{ ...imgData, aspectRatio: 0.7 }} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </ContextConsumer>
  )
}

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
@media only screen and (max-width: 400px) {
  padding-top: 2px;
  font-size: 13px;
}
`

const priceText = css`
position: relative;
font-weight: 700;
color: #fff;
float: right;
font-size: 18px;
text-align: right;
width: 35%;
padding-right: 10px;

@media only screen and (max-width: 768px) {
  padding-top: 2px;
  font-size: 14px;
}
@media only screen and (max-width: 400px) {
  padding-top: 2px;
  font-size: 11px;
}
`

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
@media only screen and (max-width: 400px) {
  padding-top: 2px;
  font-size: 13px;
}
`

const cardPadding = css`
  transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1),
    cubic-bezier(0.645, 0.045, 0.355, 1), cubic-bezier(0.645, 0.045, 0.355, 1),
    cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-duration: 300ms, 300ms, 300ms, 300ms;
  margin-top: 25px;
  margin-bottom: 5px;
  position: relative;
  padding-left: 10px;
  padding-right: 10px;
  border: none;
  margin-bottom: 2px;
  border-radius: 12px;
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
  border-radius: 12px;
  position: relative;
  &:hover {
    box-shadow: 0px 8px 12px 0px rgba(31, 32, 68, 0.16);
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

const imgNSFWOverlay = css`
  display: flex;
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  image-rendering: pixelated;
  background: rgba(0,20,40,.75);
  backdrop-filter: blur(10px);
  opacity:1;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`

const imgNSFWOverlayText = css`
  color: white;
`

const cardBottom = css`
  max-height: 120px;
  bottom: 6px;
  left: 0px;
  position: absolute;
  width: 100%;
`

const addToCartButton = css`
  -webkit-transition: all 0.2s;
  -o-transition: all 0.2s;
  transition: all 0.2s;
  pointer-events: auto;
  padding-left: 0px;
  cursor: pointer;
  background-color: #fff;
  color: #a1bce6;
  font-family: montserrat;
  font-weight: 300;
  line-height: 35px;
  border-radius: 50%;
  height: 24px;
  width: 24px;
  font-size: 22px;
  bottom: 3px;
  right: 7px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  text-align: center;
  z-index: 20;
  @media only screen and (max-width: 400px) {
    height: 20px;
    width: 20px;
    font-size: 16px;
    bottom: 4px;
  }

  &:hover {
    color: #0f346c;
    font-size: 24px;
  }
`

export default OtherProductCard
