import React from 'react'
import styled from 'styled-components'
import { up } from 'styled-breakpoints'
import { graphql, useStaticQuery } from 'gatsby'
import Hamburger from './hamburger'
import { OutboundLink } from 'gatsby-plugin-google-analytics'

const StyledNav = styled.nav`
  padding: 5px 20px;
  border-bottom: 1px solid #2f363d;
`

const StyledUl = styled.ul`
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  ${up('tablet')} {
    justify-content: center;
  }
`

const StyledListItem = styled.li`
  font-size: 16px;
  padding: 15px 5px;
  white-space: nowrap;

  a {
    color: rgb(217, 215, 224);
    text-decoration: none;
  }

  ${up('desktop')} {
    display: block;
    width: auto;
    order: 1;
    padding: 15px 10px;
  }
`

const LogoItem = styled(StyledListItem)`
  a {
    &:hover {
      text-decoration: none;
    }
  }

  ${up('tablet')} {
    flex: 1;
  }

  ${up('desktop')} {
    order: 0;
  }
`

const ToggleItem = styled(StyledListItem)`
  order: 1;

  ${up('tablet')} {
    flex: 1;
    text-align: right;
    order: 2;
  }

  ${up('desktop')} {
    display: none;
  }
`

const MenuItem = styled(StyledListItem)`
  order: 3;
  width: 100%;
  text-align: center;
  display: ${props => (props.active ? 'block' : 'none')};
`

const ButtonMenuItem = styled(MenuItem)`
  order: 2;
  border-bottom: ${props => (props.secondary ? '1px solid #2f363d' : '')};

  ${up('tablet')} {
    width: auto;
    order: 1;
    display: block;
    border: ${props => (props.secondary ? 0 : '')};

    a {
      padding: 7.5px 15px;

      &:hover {
        text-decoration: none;
      }
    }
  }

  ${up('desktop')} {
    order: 2;
    padding-right: 0;
  }
`

const query = graphql`
  query SiteData {
    site {
      siteMetadata {
        logo
      }
    }
    imageSharp {
      fixed(width: 32, height: 32) {
        src
      }
    }
  }
`

const Header = () => {
  const [openMenu, setOpenMenu] = React.useState(false)
  const data = useStaticQuery(query)

  return (
    <StyledNav>
      <StyledUl>
        <LogoItem>
          <a href="/">
            <img src={data.imageSharp.fixed.src} alt="Vimalraj Selvam Logo" />
          </a>
        </LogoItem>

        <MenuItem active={openMenu}>
          <a href="/">Posts</a>
        </MenuItem>
        {/* <MenuItem active={openMenu}>
          <a href="/">Talks</a>
        </MenuItem> */}
        <MenuItem active={openMenu}>
          <a href="/about">About</a>
        </MenuItem>

        <ButtonMenuItem active={openMenu}>
          <OutboundLink
            href="https://twitter.com/email2vimalraj"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </OutboundLink>
        </ButtonMenuItem>
        <ButtonMenuItem active={openMenu} secondary>
          <OutboundLink
            href="https://github.com/email2vimalraj"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </OutboundLink>
        </ButtonMenuItem>

        <ToggleItem>
          <a
            href="/"
            onClick={e => {
              e.preventDefault()
              setOpenMenu(!openMenu)
            }}
          >
            <Hamburger />
          </a>
        </ToggleItem>
      </StyledUl>
    </StyledNav>
  )
}

export default Header
