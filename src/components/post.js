import React from 'react'
import { MainContainer, PostContainer, PostTitle } from './styles'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import SEO from './seo'

const PostComponent = ({ data: { post }, location }) => {
  return (
    <>
      <SEO postMeta={post} isBlogPost />
      <MainContainer>
        <PostContainer>
          <PostTitle>{post.title}</PostTitle>
          <MDXRenderer>{post.body}</MDXRenderer>
        </PostContainer>
      </MainContainer>
    </>
  )
}

export default PostComponent
