import React from 'react'
import { Link } from 'gatsby'
import { MainContainer, PostContainer, PostTitle, PostDate } from './styles'

const Posts = ({ data }) => {
  return (
    <MainContainer>
      {data.map(post => {
        return (
          <PostContainer key={post.id}>
            <PostTitle>
              <Link to={`/post${post.slug}`}>{post.title}</Link>
            </PostTitle>
            <PostDate>{post.date}</PostDate>
            <p>{post.excerpt}</p>
          </PostContainer>
        )
      })}
    </MainContainer>
  )
}

export default Posts
