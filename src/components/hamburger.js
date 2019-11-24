import React from 'react'
import styled from 'styled-components'

const HamburgerContainer = styled.div`
  display: inline-block;
  cursor: pointer;
`

const HamburgerLine = styled.div`
  width: 35px;
  height: 5px;
  margin: 6px 0;
  background-color: #fff;
  transition: 0.4s;
`

const HamburgerLine1 = styled(HamburgerLine)`
  transform: ${props =>
    props.toggle ? 'rotate(-45deg) translate(-9px, 6px)' : ''};
`

const HamburgerLine2 = styled(HamburgerLine)`
  opacity: ${props => (props.toggle ? 0 : 1)};
`

const HamburgerLine3 = styled(HamburgerLine)`
  transform: ${props =>
    props.toggle ? 'rotate(45deg) translate(-8px, -8px)' : ''};
`

const Hamburger = () => {
  const [toggle, setToggle] = React.useState(false)

  return (
    <HamburgerContainer onClick={() => setToggle(!toggle)}>
      <HamburgerLine1 toggle={toggle}></HamburgerLine1>
      <HamburgerLine2 toggle={toggle}></HamburgerLine2>
      <HamburgerLine3 toggle={toggle}></HamburgerLine3>
    </HamburgerContainer>
  )
}

export default Hamburger
