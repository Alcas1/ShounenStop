import React, { useState } from 'react'
import { navigate } from 'gatsby'
import { css } from '@emotion/core'
import { Formik } from 'formik'
import { Container, Row, Card, Accordion } from 'react-bootstrap'
import CheckoutProgress from './CheckoutProgress'
import CheckoutHeader from '../Checkout/CheckoutHeader'
import * as Yup from 'yup'
import OrderSummary from '../Cart/OrderSummary'
import OrderDetails from './OrderDetails'

const CheckoutContainer = ({ orderContext }) => {
  const [expanded, setExpanded] = useState(false)

  const alpha = /^[a-zA-Z_]+( [a-zA-Z_]+)*$/
  orderContext.userInfo = {}
  return (
    <Formik
      initialValues={{
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        apt: '',
        city: '',
        state: '',
        zip: '',
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email('Invalid email address')
          .required('Required'),
        firstName: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Required'),
        lastName: Yup.string()
          .max(20, 'Must be 20 characters or less')
          .required('Required'),
        address: Yup.string().required('Required'),
        city: Yup.string()
          .trim()
          .matches(alpha, {
            message: 'Enter Valid City Name',
            excludeEmptyString: true,
          })
          .required('Required'),
        state: Yup.string()
          .trim()
          .matches(alpha, {
            message: 'Enter Valid State Name',
            excludeEmptyString: true,
          })
          .max(15, 'Must be 15 characters or less')
          .required('Required'),
        zip: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Required'),
      })}
      onSubmit={values => {
        return false
      }}
    >
      {({
        handleBlur,
        handleChange,
        values,
        errors,
        touched,
        dirty,
        isValid,
      }) => {
        orderContext.userInfo = values
        return (
          <Container fluid>
            <Row>
              <CheckoutProgress orderContext={orderContext} phase={2} />
            </Row>
            <Row>
              <div
                css={deliveryContainer}
                className="col-xl-8 col-lg-7 col-md-12 col-sm-12 col-xs-12"
              >
                <CheckoutHeader
                  header="Delivery"
                  headerNavigate={() => navigate('/cart')}
                />
                <div css={userInfoContainer}>
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div css={header}>Shipping Information</div>
                    <ul>
                      <li>
                        <b>$8</b> Shounen Style Shipping on all carts unless
                        otherwise stated
                      </li>
                      <li>
                        Delivery in <b>7-14 days with tracking</b> (HK Post
                        e-Express)
                      </li>
                      <li>
                        Items over the weight of <b>4.4lbs</b> (e.g., 5+ Weiss
                        BP) will be shipped in <b>multiple packages</b>
                      </li>
                      <li>
                        Items with <b>separate release dates</b> will ship{' '}
                        <b>together</b> once all items are released
                      </li>
                      <Accordion>
                        <Accordion.Toggle
                          css={upsShipping}
                          as={Row}
                          eventKey="0"
                          onClick={() => {
                            setExpanded(!expanded)
                          }}
                        >
                          <svg
                            className={expanded ? 'rotated' : ''}
                            css={upsExpandIcon}
                            xmlns="http://www.w3.org/2000/svg"
                            height="24"
                            viewBox="0 0 24 24"
                            width="24"
                          >
                            <path d="M0 0h24v24H0V0z" fill="none" />
                            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                          </svg>
                          <div css={upsHeader}>
                            EMS (special shipping accommodation)
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                          <ul css={upsInner}>
                            <div>
                              Weiss BP cases can be shipped as one package by
                              EMS for an extra US$ 30 with arrival in 2 - 12
                              working days.
                            </div>
                            <div css={paddingTop}>You need to:</div>
                            <ol>
                              <li>
                                Check out and pay normally for a cart with a
                                Weiss BP case.
                              </li>
                              <li>
                                Send an additional $30 separately through
                                Paypal.
                              </li>
                              <li>
                                Once you receive a confirmation email from us,
                                reply with a screenshot of $30 dollars paid.
                              </li>
                            </ol>
                          </ul>
                        </Accordion.Collapse>
                      </Accordion>
                    </ul>
                  </div>
                </div>
                <div css={userInfoContainer}>
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div css={header}>Delivery Information</div>
                    <div css={userInfoTop}>
                      <label
                        className={
                          touched.email && !errors.email ? 'validatedInfo' : ''
                        }
                        css={userInfoLabel}
                        htmlFor="email"
                      >
                        <span css={darkFont}>&nbsp;PayPal&nbsp;</span> Email Address
                      </label>
                      {touched.email && errors.email ? (
                        <div css={userInfoError}>{errors.email}</div>
                      ) : null}
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className={
                        touched.email && errors.email
                          ? 'userInfoErrorInput'
                          : ''
                      }
                      css={userInfoInput}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div css={userInfoTop}>
                      <label
                        className={
                          touched.firstName && !errors.firstName
                            ? 'validatedInfo'
                            : ''
                        }
                        css={userInfoLabel}
                        htmlFor="firstName"
                      >
                        First Name
                      </label>
                      {touched.firstName && errors.firstName ? (
                        <div css={userInfoError}>{errors.firstName}</div>
                      ) : null}
                    </div>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      className={
                        touched.firstName && errors.firstName
                          ? 'userInfoErrorInput'
                          : ''
                      }
                      css={userInfoInput}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.firstName}
                    />
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div css={userInfoTop}>
                      <label
                        className={
                          touched.lastName && !errors.lastName
                            ? 'validatedInfo'
                            : ''
                        }
                        css={userInfoLabel}
                        htmlFor="lastName"
                      >
                        Last Name
                      </label>
                      {touched.lastName && errors.lastName ? (
                        <div css={userInfoError}>{errors.lastName}</div>
                      ) : null}
                    </div>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      className={
                        touched.lastName && errors.lastName
                          ? 'userInfoErrorInput'
                          : ''
                      }
                      css={userInfoInput}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lastName}
                    />
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div css={userInfoTop}>
                      <label
                        className={
                          touched.address && !errors.address
                            ? 'validatedInfo'
                            : ''
                        }
                        css={userInfoLabel}
                        htmlFor="address"
                      >
                        Address
                      </label>
                      {touched.address && errors.address ? (
                        <div css={userInfoError}>{errors.address}</div>
                      ) : null}
                    </div>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      className={
                        touched.address && errors.address
                          ? 'userInfoErrorInput'
                          : ''
                      }
                      css={userInfoInput}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.address}
                    />
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div css={userInfoTop}>
                      <label
                        className={
                          touched.apt && !errors.apt ? 'validatedInfo' : ''
                        }
                        css={userInfoLabelOptional}
                        htmlFor="apt"
                      >
                        Apartment, Suite, etc
                      </label>
                      {touched.apt && errors.apt ? (
                        <div css={userInfoError}>{errors.apt}</div>
                      ) : null}
                    </div>
                    <input
                      id="apt"
                      name="apt"
                      type="text"
                      className={
                        touched.apt && errors.apt ? 'userInfoErrorInput' : ''
                      }
                      css={userInfoInput}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.apt}
                    />
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div css={userInfoTop}>
                      <label
                        className={
                          touched.city && !errors.city ? 'validatedInfo' : ''
                        }
                        css={userInfoLabelOptional}
                        htmlFor="city"
                      >
                        City
                      </label>
                      {touched.city && errors.city ? (
                        <div css={userInfoError}>{errors.city}</div>
                      ) : null}
                    </div>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      className={
                        touched.city && errors.city ? 'userInfoErrorInput' : ''
                      }
                      css={userInfoInput}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.city}
                    />
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div css={userInfoTop}>
                      <label
                        className={
                          touched.state && !errors.state ? 'validatedInfo' : ''
                        }
                        css={userInfoLabelOptional}
                        htmlFor="state"
                      >
                        State
                      </label>
                      {touched.state && errors.state ? (
                        <div css={userInfoError}>{errors.state}</div>
                      ) : null}
                    </div>
                    <input
                      id="state"
                      name="state"
                      type="text"
                      className={
                        touched.state && errors.state
                          ? 'userInfoErrorInput'
                          : ''
                      }
                      css={userInfoInput}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.state}
                    />
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div css={userInfoTop}>
                      <label
                        className={
                          touched.zip && !errors.zip ? 'validatedInfo' : ''
                        }
                        css={userInfoLabelOptional}
                        htmlFor="zip"
                      >
                        Zip Code
                      </label>
                      {touched.zip && errors.zip ? (
                        <div css={userInfoError}>{errors.zip}</div>
                      ) : null}
                    </div>
                    <input
                      id="zip"
                      name="zip"
                      type="text"
                      className={
                        touched.zip && errors.zip ? 'userInfoErrorInput' : ''
                      }
                      css={userInfoInput}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.zip}
                    />
                  </div>
                </div>
              </div>
              <OrderSummary
                checkoutNavigate={() =>
                  navigate('/payment', {
                    state: { orderContext },
                  })
                }
                fees={0}
                orderContext={orderContext}
                subTotal={orderContext.subTotal}
                totalItems={orderContext.totalItems}
                shippingInfo={orderContext.shippingInfo}
                navigateMessage="Review and Pay"
                disableButton={!isValid || !dirty}
              >
                <OrderDetails productData={orderContext.productData} />
              </OrderSummary>
            </Row>
          </Container>
        )
      }}
    </Formik>
  )
}

