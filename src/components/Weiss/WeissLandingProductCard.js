import React, { useState, useContext } from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import { css } from '@emotion/core'
import ContextConsumer from '../LayoutItems/CartContext'
import ScrollContainer from 'react-indiana-drag-scroll'
import { NSFWContext } from '../../utils/NSFWContext'

const WeissLandingProductCard = ({
  imgData,
  cardClassName,
  asin,
  series,
  displayName,
  productType,
  preorderDate,
  releaseDate,
  pricings,
  price,
  lowPrice,
  color,
  url,
}) => {
  const { NSFWEnabled } = useContext(NSFWContext)

  const [quantity, setQuantity] = useState(1)

  const cardBottom = css`
    color: #0f346c;
    font-family: varela round;
    border-top: solid 3px ${color};

    -webkit-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
    border-radius: 2px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;

    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);

    min-height: calc(10% + 180px);
    width: calc(100% - 20px);

    background-color: #fff;
    position: absolute;
    bottom: 10px;
    left: 10px;

    padding-top: 5px;
    padding-left: 10px;
    padding-right: 10px;

    opacity: 0.95;
  `

  const displayNameText = css`
    padding-top: 5px;

    color: ${color};
    position: relative;
    float: left;
    font-weight: 700;
    font-size: 19px;
    text-align: left;
    line-height: 20px;
    overflow: hidden;
    max-height: 65px;

    @media only screen and (max-width: 450px) {
      font-size: 17px;
    }
  `

  const addToCartButton = css`
    -webkit-transition: all 0.2s;
    -o-transition: all 0.2s;
    transition: all 0.2s;
    cursor: pointer;
    position: absolute;
    border: solid 1px ${color};
    background-color: ${color};
    font-family: varela round;
    font-weight: 400;
    line-height: 45px;
    font-size: 16px;
    height: 45px;
    width: 95%;
    left: 2.5%;
    bottom: 10px;
    border-radius: 3px;
    user-select: none;
    text-align: center;
    color: rgba(255, 255, 255, 1);
    letter-spacing: 2px;
    &:hover {
      color: rgba(255, 255, 255, 0.75);
      letter-spacing: 1.5px;
    }

    &:active {
      color: #fff;
    }
  `

  const priceText = css`
    color: ${color};
    padding-top: 5px;
    position: relative;
    float: right;
    font-weight: 700;
    font-size: 23px;
    text-align: right;
    line-height: 16px;
    @media only screen and (max-width: 450px) {
      font-size: 20px;
    }
  `

  const lowPriceText = css`
    clear: right;
    float: right;
    color: #b4b9c4;
    text-align: right;
    font-size: 12px;
    font-weight: 400;
  `

  const pricingContainer = css`
    margin-top: 5px;
    padding-left: 5px;
    margin-bottom: 65px;
    height: 50px;
    width: calc(100% - 5px);
    display: flex;
    flex-wrap: nowrap;
    position: relative;

    &::-webkit-scrollbar {
      // display: none;
    }

    @media only screen and (max-width: 400px) {
      height: 30px;
    }
  `

  const productPricing = css`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    flex: 0 0 auto;
    margin-right: 3%;
    color: #151515;
    width: 17%;
    height: 100%;
    background-color: #f6f6f6;
    transition: all 0.2s ease-in-out;
    user-select: none;
    cursor: pointer;

    // .quantitySelected{
    //   background-color: ${color} !important;
    //   color:#fff !important;
    // }

    &:hover {
      transition: none;
      border: solid 1px #d6d6d6;
    }
  `

  return (
    <ContextConsumer>
      {({ addQuantityToCart }) => (
        <div css={cardPadding} className={cardClassName}>
          <div css={cardStatus}>PREORDER</div>
          <div css={cardContainer} className="fadeItem">
            <Link to={url} className="link-no-style">
              <div css={imgContainer}>
                <Img css={NSFWEnabled ? imgStyles : imgBlurredStyles} fluid={{ ...imgData, aspectRatio: 1 }} />
              </div>
            </Link>
            <div className="cardBottom" css={cardBottom}>
              <div css={productColumn}>
                <div css={displayNameText}>{displayName}</div>
                <div css={productTypeText}>{productType}</div>
              </div>
              <div css={pricingColumn}>
                <div css={priceText}>
                  {'$' + pricings.find(x => x.quantity === quantity).price}
                </div>
                <div css={lowPriceText}>{'US$ total'}</div>
                {lowPrice && lowPrice.toFixed(0) !== price && (
                  <div css={lowPriceText}>
                    {'from $' + lowPrice.toFixed(2) + ' per'}
                  </div>
                )}
              </div>
              <div css={dateContainer}>
                <div css={preorderContainer}>
                  <div css={preorderText}>PREORDER</div>
                  <div css={preorderDateText}>{preorderDate}</div>
                </div>
                <div css={releaseContainer}>
                  <div css={releaseText}>RELEASE</div>
                  <div css={releaseDateText}>{releaseDate}</div>
                </div>
              </div>
              <div css={pricingQuantityContainer}>
                <div css={pricingQuantityText}>Quantity</div>
                <div css={pricingQuantityPrice}>
                  {'$' +
                    (
                      pricings.find(x => x.quantity === quantity).price /
                      quantity
                    ).toFixed(2) +
                    ' per item'}
                </div>
              </div>
              <div css={fadeContainer}>
                {/* <div css={linearFadeLeft}></div>
                <div css={linearFadeRight}></div> */}
                <ScrollContainer
                  vertical={false}
                  className="scroll-container"
                  css={pricingContainer}
                >
                  {pricings.map(item => {
                    return (
                      <div
                        onClick={() => setQuantity(item.quantity)}
                        className={
                          item.quantity === quantity ? 'quantitySelected' : ''
                        }
                        css={productPricing}
                        key={item.quantity}
                      >
                        {item.quantity}
                      </div>
                    )
                  })}
                </ScrollContainer>
              </div>
              <div
                onClick={() => {
                  addQuantityToCart(
                    asin,
                    displayName,
                    productType,
                    imgData,
                    quantity,
                    1
                  )
                }}
                className="addToCartButton"
                css={addToCartButton}
              >
                ADD TO CART
              </div>
            </div>
          </div>
        </div>
      )}
    </ContextConsumer>
  )
}

