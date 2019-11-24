import React from 'react'
import { MainContainer, PostContainer, PostTitle } from './styles'
import { MDXRenderer } from 'gatsby-plugin-mdx'

const PostComponent = ({ data: { post }, location }) => {
  return (
    <MainContainer>
      <PostContainer>
        <PostTitle>{post.title}</PostTitle>
        <MDXRenderer>{post.body}</MDXRenderer>
      </PostContainer>
    </MainContainer>
  )
}

export default PostComponent
