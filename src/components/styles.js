import styled from 'styled-components'
import { up } from 'styled-breakpoints'

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: auto;
  margin-left: auto;

  ${up('desktop')} {
    margin: auto;
    max-width: 800px;
  }
`

export const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-bottom: 1px solid #2f363d;
`

export const PostTitle = styled.h2`
  a {
    text-decoration: none;
    color: #fff;

    &:hover {
      text-decoration: none;
      color: tomato;
    }
  }

  margin-bottom: 10px;
`

export const PostDate = styled.span`
  margin-bottom: 20px;
  font-size: 14px;
  color: #777;
`
