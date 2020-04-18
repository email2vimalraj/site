import React from 'react'
import { graphql } from 'gatsby'

import Post from '../components/post'

export default ({ location, data }) => <Post data={data} location={location} />

export const PageQuery = graphql`
  query($id: String!, $relativeDirectory: String = "home") {
    post: blogPost(id: { eq: $id }) {
      id
      title
      slug
      date(formatString: "MMMM DD, YYYY")
      excerpt
      body
      description
    }
    card: file(
      name: { eq: "card" }
      relativeDirectory: { eq: $relativeDirectory }
    ) {
      childImageSharp {
        fixed(height: 628) {
          src
        }
      }
    }
  }
`
