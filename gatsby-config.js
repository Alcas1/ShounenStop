require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = {
  developMiddleware: app => {
    app.use(
      '/.netlify/functions/',
      createProxyMiddleware({
        target: 'http://localhost:9000',
        pathRewrite: {
          '/.netlify/functions/': '',
        },
      })
    )
  },
  siteMetadata: {
    title: `Shounen Stop`,
    description: `Weiss Schwarz, Comiket, and Anime items at a great value.`,
    author: `Jonathan Wu`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `site-images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#0f346c`,
        theme_color: `#0f346c`,
        display: `minimal-ui`,
        icon: 'src/images/shounenStopLogo.png',
      }
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          'gatsby-remark-relative-images',
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2000,
              backgroundColor: 'transparent', // required to display blurred image first
              linkImagesToOriginal: false // Important!
            },
          }
        ],
      },
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/LayoutItems/Layout.js`),
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Varela Round\:400`, `Montserrat\:300,400,700`, `Lato\:400`],
        display: 'swap',
      },
    },
    // {
    //   resolve: `gatsby-transformer-remark`,
    //   options: {
    //     excerpt_separator: `<!-- end excerpt -->`,
    //     pedantic: true,
    //     // GitHub Flavored Markdown mode (default: true)
    //     gfm: true,
    //     // Plugins configs
    //     plugins: [],
    //   },
    // },
    'gatsby-plugin-emotion',
    // must be after other CSS plugins
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
    'gatsby-plugin-netlify-cms',
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        /**
         * One convention is to place your Netlify CMS customization code in a
         * `src/cms` directory.
         */
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    'gatsby-plugin-remove-fingerprints',
    'gatsby-plugin-netlify', // make sure to keep it last in the array
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: null,
        sitemap: null,
        policy: [{userAgent: '*', disallow: ['/about/']}]
      }
    }
  ],
}
