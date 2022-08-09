import React from 'react'
import { StaticQuery, graphql, navigate, Link } from 'gatsby'
import { css } from '@emotion/core'
import Img from 'gatsby-image'
import axios from 'axios'
import CheckoutHeader from '../Checkout/CheckoutHeader'
import { Container, Row, Form } from 'react-bootstrap'
import CheckoutProgress from '../Checkout/CheckoutProgress'
import OrderSummary from '../Cart/OrderSummary'
import OrderDetails from '../Checkout/OrderDetails'
import ShippingDetails from '../Checkout/ShippingDetails'
import ContextConsumer from '../LayoutItems/CartContext'
import { window } from 'browser-monads'

const sendOrderData = true

const delay = t => new Promise(resolve => setTimeout(resolve, t))

const secondsToMinutes = sec => {
  const minutes = '0' + Math.floor(sec / 60)
  const seconds = '0' + (sec % 60)
  return minutes.substr(-2) + ':' + seconds.substr(-2)
}

const generateGuid = () => {
  var result, i, j
  result = ''
  for (j = 0; j < 32; j++) {
    if (j == 8 || j == 12 || j == 16 || j == 20) result = result + '-'
    i = Math.floor(Math.random() * 16)
      .toString(16)
      .toUpperCase()
    result = result + i
  }
  return result
}

class PaymentContainer extends React.Component {
  constructor(props) {
    super(props)
    const price = props.orderContext.totalPrice
    const paypalFeeAmount = Number(((price + 0.49) / 0.9651 - price).toFixed(2))

    this.state = {
      isValidating: false,
      timeLimitStarted: false,
      timeLimit: 600,
      orderTimestamp: new Date().toUTCString(),
      validateTimerId: '',
      paypalFeesEnabled: false,
      paypalFees: paypalFeeAmount,
      currentTotal: props.orderContext.totalPrice,
      orderId: generateGuid(),
    }

    this.startValidatingPayment = this.startValidatingPayment.bind(this)
    this.sendCheckoutData = this.sendCheckoutData.bind(this)
    this.stopTimeLimit = this.stopTimeLimit.bind(this)
    this.resetTimeLimit = this.resetTimeLimit.bind(this)
  }

  componentWillUnmount() {
    this.stopTimeLimit()
    window.onbeforeunload = null
  }

  startValidatingPayment(context) {
    if (!this.state.isValidating) {
      this.setState({
        isValidating: true,
      })
      delay(10000).then(
        (this.state.validateTimerId = setInterval(() => {
          var self = this
          if (this.state.isValidating) {
            axios
              .get(
                'https://hnmcbemfg2.execute-api.us-east-1.amazonaws.com/Production/CheckPaymentValidated?email=' +
                  this.props.orderContext.userInfo.email +
                  '&timestamp=' +
                  this.state.orderTimestamp
              )
              .then(function(response) {
                if (response.data === 'VALID') {
                  // axios
                  //   .post(
                  //     '/.netlify/functions/sendOrderEmail',
                  //     self.props.orderContext
                  //   )
                  //   .then(function(response) {
                  //   })
                  self.stopTimeLimit()
                  clearInterval(self.state.validateTimerId)
                  sessionStorage.removeItem('products')
                  if (window.history.replaceState) {
                    window.history.replaceState(
                      null,
                      null,
                      window.location.href
                    )
                  }
                  window.onbeforeunload = null

                  context.clearCart()
                  self.props.orderContext.paypalFeeInfo = self.state
                  navigate('/confirmation', {
                    state: {
                      orderContext: self.props.orderContext,
                    },
                  })
                }
              })
          }
        }, 3000))
      )
    }
  }
  stopTimeLimit() {
    clearInterval(this.timer)
    clearInterval(this.state.validateTimerId)
  }
  resetTimeLimit() {
    this.setState({ timeLimit: 600, timeLimitStarted: false })
  }

