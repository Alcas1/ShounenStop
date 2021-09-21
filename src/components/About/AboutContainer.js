import React from 'react'
import { css } from '@emotion/core'
import Img from 'gatsby-image'
import { useStaticQuery, graphql } from 'gatsby'

import { Container, Row } from 'react-bootstrap'
const AboutContainer = () => {
  const images = useStaticQuery(query)
  return (
    <Container css={contactWrapper} fluid>
      <Row>
        <div
          css={contactContainer}
          className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12"
        >
          <div css={contactInfoContainer}>
            <h1 css={helpHeaderText}>
              About <span css={shounenStyles}>Shounen Stop</span>
            </h1>
            <p>
              For Shounen Stop, it’s all about value & ease. We are a small
              group of enthusiasts based in Hong Kong that aims to deliver items
              to friends and site visitors at an affordable and convenient
              manner through efficient payment and shipping methods.
            </p>
            <p css={whoWeAreHeader}>Who we are</p>
            <div css={personDescription} className="row">
              <div
                css={userImageStyles}
                className="col-xl-3 col-lg-4 col-md-4 col-sm-4 col-12"
              >
                <div css={userImageInner}>
                  <Img
                    css={testImageAbove}
                    fluid={images.leonImage.childImageSharp.fluid}
                  />
                </div>
              </div>
              <div className="col-xl-9 col-lg-8 col-md-8 col-sm-8 col-12">
                <h3 css={personTitleStyles}>Leon Shum</h3>
                <span css={titleHeader}>FOUNDER</span>{' '}
                <div css={personBorder}></div>
                <p>
                  A Weiss Schwarz player from New Jersey that relocated to Hong
                  Kong for work. He runs the main operations of Shounen Stop.
                  Feel free to contact him with any inquiries related to Shounen
                  Stop.
                </p>
                <div css={logoCloud}>
                  <a
                    css={logoHover}
                    target="_blank"
                    href="https://linkedin.com/in/shumleon"
                  >
                    <Img fixed={images.linkedinImage.childImageSharp.fixed} />
                  </a>
                  <div css={logoContainer}>
                    <a href="mailto: shounenstop@gmail.com">
                      <svg css={emailLogo} viewBox="0 0 20 20">
                        <path d="M17.388,4.751H2.613c-0.213,0-0.389,0.175-0.389,0.389v9.72c0,0.216,0.175,0.389,0.389,0.389h14.775c0.214,0,0.389-0.173,0.389-0.389v-9.72C17.776,4.926,17.602,4.751,17.388,4.751 M16.448,5.53L10,11.984L3.552,5.53H16.448zM3.002,6.081l3.921,3.925l-3.921,3.925V6.081z M3.56,14.471l3.914-3.916l2.253,2.253c0.153,0.153,0.395,0.153,0.548,0l2.253-2.253l3.913,3.916H3.56z M16.999,13.931l-3.921-3.925l3.921-3.925V13.931z"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div css={personDescription} className="row">
              <div
                css={userImageStyles}
                className="col-xl-3 col-lg-4 col-md-4 col-sm-4 col-12"
              >
                <div css={userImageInner}>
                  <Img
                    css={testImageAbove}
                    fluid={images.jonImage.childImageSharp.fluid}
                  />
                </div>
              </div>
              <div className="col-xl-9 col-lg-8 col-md-8 col-sm-8 col-12">
                <h3 css={personTitleStyles}>Jonathan Wu</h3>
                <span css={titleHeader}>Software Architect</span>
                <div css={personBorder}></div>
                <p>
                  Created the site end to end and is responsible for the UI/UX design. 
                  Passionate about technology and building cool things.
                </p>
                <div css={logoCloud}>
                  <a
                    css={logoHover}
                    target="_blank"
                    href="https://linkedin.com/in/jonmwu"
                  >
                    <Img fixed={images.linkedinImage.childImageSharp.fixed} />
                  </a>
                  <div css={logoContainer}>
                    <a href="mailto: jonathanwu70@gmail.com">
                      <svg css={emailLogo} viewBox="0 0 20 20">
                        <path d="M17.388,4.751H2.613c-0.213,0-0.389,0.175-0.389,0.389v9.72c0,0.216,0.175,0.389,0.389,0.389h14.775c0.214,0,0.389-0.173,0.389-0.389v-9.72C17.776,4.926,17.602,4.751,17.388,4.751 M16.448,5.53L10,11.984L3.552,5.53H16.448zM3.002,6.081l3.921,3.925l-3.921,3.925V6.081z M3.56,14.471l3.914-3.916l2.253,2.253c0.153,0.153,0.395,0.153,0.548,0l2.253-2.253l3.913,3.916H3.56z M16.999,13.931l-3.921-3.925l3.921-3.925V13.931z"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Row>
    </Container>
  )
}

