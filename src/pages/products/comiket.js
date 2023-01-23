import React, { useContext, useState } from 'react'
import { graphql, navigate } from 'gatsby'

import { css } from '@emotion/core'
import { Container } from 'react-bootstrap'
import ProductPageContainer from '../../components/Products/ProductPageContainer'
import ComiketProductCard from '../../components/Comiket/ComiketProductCard'
import FilterProductCategory from '../../components/Products/FilterProductCategory'
import NSFWToggle from '../../components/NSFW/NSFWToggle'
import { NSFWContext } from '../../utils/NSFWContext'
import { window } from 'browser-monads';

const productTypeKey = 'producttype'
const eventKey = 'event'
const navigateSelected = (url, hash) => {
  navigate(url + '#' + hash, { replace: true, token: Math.random() })
}

const Comiket = ({ data, location }) => {
  const { NSFWEnabled } = useContext(NSFWContext)

  const comiketProductData = data.comiketProducts.edges
  const comiketEventInfo = data.comiketEventInfo.edges
    .sort((a, b) => (a.node.frontmatter.currentEvent === true ? -1 : 1))
    .slice()
  const [iOS, setiOS] = React.useState(false);

  var currentEventKey = ''

  var eventIdMap = {}
  var eventFilterMap = {}
  var eventFilterList = Object.keys(comiketEventInfo).map(function(edge) {
    const comiketEventInfoEdge = comiketEventInfo[edge].node.frontmatter
    eventFilterMap[comiketEventInfoEdge.eventName] = {
      eventId: comiketEventInfoEdge.id,
      onsale: comiketEventInfoEdge.onsale,
      eventDesc: comiketEventInfoEdge.eventDesc,
      preorder: comiketEventInfoEdge.preorder,
      release: comiketEventInfoEdge.release,
    }
    
    eventIdMap[comiketEventInfoEdge.id] = { 
      onsale: comiketEventInfoEdge.onsale,
      eventName: comiketEventInfoEdge.eventName
    }
    if (comiketEventInfoEdge.currentEvent) {
      currentEventKey = comiketEventInfoEdge.eventName
    }
    return comiketEventInfoEdge.eventName
  })

  const productTypeFilterList = ['All']

  comiketProductData.map(edge => {
    edge.node.frontmatter.onsale = edge.node.frontmatter.onsale ?? eventIdMap[edge.node.frontmatter.eventId].onsale
    edge.node.frontmatter.eventName = eventIdMap[edge.node.frontmatter.eventId].eventName
    const curProductType = edge.node.frontmatter.producttype
    if (!productTypeFilterList.includes(curProductType)) {
      productTypeFilterList.push(curProductType)
    }
  })

  var parsedHash = new URLSearchParams(location.hash.substr(1))
  var selectedProductType = parsedHash.get(productTypeKey)
  var selectedEvent = parsedHash.get(eventKey)
  const [queryString, setQueryString] = useState(parsedHash)

  if (!selectedProductType || !productTypeFilterList.includes(selectedProductType)) {
    selectedProductType = 'All'
  }
  
  if (!selectedEvent || !eventFilterList.includes(selectedEvent)) {
    selectedEvent = currentEventKey
  }

  const [productTypeFilterItem, setProductTypeFilterItem] = useState(
    selectedProductType
  )
  const [currentEventFilterListItem, setCurrentEventFilterListItem] = useState(
    selectedEvent
  )

  React.useEffect(() => {
    const userAgent =
      typeof window.navigator === "undefined" ? "" : navigator.userAgent;
    var ipad = !!(navigator.userAgent.match(/(iPad)/)
      || (navigator.platform === "MacIntel" && typeof navigator.standalone !== "undefined"))
    let isIOS = /iPad|iPhone|iPod/.test(navigator.platform)
      || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)

    setiOS(ipad || isIOS)
  })

  return (
    <Container css={productPageContainer} fluid>
      <ProductPageContainer selectedProductCategory="Comiket">
        <div
          css={containerNoPadding}
          className={'col-xl-3 col-lg-3 col-md-12 col-sm-12 col-xs-12'}
        >
          <div css={filterContainer} className="stickyFilter">
            <FilterProductCategory
              filterName="Product Type"
              currentFilter={productTypeFilterItem}
            >
              {productTypeFilterList.map(filterItem => (
                <div
                  key={filterItem}
                  className={
                    filterItem === productTypeFilterItem
                      ? 'productCategoryFilterSelected'
                      : ''
                  }
                  css={filterListItem}
                  onClick={() => {
                    var qs = queryString
                    qs.set(productTypeKey, filterItem)
                    setQueryString(qs)
                    setProductTypeFilterItem(filterItem)
                    navigateSelected(
                      location.pathname,
                      qs.toString().replaceAll('+', '%20')
                    )
                  }}
                >
                  {filterItem}
                </div>
              ))}
            </FilterProductCategory>
            <FilterProductCategory
              filterName="Event"
              currentFilter={currentEventFilterListItem}
            >
              {eventFilterList.map(filterItem => (
                <div
                  key={filterItem}
                  className={
                    filterItem === currentEventFilterListItem
                      ? 'productCategoryFilterSelected'
                      : ''
                  }
                  css={filterListItem}
                  onClick={() => {
                    var qs = queryString
                    qs.set(eventKey, filterItem)
                    setQueryString(qs)
                    setCurrentEventFilterListItem(filterItem)
                    navigateSelected(
                      location.pathname,
                      qs.toString().replaceAll('+', '%20')
                    )
                  }}
                >
                  {filterItem}
                </div>
              ))}
            </FilterProductCategory>
          </div>
        </div>
        <div
          css={productContainer}
          className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-xs-12"
        >
          <div css={productCategoryHeaderContainer}>
            <div css={productCategoryHeader}>{currentEventFilterListItem}</div>
            <div css={eventDateText}>
              {eventFilterMap[currentEventFilterListItem].preorder !== 'Invalid date' && <div css={dateTextContainer}>
                <div css={dateField}>Preorder By</div>
                <div css={dateValue}>
                  {eventFilterMap[currentEventFilterListItem].preorder}
                </div>
              </div>}
              {eventFilterMap[currentEventFilterListItem].preorder !== 'Invalid date' && <div css={dateTextContainer}>
                <div css={dateField}>Release Date</div>
                <div css={dateValue}>
                  {eventFilterMap[currentEventFilterListItem].release}
                </div>
              </div>}
            </div>
            <div css={productHeaderSubtitleText}>
              {eventFilterMap[currentEventFilterListItem].eventDesc}
            </div>
          </div>
          <div className="d-flex justify-content-end">
          <NSFWToggle />
          </div>
          <div className="row" css={productContentWrapper}>
            {comiketProductData
              .filter(edge => {
                return (productTypeFilterItem !== 'All'
                  ? edge.node.frontmatter.producttype === productTypeFilterItem
                  : true) && (currentEventFilterListItem !== ''
                  ? edge.node.frontmatter.eventName === currentEventFilterListItem
                  : true)
              })
              .sort((a, b) => {
                return a.node.frontmatter.onsale === true ? -1 : 1
              })
              .sort((a, b) => {
                return (!NSFWEnabled && a.node.frontmatter.nsfw) === true ? 1 : -1
              })
              .map((edge, index) => (
                <ComiketProductCard
                  key={edge.node.frontmatter.asin}
                  asin={edge.node.frontmatter.asin}
                  imgData={edge.node.frontmatter.image.childImageSharp.fluid}
                  price={edge.node.frontmatter.pricings[0].price}
                  productType={edge.node.frontmatter.producttype}
                  eventName={edge.node.frontmatter.eventName}
                  url={'/products' + edge.node.fields.slug}
                  onsale={edge.node.frontmatter.onsale}
                  delay={iOS ? index/10 : index*25}
                  blur={!NSFWEnabled && edge.node.frontmatter.nsfw}
                />
              ))}
          </div>
        </div>
      </ProductPageContainer>
    </Container>
  )
}

