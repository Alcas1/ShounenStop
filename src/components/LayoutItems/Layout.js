import React from 'react'
import { StaticQuery, graphql, navigate } from 'gatsby'
import { ToastContainer, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { CartContext } from './CartContext'
import { css } from '@emotion/core'
import { window } from 'browser-monads';

import ShopNavbar from './ShopNavbar'
import LayoutFooter from './LayoutFooter'
import 'react-toastify/dist/ReactToastify.min.css'
import BottomBanner from './BottomBanner'
import { NSFWContextProvider } from '../../utils/NSFWContext'

class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
              }
            }
            bottomBannerInfo: file(relativePath: { eq: "shopping-cart.png" }) {
              childImageSharp {
                fixed(width: 30, height: 30) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        `}
        render={data => (
          <NSFWContextProvider>
            <CartContext>
              <ToastContainer
                closeButton={false}
                closeOnClick
                onClick={() => {
                  window.location.pathname !== '/cart' && navigate('/cart')
                }}
                transition={Slide}
                limit={3}
                css={toastStyles}
                rtl
              />
              <ShopNavbar
                pageInfo={this.props.pageInfo}
                title={data.site.siteMetadata.title}
              />
              <div
                css={mainContainerStyles}
                className="mainContainer"
              >
                {this.props.children}
              </div>
              <LayoutFooter />
              <BottomBanner />
            </CartContext>
          </NSFWContextProvider>
        )}
      />
    )
  }
}

const mainContainerStyles = css`
  @media (max-width: 450px) {
    min-height: calc(100vh - 200px);
  }
`

const toastStyles = css`
  .Toastify__progress-bar {
    border-bottom-right-radius: 4px;
  }

  .Toastify__toast--rtl {
    font-family: varela round;
    border-radius: 4px;
    color: #0f346c;

    margin-bottom: 20px;

    @media only screen and (max-width: 480px) {
      // right:0;
    }
  }
`

export default Layout
