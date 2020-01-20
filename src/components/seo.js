import React from 'react'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

const query = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        url
        twitterUsername
        image
      }
    }
  }
`

const SEO = ({ postMeta, isBlogPost }) => {
  const data = useStaticQuery(query)
  const seo = data.site.siteMetadata
  const title = postMeta.title || seo.title
  const description = postMeta.description || seo.description
  const image = seo.image
  const url = postMeta.slug ? `${seo.url}${postMeta.slug}` : seo.url

  return (
    <>
      <Helmet defer={false}>
        {/* General tags */}
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="image" content={image} />
        <link rel="canonical" href={url} />

        {/* OpenGraph tags */}
        <meta property="og:url" content={url} />
        {isBlogPost ? <meta property="og:type" content="article" /> : null}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content={seo.twitterUsername} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
      </Helmet>
    </>
  )
}

export default SEO
