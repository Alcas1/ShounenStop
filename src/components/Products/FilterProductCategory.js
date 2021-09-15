import React from 'react'
import { css } from '@emotion/core'
import { Collapse } from 'react-bootstrap'
import { window } from 'browser-monads';

class FilterProductCategory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
    this.resize = this.resize.bind(this)
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize)
    this.resize()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize)
  }

  resize() {
    if (window.innerWidth <= 992) {
      this.setState({
        open: false,
      })
    } else {
      this.setState({
        open: true,
      })
    }
  }

  render() {
    return (
      <div css={filterContainer}>
        <div
          onClick={() =>
            this.setState(prevState => {
              return { open: !prevState.open }
            })
          }
          aria-controls="example-collapse-text"
          aria-expanded={this.state.open}
        >
          <div css={filterHeader}>
            <span>{this.props.filterName}</span>
            <div css={openSymbolContainer}>
              <div
                className={
                  this.state.open ? 'expandedProductCategoryFilterLeft' : ''
                }
                css={leftLine}
              ></div>
              <div
                className={
                  this.state.open ? 'expandedProductCategoryFilterRight' : ''
                }
                css={rightLine}
              ></div>
            </div>
          </div>
        </div>
        <Collapse css={filterOptionContainer} in={this.state.open}>
          <div css={filterListContainer}>
            {this.props.children}
            <div css={paddingBottomList}></div>
          </div>
        </Collapse>
        <Collapse css={filterOptionContainer} in={!this.state.open}>
          <div css={filterListContainer}>
            <div css={selectedFilterList}>{this.props.currentFilter}</div>
            <div css={paddingBottomList}></div>
          </div>
        </Collapse>
      </div>
    )
  }
}

export default FilterProductCategory

const selectedFilterList = css`
  border-radius: 6px;
  font-family: lato;
  height: 40px;
  margin-bottom: 10px;
  line-height: 40px;
  padding-left: 15px;
  color: #444;

  background-color: #b9d9ff;
  cursor: pointer;
  letter-spacing: 1.1px;
  color: #0f346c;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  transition: all 0.2s ease-in-out;
`

const paddingBottomList = css`
  height: 10px;
  width: 100%;
`

const filterListContainer = css``

const openSymbolContainer = css`
  position: relative;
  height:30px;
  width 30px;
`

const leftLine = css`
  transition: all 0.2s ease-in-out;
  height: 14px;
  border-radius: 4px;
  transform: rotate(135deg);
  width: 2px;
  left: 9px;
  top: 8px;
  background-color: #0f346c;
  position: absolute;
`

const rightLine = css`
  transition: all 0.2s ease-in-out;
  height: 2px;
  border-radius: 34x;
  transform: rotate(-45deg);

  width: 14px;
  background-color: #0f346c;
  right: 3px;
  top: 14px;
  position: absolute;
`

const filterHeader = css`
  display: flex;
  padding-left: 5px;
  padding-right: 0px;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  font-size: 20px;
  font-family: varela round;
  color: #0f346c;
  cursor: pointer;
  // border-bottom:solid 1px #0f346c;

  &:active {
    // color: #151515;
  }
`

const filterOptionContainer = css``

const filterContainer = css`
  margin-top: 20px;
  padding-left: 15px;
  padding-right: 15px;
  margin-left: 18px;
  margin-right: 18px;
  background-color: #fff;
  box-shadow: 0px 2px 8px 0px rgba(31, 32, 68, 0.16);
  border-radius: 12px;
`