const darkFont = css`
  color: #0f346c;
  // text-decoration: underline;
  
  background-color:#dcecff;
  border-radius:3px;
  font-weight:700;
  padding-top:2px;
  padding-bottom:2px;

  // font-family:varela round
`

const paddingTop = css`
  padding-top: 10px;
  padding-bottom: 10px;
  font-weight: 700;
`

const upsHeader = css`
  font-weight: 700;
`

const upsInner = css`
  padding-top: 10px;
  padding-left: 25px;
`

const upsExpandIcon = css`
  fill: #c5d2d8;
  margin-right: 5px;
  transition: all 0.2s ease-in-out;
`

const upsShipping = css`
  color: #4c91a9;
  padding-left: 8px;
  cursor: pointer;
  user-select: none;
`

const userInfoInput = css`
  height: 25px;
  line-height: 0px;
  font-size: 18px;
  width: 100%;
  border: none;
  border-bottom: solid 1px #dfdfdf;
  -webkit-appearance: none;

  transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1),
    cubic-bezier(0.645, 0.045, 0.355, 1), cubic-bezier(0.645, 0.045, 0.355, 1),
    cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-duration: 300ms, 300ms, 300ms, 300ms;

  &:focus {
    border-bottom: solid 1px #0f346c;
  }
`

