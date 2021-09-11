import React from 'react'
import { css } from '@emotion/core'

const CheckoutHeader = ({ header, headerNavigate }) => {
  return (
    <div css={headerContainer}>
      <div css={cartHeader}>{header}</div>
      {headerNavigate !== undefined && (
        <div css={backButton} onClick={headerNavigate}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="#0f346c"
            stroke="#0f346c"
            preserveAspectRatio="xMidYMid meet"
            focusable="false"
          >
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z"></path>
          </svg>
        </div>
      )}
      <div css={cartDivider}></div>
    </div>
  )
}

const headerContainer = css`
  position: relative;
`

const backButton = css`
  cursor: pointer;
  margin-top: 5px;
  height: 30px;
  width: 30px;
  float: right;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.08);
  }
`

const cartHeader = css`
  float: left;
  color: #0f346c;
  font-size: 30px;
  font-family: varela round;
`
const cartDivider = css`
  height: 1px;
  width: 100%;
  margin-bottom: 5px;
  // background-color: #a1bce6;
  clear: both;
`

export default CheckoutHeader