export default Comiket

const eventDateText = css`
  width: 50%;
  float: right;
  padding-top: 10px;
`

const dateValue = css`
  color: #444;
`

const dateField = css`
  color: #0f346c;
  font-size: 18px;
  font-weight: 700;
`
const dateTextContainer = css`
  font-family: varela round;
  font-size: 15px;
  text-align: right;
`

const filterContainer = css``

const filterListItem = css`
  border-radius: 6px;
  font-family: lato;
  height: 40px;
  line-height: 40px;
  padding-left: 15px;
  color: #444;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  &:hover,
  active {
    background-color: #f0f7ff;
  }
`

const containerNoPadding = css`
  padding-right: 0;
  padding-left: 0;
  padding-top: 5px;
`

const productCategoryHeader = css`
  float: left;
  width: 50%;
  color: #0f346c;
  font-size: 30px;
  font-family: varela round;
`

const productHeaderSubtitleText = css`
  width: 50%;
  clear: left;
  color: #444;
  font-size: 15px;
  font-family: varela round;
`

const productCategoryHeaderContainer = css`
  position: relative;
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
`

const productPageContainer = css`
  margin-top: 20px;
  margin-bottom: 0px;
  padding-right: 0;
  padding-left: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const productContentWrapper = css`
  margin-top: 0;
  margin-left: 0;
  margin-right: 0;
  padding-left: 0;
  padding-right: 0;
  width: 100%;
`

const productContainer = css`
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 20px;
`

export const ComiketProductCategoryQuery = graphql`
  query ComiketProductCategoryQuery {
    comiketProducts: allMarkdownRemark(
      filter: { frontmatter: { merchandise: { eq: "comiket" } } }
    ) {
      edges {
        node {
          frontmatter {
            asin
            producttype
            eventId
            circle
            nsfw
            onsale
            image {
              childImageSharp {
                fluid(maxWidth: 800, quality: 50) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            pricings {
              quantity
              price
            }
            weight
            merchandise
          }
          fields {
            slug
          }
        }
      }
    }
    comiketEventInfo: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/comiketEvents/" } }
    ) {
      edges {
        node {
          frontmatter {
            eventName
            eventDesc
            currentEvent
            onsale
            preorder(formatString: "MMM DD")
            release(formatString: "MMM DD")
            id
          }
        }
      }
    }
  }
`
