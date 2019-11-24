const description = `
I'm known as Vimalraj Selvam. I like to write code and teach. 
I love logs and build observability systems.
`

module.exports = {
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    `gatsby-plugin-styled-components`,
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 420,
              linkImagesToOriginal: false
            }
          },
          'gatsby-remark-smartypants',
          '@weknow/gatsby-remark-twitter',
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
    }
  ],
  siteMetadata: {
    title: 'Vimalraj Selvam',
    description,
    url: 'https://vimalrajselvam.dev',
    twitterUsername: '@email2vimalraj',
    logo: '/favicon-32x32.png'
  }
}
