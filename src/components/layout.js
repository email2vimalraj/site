/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { Global } from '@emotion/core'

function Layout({ children }) {
  return (
    <Styled.root
      sx={{
        display: 'flex',
        width: '100vw'
      }}
    >
      <Global
        styles={{
          body: {
            margin: 0,
            overflowX: 'hidden'
          }
        }}
      />
      <div
        sx={{
          bg: 'darkBackground',
          color: 'text',
          width: ['100%', '50%'],
          minHeight: '100vh'
        }}
      >
        {children}
      </div>
    </Styled.root>
  )
}

export default Layout