  sendCheckoutData() {
    var orderInfo = this.props.orderContext
    var timestamp = new Date().toUTCString()
    this.setState({ orderTimestamp: timestamp })
    orderInfo.timestamp = timestamp
    orderInfo.paypalFeesEnabled = this.state.paypalFeesEnabled
    orderInfo.totalPrice = this.state.currentTotal
    orderInfo.paypalFeeInfo = this.state

    if (sendOrderData) {
      axios
        .post(
          'https://hnmcbemfg2.execute-api.us-east-1.amazonaws.com/Production/Checkout',
          orderInfo
        )
        .then(function(response) {
          if (response.status === 500 || response.status === 503) {
            alert('AWS is down, please contact us for support with your ordr')
          }
        })
    }
  }

  componentDidMount() {
    window.onbeforeunload = () => {
      return true
    }
    this.setState({
      timeLimitStarted: true,
    })
    this.timer = setInterval(() => {
      this.setState(prevState => {
        if (prevState.timeLimit <= 0) {
          this.stopTimeLimit()
          window.onbeforeunload = null
          navigate('/cart')
        }

        return {
          timeLimit: prevState.timeLimit - 1,
        }
      })
    }, 1000)

    this.sendCheckoutData()
  }

  //place order
  render() {
    return (
      <ContextConsumer>
        {context => (
          <Container fluid>
            <Row>
              <CheckoutProgress
                orderContext={this.props.orderContext}
                phase={3}
              />
            </Row>
            <Row>
              <div
                css={paymentContainer}
                className="col-xl-8 col-lg-7 col-md-12 col-sm-12 col-xs-12"
              >
                <CheckoutHeader
                  header="Payment"
                  headerNavigate={() => {
                    this.stopTimeLimit()
                    navigate('/checkout', {
                      state: { orderContext: this.props.orderContext },
                    })
                  }}
                />
                <StaticQuery
                  query={graphql`
                    query {
                      paypalMeImage: file(
                        relativePath: { eq: "paypalmewhitetoned.png" }
                      ) {
                        childImageSharp {
                          fluid(maxWidth: 400) {
                            ...GatsbyImageSharpFluid
                          }
                        }
                      }
                      lockImage: file(relativePath: { eq: "lock.png" }) {
                        childImageSharp {
                          fluid(maxWidth: 100) {
                            ...GatsbyImageSharpFluid
                          }
                        }
                      }
                      facebookImage: file(
                        relativePath: { eq: "facebookLogo.png" }
                      ) {
                        childImageSharp {
                          fixed(width: 57, height: 57) {
                            ...GatsbyImageSharpFixed
                          }
                        }
                      }
                      ebayImage: file(relativePath: { eq: "ebayLogo.png" }) {
                        childImageSharp {
                          fixed(width: 60, height: 60) {
                            ...GatsbyImageSharpFixed
                          }
                        }
                      }
                      linkedinImage: file(
                        relativePath: { eq: "linkedinLogo.png" }
                      ) {
                        childImageSharp {
                          fixed(width: 60, height: 60) {
                            ...GatsbyImageSharpFixed
                          }
                        }
                      }
                    }
                  `}
                  render={data => {
                    return (
                      <>
                        <div
                          css={paypalContainer}
                          className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12"
                        >
                          <div css={paypalSecure}>
                            <Img
                              css={lockImgStyles}
                              fluid={data.lockImage.childImageSharp.fluid}
                            />
                            Secured by Paypal
                          </div>
                          <div css={timeLimitContainer}>
                            {'Session: ' +
                              secondsToMinutes(this.state.timeLimit)}
                          </div>

                          <div css={paypalProcess}>
                            <div css={priceContainer}>
                              <Row css={priceText}>
                                <div css={dollarTop}>$</div>
                                <div css={priceActual}>
                                  {this.state.currentTotal.toFixed(2)}
                                </div>
                              </Row>
                              <div css={currency}>USD</div>
                            </div>
                            <div
                              css={paypalButton}
                              onClick={() => {
                                if (sendOrderData) {
                                  this.sendCheckoutData(context)
                                  this.startValidatingPayment(context)
                                  const paypalLink =
                                    'https://www.paypal.com/paypalme/LeonShum/' +
                                    this.props.orderContext.totalPrice.toFixed(
                                      2
                                    ) +
                                    'USD'
                                  window.open(paypalLink, '_blank')
                                } else {
                                  this.props.orderContext.paypalFeeInfo = this.state
                                  context.clearCart()
                                  axios
                                    .post(
                                      '/.netlify/functions/sendOrderEmail',
                                      this.props.orderContext
                                    )
                                    .then(function(response) {})
                                  window.onbeforeunload = null

                                  navigate('/confirmation', {
                                    state: {
                                      orderContext: this.props.orderContext,
                                    },
                                  })
                                }
                              }}
                            >
                              <Img
                                css={imgStyles}
                                fluid={data.paypalMeImage.childImageSharp.fluid}
                              />
                            </div>
                          </div>
                          <Form.Group controlId="formBasicCheckbox">
                            <Form.Check
                              onClick={() => {
                                this.setState(
                                  prevState => {
                                    var total = prevState.currentTotal
                                    if (prevState.paypalFeesEnabled) {
                                      total -= this.state.paypalFees
                                    } else {
                                      total += this.state.paypalFees
                                    }
                                    return {
                                      paypalFeesEnabled: !prevState.paypalFeesEnabled,
                                      currentTotal: total,
                                    }
                                  },
                                  () => {
                                    this.sendCheckoutData()
                                  }
                                )
                              }}
                              css={paypalGoodsCheckbox}
                              type="checkbox"
                              label="Enable Paypal Goods and Services for a fee."
                            />
                          </Form.Group>
                          <div css={disclaimerContainer}>
                            <div css={feeHeader}>Fee Information</div>
                            <ul>
                              <li css={disclaimerText}>
                                Please pay the exact amount or the confirmation
                                email from us will <b>NOT</b> succeed.
                              </li>
                              <li css={disclaimerText}>
                                For Paypal Goods and Services Protection, you
                                must enable it here <b>AND</b> on Paypal for a
                                fee.
                              </li>
                              <li css={disclaimerText}>
                                This allows us to offer the best value to
                                everyone by not having to pay a fee. You can
                                verify our credibility below.
                              </li>
                            </ul>
                          </div>
                          <div css={credibilityInformation}>
                            <div css={credibilityHeader}>Credibility</div>
                            <div className="row">
                              <div
                                css={credibilityItem}
                                className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6"
                              >
                                <div css={credibilityImgWrapper}>
                                  <a
                                    target="_blank"
                                    href="https://www.facebook.com/search/top/?q=Weiss%20Schwarz%20&epa=SEARCH_BOX"
                                  >
                                    <Img
                                      css={credibilityImgStyles}
                                      fixed={
                                        data.facebookImage.childImageSharp.fixed
                                      }
                                    />
                                  </a>
                                </div>
                                <div css={credibilityItemText}>
                                  <div css={credibilityItemHeader}>
                                    Weiss Facebook Groups
                                  </div>
                                  <div css={credibilityItemDesc}>
                                    Make a reference check post about Shounen
                                    Stop or Leon Shum
                                  </div>
                                </div>
                              </div>
                              <div
                                css={credibilityItem}
                                className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6"
                              >
                                <div css={credibilityImgWrapper}>
                                  <a
                                    target="_blank"
                                    href="https://linkedin.com/in/shumleon"
                                  >
                                    <Img
                                      css={credibilityImgStyles}
                                      fixed={
                                        data.linkedinImage.childImageSharp.fixed
                                      }
                                    />
                                  </a>
                                </div>
                                <div css={credibilityItemText}>
                                  <div css={credibilityItemHeader}>
                                    The Founder’s Linkedin
                                  </div>
                                  <div css={credibilityItemDesc}>
                                    Leon Shum’s professional profile
                                  </div>
                                </div>
                              </div>
                              <div
                                css={credibilityItem}
                                className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6"
                              >
                                <div css={credibilityImgWrapper}>
                                  <a
                                    target="_blank"
                                    href="https://www.facebook.com/Shounen-Stop-112480440503469"
                                  >
                                    <Img
                                      css={credibilityImgStyles}
                                      fixed={
                                        data.facebookImage.childImageSharp.fixed
                                      }
                                    />
                                  </a>
                                </div>
                                <div css={credibilityItemText}>
                                  <div css={credibilityItemHeader}>
                                    Shounen Stop Facebook Page
                                  </div>
                                  <div css={credibilityItemDesc}>
                                    Our official Facebook page
                                  </div>
                                </div>
                              </div>
                              <div
                                css={credibilityItem}
                                className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6"
                              >
                                <div css={credibilityImgWrapper}>
                                  <a
                                    target="_blank"
                                    href="https://www.ebay.com/fdbk/feedback_profile/shounenstop?filter=feedback_page:All&_trksid=p2545226.m2531.l4585"
                                  >
                                    <Img
                                      css={credibilityImgStyles}
                                      fixed={
                                        data.ebayImage.childImageSharp.fixed
                                      }
                                    />
                                  </a>
                                </div>
                                <div css={credibilityItemText}>
                                  <div css={credibilityItemHeader}>Ebay</div>
                                  <div css={credibilityItemDesc}>
                                    Our ebay account with over 150 positive
                                    reviews
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          css={QACardListContainer}
                          className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12"
                        >
                          {/* <QACardList /> */}
                        </div>
                      </>
                    )
                  }}
                />
              </div>

              <OrderSummary
                orderContext={this.props.orderContext}
                subTotal={this.props.orderContext.subTotal}
                fees={this.state.paypalFeesEnabled ? this.state.paypalFees : 0}
                totalItems={this.props.orderContext.totalItems}
                shippingInfo={this.props.orderContext.shippingInfo}
              >
                <ShippingDetails
                  shippingData={this.props.orderContext.shippingInfo}
                  userInfo={this.props.orderContext.userInfo}
                />
                <OrderDetails
                  productData={this.props.orderContext.productData}
                />
              </OrderSummary>
            </Row>
            {this.state.isValidating && (
              <div css={loadingScreenContainer}>
                <div
                  css={closeLoadingButton}
                  onClick={() => {
                    this.setState({ isValidating: false })
                  }}
                >
                  x
                </div>
                <div css={loadingSpinnerWrapper}>
                  <div class="spinner">
                    <div class="double-bounce1"></div>
                    <div class="double-bounce2"></div>
                  </div>
                </div>
                <div css={loadingConfirmationText}>
                  Please wait for Paypal to Confirm
                  <br />
                  If you refresh you, will lose your progress
                  <br />
                  Confirmation can take up to 10 seconds, if not please contact
                  us.
                  <br />
                  <br />
                  <b>
                    Please make sure the email address you input is the same
                    email used for Paypal.
                  </b>
                </div>
              </div>
            )}
          </Container>
        )}
      </ContextConsumer>
    )
  }
}

