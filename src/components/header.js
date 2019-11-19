/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { graphql, useStaticQuery } from 'gatsby'

const query = graphql`
  query SiteData {
    site {
      siteMetadata {
        title
        url
        logo
        twitterUsername
      }
    }
    imageSharp {
      fixed(width: 32, height: 32) {
        src
      }
    }
  }
`

function Header() {
  const data = useStaticQuery(query)

  return (
    <div
      sx={{
        display: 'flex',
        flexDirection: 'row'
      }}
    >
      <img src={data.imageSharp.fixed.src} alt="logo" />

      <div
        sx={{
          display: 'flex'
        }}
      >
        <Styled.ul>
          <Styled.li>Home</Styled.li>
          <Styled.li>Posts</Styled.li>
        </Styled.ul>
      </div>
    </div>
  )
}

export default Header