const userInfoTop = css`
  width: 100%;
  position: relative;
  margin-bottom: 0px;
  margin-top: 15px;
`

const userInfoLabelOptional = css`
  font-size: 16px;
  float: left;
  transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1),
    cubic-bezier(0.645, 0.045, 0.355, 1), cubic-bezier(0.645, 0.045, 0.355, 1),
    cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-duration: 300ms, 300ms, 300ms, 300ms;
  letter-spacing: 1.5px;
  color: #6a6d75;
`

const userInfoLabel = css`
  font-size: 16px;
  float: left;
  letter-spacing: 1.5px;
  transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1),
    cubic-bezier(0.645, 0.045, 0.355, 1), cubic-bezier(0.645, 0.045, 0.355, 1),
    cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-duration: 300ms, 300ms, 300ms, 300ms;
  color: #6a6d75;
`
const userInfoError = css`
  font-size: 16px;
  float: right;
  letter-spacing: 1.1px;

  color: #d20d0d;
`

const header = css`
  font-family: varela round;
  font-weight: 700;
  color: #0f346c;
  padding-top: 5px;
  padding-bottom: 10px;
  font-size: 24px;
`

const deliveryContainer = css`
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 5px;
`

const userInfoContainer = css`
  padding: 10px;
  padding-bottom: 20px;
  background-color: #fff;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 9px;
  font-family: Lato;
  box-shadow: rgba(31, 32, 68, 0.16) 0px 2px 8px 0px;
  display: flex;
  flex-wrap: wrap;
  top: 70px;
  width: 100%;
  transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1),
    cubic-bezier(0.645, 0.045, 0.355, 1), cubic-bezier(0.645, 0.045, 0.355, 1),
    cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-duration: 300ms, 300ms, 300ms, 300ms;
  &:hover {
    box-shadow: 0px 8px 32px 0px rgba(31, 32, 68, 0.16);
  }
`

export default CheckoutContainer