const credibilityItemDesc = css`
  font-size: 13px;
  text-align: center;
`

const credibilityItemHeader = css`
  text-align: center;
  font-size: 16px;
  font-weight: 700;
`

const credibilityItemText = css`
  font-family: lato;
`

const credibilityImgWrapper = css`
  width: 100%;
  display: flex;
  justify-content: center;
`

const credibilityImgStyles = css`
  filter: grayscale(0.75);

  transition: all 0.2s ease-in-out;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  box-shadow: 0 2.5px 5px -1px rgba(50, 50, 93, 0.25),
    0 1.5px 3px -1.5px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  &:hover {
    filter: grayscale(0);
    transform: scale(0.95);
    box-shadow: 0 5px 10px -1px rgba(50, 50, 93, 0.6),
      0 1.5px 3px -1.5px rgba(0, 0, 0, 0.5);
  }
`

const credibilityItem = css`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: center;
`

const credibilityInformation = css`
  text-align: left;
  width: 100%;
  padding-bottom: 10px;
  flex-wrap: wrap;
`

const credibilityHeader = css`
  width: 100%;
  font-family: varela round;
  font-weight: 700;
  color: #0f346c;
  padding-top: 5px;
  padding-bottom: 15px;

  font-size: 24px;
`

const paypalGoodsCheckbox = css`
  font-family: lato;
  width: 100%;
  padding-left: 0;
  @media only screen and (max-width: 350px) {
    & label {
      font-size: 12px !important;
    }
  }
`