const testImageAbove = css`
  border-radius: 12px;
  box-shadow: 0 5px 10px -1px rgba(50, 50, 93, 0.25),
    0 2px 3px -1.5px rgba(0, 0, 0, 0.3);
`

const testImageUnder = css`
  & > * {
    position: relative;
    margin-top: -90%;
    z-index: -999;
    width: 95%;
    height: 100%;
    left: 2.5%;

    border-radius: 50px !important;

    filter: blur(10px);
    -webkit-filter: blur(10px);
  }
`

const logoHover = css`
  & > * {
    transition: all 0.2s ease-in-out;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    box-shadow: 0 2.5px 5px -1px rgba(50, 50, 93, 0.25),
      0 1.5px 3px -1.5px rgba(0, 0, 0, 0.3);
  }

  & > *:hover {
    box-shadow: 0 5px 10px -1px rgba(50, 50, 93, 0.6),
      0 1.5px 3px -1.5px rgba(0, 0, 0, 0.5);
  }

  &:hover {
    transform: scale(0.9);
  }
`

const logoContainer = css`
  width: 47px;
  height: 47px;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease-in-out;
  border-radius: 50%;
  // border: solid 1px #4c91a9;
  padding: 10px;
  margin-top: -8px;
  background-color: #dcecff;
  box-shadow: 0 2.5px 5px -1px rgba(50, 50, 93, 0.25),
    0 1.5px 3px -1.5px rgba(0, 0, 0, 0.3);
  &:hover {
    transform: scale(0.9);
    box-shadow: 0 5px 10px -1px rgba(50, 50, 93, 0.6),
      0 1.5px 3px -1.5px rgba(0, 0, 0, 0.5);
  }
`

const userImageStyles = css`
  display: flex;
  justify-content: center;
`

const userImageInner = css`
  width: 100%;
  transition: all 0.2s ease-in-out;
  max-width: 350px;

  @media only screen and (max-width: 592px) {
    margin-bottom: 30px;
  }
`

const personTitleStyles = css`
  color: #4c91a9;
  margin-bottom: 10px;
`

const personBorder = css`
  background-color: #b4c3ca;
  width: 30px;
  height: 1px;
  margin-top: 20px;
  margin-bottom: 25px;
`

const personDescription = css`
  padding-top: 15px;
  padding-bottom: 35px;
`

const titleHeader = css`
  font-weight: 300;
  font-size: 18px;
  color: #8091a5;
`

const whoWeAreHeader = css`
  color: #0f346c;
  font-size: 35px;
  font-weight: 600;
  padding-top: 10px;
  text-align: left;
  @media only screen and (max-width: 592px) {
    text-align: center;
  }
`

const shounenStyles = css`
  background: linear-gradient(to right, #13346c, #4c91a9);
  -webkit-box-decoration-break: clone;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const logoCloud = css`
  display: flex;
  align-items: center;
  & > * {
    margin-right: 10px;
  }
`

const emailLogo = css`
  fill: #4c91a9;
`

const contactWrapper = css`
  display: flex;
  align-items: center;
  justify-content: center;
`

const contactContainer = css`
  margin-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 5px;
  max-width: 1000px;
`

const contactInfoContainer = css`
  padding-top: 20px;
  padding-bottom: 30px;
`

const helpHeaderText = css`
  color: #0f346c;
`

export default AboutContainer

export const query = graphql`
  query AboutContainerQuery {
    leonImage: file(relativePath: { eq: "lPhoto.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 400, quality: 90) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    jonImage: file(relativePath: { eq: "jPhoto.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 400, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    linkedinImage: file(relativePath: { eq: "linkedinLogo.png" }) {
      childImageSharp {
        fixed(width: 48, height: 48) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    facebookImage: file(relativePath: { eq: "facebookLogo.png" }) {
      childImageSharp {
        fixed(width: 45, height: 45) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    emailImage: file(relativePath: { eq: "email.png" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
