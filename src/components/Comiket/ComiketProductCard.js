import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import { css } from '@emotion/core'
import ContextConsumer from '../LayoutItems/CartContext'

const ComiketProductCard = ({
  imgData,
  asin,
  eventName,
  productType,
  price,
  url,
  onsale,
  delay,
  blur
}) => {
  var initialVisible = false
  if (delay <= 0) {
    initialVisible = true;
  }

  const [visible, setVisible] = useState(initialVisible);
  const [nsfwVisible, setNsfwVisible] = useState(false)

  useEffect(() => {
    let timer = setTimeout(() => {
      setVisible(true);
    }, delay);

    return () => {
      clearTimeout(timer)
    }
  }, [delay]);

  useEffect(() => {
    let nsfwTimer = setTimeout(() => {
      setNsfwVisible(blur);
    }, delay)

    return () => {
      clearTimeout(nsfwTimer)
    }
  }, [blur]);

  return (
    visible &&
    <ContextConsumer>
      {({ addQuantityToCart }) => (
        <div css={cardPadding} className="fadeItem row-card">
          <div css={cardContainer}>
            <div css={imgContainer}>
              <div css={imgCover}>
                <div css={productTypeText}>{productType}</div>
                <div css={priceText}>{'$' + price}</div>
                {onsale && <div
                  onClick={() => {
                    addQuantityToCart(
                      asin,
                      eventName + ' ' + productType,
                      productType,
                      imgData,
                      1,
                      1
                    )
                  }}
                  css={addToCartButton}
                >
                  +
                </div>}
              </div>
              <Link to={url} className="link-no-style">
                <Img css={(!blur && !nsfwVisible) ? imgStyles : imgBlurredStyles} fluid={{ ...imgData, aspectRatio: 1 }} />
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
    rgba(0, 0, 0, 0.05) 70%,
    rgba(0, 0, 0, 0.4) 82%,
    rgba(0, 0, 0, 0.7) 100%
  );
  z-index: 1;
  border-radius: 8px;
`

const cardPadding = css`
margin-top: 25px;
margin-bottom: 5px;
position: relative;
padding-left: 10px;
padding-right: 10px;
border: none;
margin-bottom: 2px;
border-radius: 8px;
will-change: transform, opacity;
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
  border-radius: 8px;
  position: relative;

  &:hover {
    box-shadow: 0px 8px 12px 0px rgba(31, 32, 68, 0.16);
  }
`

const imgContainer = css`
  transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1),
    cubic-bezier(0.645, 0.045, 0.355, 1), cubic-bezier(0.645, 0.045, 0.355, 1),
    cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-duration: 300ms, 300ms, 300ms, 300ms;
  position: relative;
  width: 100%;
  cursor: pointer;
`

const imgStyles = css`
  border-radius: 8px;
`

const imgBlurredStyles = css`
  border-radius: 8px;
  filter: blur(4px);
  -webkit-filter: blur(4px);
`

const productTypeText = css`
  bottom: 5px;
  left: 10px;
  position: absolute;
  font-size: 20px;
  color: #fff;
  @media only screen and (max-width: 400px) {
    font-size: 13px;
  }
`

const priceText = css`
  bottom: 5px;
  right: 40px;
  position: absolute;
  color: #fff;
  font-size: 18px;
  @media only screen and (max-width: 400px) {
    font-size: 13px;
    right: 27px;
  }
`

const addToCartButton = css`
  -webkit-transition: all 0.2s;
  -o-transition: all 0.2s;
  transition: all 0.2s;
  pointer-events: auto;
  padding-left: 0px;
  cursor: pointer;
  background-color: #fff;
  color: #0f346c;

  font-family: montserrat;
  font-weight: 300;
  line-height: 35px;
  border-radius: 50%;
  height: 24px;
  width: 24px;
  font-size: 22px;
  bottom: 8px;
  right: 7px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  text-align: center;
  z-index: 20;
  @media only screen and (max-width: 400px) {
    height: 16px;
    width: 16px;
    font-size: 16px;
    bottom: 7px;
  }

  &:hover {
    color: #a1bce6;
    font-size: 24px;
  }
`

export default ComiketProductCard