const loadingSpinnerWrapper = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const closeLoadingButton = css`
  font-size: 60px;
  font-family: varela round;
  top: 30px;
  right: 16px;
  position: fixed;
  color: #ddd;
  cursor: pointer;
`

const loadingConfirmationText = css`
  text-align: center;
  padding-right: 20px;
  padding-left: 20px;
  color: #ddd;
`

const loadingScreenContainer = css`
  height: 100vh;
  top: 0;
  left: 0;
  position: fixed;
  width: 100vw;
  // opacity: 0.6;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 100px;
  padding-bottom: 100px;
  flex-wrap: wrap;
`

const feeHeader = css`
  font-family: varela round;
  font-weight: 700;
  color: #0f346c;
  padding-top: 5px;
  font-size: 24px;
`

const disclaimerText = css`
  font-size: 15px;
  font-family: lato;
  margin-bottom: 3px;
`

const disclaimerContainer = css`
  text-align: left;
  margin-top: -10px;
  width: 100%;
  padding-bottom: 10px;
`

const lockImgStyles = css`
  width: 16px;
  height: 16px;
  margin-top: 8px;
  margin-right: 5px;
  @media only screen and (max-width: 350px) {
    margin-top: 6px;
    width: 13px;
    height: 13px;
  }
`

const paypalSecure = css`
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.4);
  position: absolute;
  top: -3px;
  left: -5px;
  font-size: 14px;
  letter-spacing: 1.5px;
  line-height: 35px;
  padding-left: 5px;
  padding-right: 5px;
  font-weight: 300;
  background-color: #0f346c;
  z-index: 1;
  display: inline-flex;
  color: #fff;
  @media only screen and (max-width: 350px) {
    font-size: 10px !important;
    line-height: 27px;
  }
`