const productColumn = css`
  max-width: 60%;
  float: left;
`

const pricingColumn = css`
  max-width: 40%;
  float: right;
`

const pricingQuantityContainer = css`
  position: relative;
  line-height: 16px;
  padding-left: 6px;
  padding-bottom: 20px;
`
const pricingQuantityText = css`
  float: left;
  font-size: 16px;
  color: #303235;
  text-align: left;
  letter-spacing: 0px;
`
const pricingQuantityPrice = css`
  float: right;
  font-size: 14px;
  color: #b4bac5;
`

const fadeContainer = css`
  position: relative;
`

const linearFadeRight = css`
  position: absolute;
  z-index: 2;
  top: 0px;
  right: 0;
  height: 100%;
  bottom: 0;
  width: 20px;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1)
  );
  pointer-events: none;
`
const linearFadeLeft = css`
  position: absolute;
  z-index: 2;
  top: 0px;
  left: 0;
  height: 100%;
  bottom: 0;
  width: 12px;
  background: linear-gradient(
    to left,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.65)
  );
  pointer-events: none;
`

const cardPadding = css`
  margin-bottom: 10px;
  margin-top: 10px;
  position: relative;
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
    box-shadow: 0px 8px 32px 0px rgba(31, 32, 68, 0.16);
  }

  &:hover .cardBottom {
  }
`

const imgContainer = css`
  position: relative;
  width: 100%;
  cursor: pointer;
  -webkit-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 225px;
  &:hover {
    transform: scale(1.05);
  }
`

const cardStatus = css`
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.4);
  position: absolute;
  top: 15px;
  left: 0;
  letter-spacing: 1.5px;
  line-height: 40px;
  padding-left: 5px;
  padding-right: 5px;
  font-weight: 300;
  background-color: #0f346c;
  z-index: 1;
  color: #fff;
`

const imgStyles = css`
  padding-bottom: 60px;
  transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1),
    cubic-bezier(0.645, 0.045, 0.355, 1), cubic-bezier(0.645, 0.045, 0.355, 1),
    cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-duration: 300ms, 300ms, 300ms, 300ms;
`

const imgBlurredStyles = css`
  padding-bottom: 60px;
  transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1),
    cubic-bezier(0.645, 0.045, 0.355, 1), cubic-bezier(0.645, 0.045, 0.355, 1),
    cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-duration: 300ms, 300ms, 300ms, 300ms;
  filter: blur(4px);
  -webkit-filter: blur(4px);
  transform: translate3d(0,0,0);
  transform: translateZ(0);
`


const productTypeText = css`
  line-height: 20px;
  font-size: 14px;
  // padding-top:5px;
  position: relative;
  clear: left;
  font-weight: 400;
  border-radius: 5px;
  color: #b4b9c4;
`

const dateContainer = css`
  margin-top: 10px;
  position: relative;
  width: 100%;
  display: inline-block;
`

const preorderContainer = css`
  text-align: center;

  float: left;
  width: 50%;
`

const preorderText = css`
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;

  color: #b4b9c4;
`

const preorderDateText = css`
  line-height: 30px;
  font-size: 18px;
  font-weight: 700;

  color: #303235;
`

const releaseContainer = css`
  border-left: solid 1px #e6e6ea;
  text-align: center;

  float: right;
  width: 50%;
`

const releaseText = css`
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #b4bac5;
`

const releaseDateText = css`
  line-height: 30px;
  font-size: 18px;
  position: relative;
  font-weight: 700;
  color: #303235;
`

// holographic effect
// background-image: linear-gradient(
//   to right,
//   rgb(194, 255, 182),
//   rgb(255, 163, 182),
//   rgb(221, 169, 255),
//   rgb(162, 209, 255)
// );
// background-size: 200%;

export default WeissLandingProductCard
