import React from 'react'
import styled from 'styled-components'
import { MainContainer } from './maincontainer'

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-bottom: 1px solid #2f363d;
`

const PostTitle = styled.h2`
  a {
    text-decoration: none;
    color: #fff;

    &:hover {
      text-decoration: none;
      color: tomato;
    }
  }

  margin-bottom: 24px;
`

const Posts = () => {
  return (
    <MainContainer>
      <PostContainer>
        <PostTitle>
          <a href="/">Post Title goes here</a>
        </PostTitle>
        <p>
          Laborum laboris ex consequat cillum laboris ipsum adipisicing fugiat.
          In aliqua ipsum est ipsum Lorem Lorem dolore sit. Id occaecat
          consequat sit consectetur qui id exercitation. Amet aute mollit ad
          eiusmod dolor tempor consequat aute amet irure est. Aute deserunt id
          occaecat eu non. Esse labore dolor nisi proident non. Nisi veniam anim
          veniam labore mollit sit nulla veniam nisi cupidatat tempor.
        </p>
      </PostContainer>

      <PostContainer>
        <PostTitle>
          <a href="/">Post Title goes here</a>
        </PostTitle>
        <p>
          Laborum laboris ex consequat cillum laboris ipsum adipisicing fugiat.
          In aliqua ipsum est ipsum Lorem Lorem dolore sit. Id occaecat
          consequat sit consectetur qui id exercitation. Amet aute mollit ad
          eiusmod dolor tempor consequat aute amet irure est. Aute deserunt id
          occaecat eu non. Esse labore dolor nisi proident non. Nisi veniam anim
          veniam labore mollit sit nulla veniam nisi cupidatat tempor.
        </p>
      </PostContainer>

      <PostContainer>
        <PostTitle>
          <a href="/">Post Title goes here</a>
        </PostTitle>
        <p>
          Laborum laboris ex consequat cillum laboris ipsum adipisicing fugiat.
          In aliqua ipsum est ipsum Lorem Lorem dolore sit. Id occaecat
          consequat sit consectetur qui id exercitation. Amet aute mollit ad
          eiusmod dolor tempor consequat aute amet irure est. Aute deserunt id
          occaecat eu non. Esse labore dolor nisi proident non. Nisi veniam anim
          veniam labore mollit sit nulla veniam nisi cupidatat tempor.
        </p>
      </PostContainer>
    </MainContainer>
  )
}

export default Posts