const timeLimitContainer = css`
  position: absolute;
  text-align: right;
  width: 50%;
  right: 10px;
  color: #0f346c;
  font-family: lato;
  font-weight: 700;
  top: 0;
  font-size: 20px;
  @media only screen and (max-width: 350px) {
    font-size: 15px !important;
  }
`

const paypalButtonLink = css``

const currency = css`
  font-size: 15px;
`

const priceActual = css`
  height: 100%;
  padding-top: 10px;
  line-height: 40px;
`

const priceText = css`
  align-items: center;
  justify-content: center;
  position: flex;
  flex-wrap: nowrap;
`

const dollarTop = css`
  font-size: 18px;
  height: 100%;
  line-height: 30px;
  padding-right: 4px;
  align-self: flex-start;
`

const priceContainer = css`
  font-size: 35px;
  margin-top: 10px;
  text-align: center;
  color: #151515;
  position: relative;
  width: 100%;
`

const imgStyles = css`
  height: 45px;
  width: 100px;
  max-width: 150px;
`

const paypalButton = css`
  cursor: pointer;
  position: relative;
  border-radius: 6px;
  height: 60px;
  width: 100%;
  max-width: 300px;
  background-color: #0070ba;
  margin-top: -30px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1),
    cubic-bezier(0.645, 0.045, 0.355, 1), cubic-bezier(0.645, 0.045, 0.355, 1),
    cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-duration: 300ms, 300ms, 300ms, 300ms;

  &:hover {
    background-color: #003087;
  }

  &:active {
    background-color: #003087;
  }
`

const paypalProcess = css`
  height: 200px;
  width: 100%;

  align-items: center;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
`

const paypalContainer = css`
  border-radius: 9px;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
  box-shadow: rgba(31, 32, 68, 0.16) 0px 2px 8px 0px;
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  position: sticky;
  top: 70px;
`

const paymentContainer = css`
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 5px;
`

const QACardListContainer = css`
  padding-right: 0;
  padding-left: 0;
  padding-bottom: 20px;
`

export default PaymentContainer
