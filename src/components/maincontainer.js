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
