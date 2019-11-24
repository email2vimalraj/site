import React from 'react'
import { graphql } from 'gatsby'

import Posts from '../components/posts'

export const query = graphql`
  query MdxAllBlogPosts {
    allBlogPost(sort: { fields: [date, title], order: DESC }) {
      nodes {
        id
        slug
        title
        excerpt(pruneLength: 140)
        date(formatString: "DD MMM, YYYY")
      }
    }
  }
`

const Home = ({
  data: {
    allBlogPost: { nodes }
  }
}) => {
  return (
    <>
      <Posts data={nodes} />
    </>
  )
}

export default Home
