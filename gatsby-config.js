module.exports = {
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 420,
              linkImagesToOriginal: true,
              tracedSVG: true
            }
          },
          'gatsby-remark-smartypants',
          'gatsby-remark-import-code'
        ],
        remarkPlugins: [require('remark-slug')]
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'assets',
        path: `${__dirname}/static/`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `posts`,
        name: 'posts'
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`
          },
          `gatsby-remark-images`
        ]
      }
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        // Setting a color is optional.
        color: `tomato`,
        // Disable the loading spinner.
        showSpinner: false
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-71748535-1',
        head: false,
        pageTransitionDelay: 0
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Vimalraj Selvam`,
        short_name: `Vimalraj`,
        start_url: `/`,
        background_color: `#1B1F23`,
        theme_color: `#1B1F23`,
        icon: `static/android-chrome-512x512.png`
      }
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-sitemap`
  ],
  siteMetadata: {
    title: `Vimalraj's Blog`,
    description: `
      I'm known as Vimalraj Selvam. I like to write code and teach. 
      I'm passionate about latest technologies and distributed systems. 
      I love logs and help building observability systems.
    `,
    siteUrl: 'https://vimalrajselvam.com',
    twitterUsername: '@email2vimalraj',
    logo: '/favicon-32x32.png',
    image: `https://vimalrajselvam.com/profile-pic.jpg`
  }
}
