import React from 'react'
import Header from './header'
import Helmet from 'react-helmet'

const Layout = ({ children, title }) => (
  <>
    <Helmet
      key="app-head"
      titleTemplate="%s  -  Vimalraj Selvam"
      defaultTitle="Vimalraj Selvam's Blog"
      defer={false}
    >
      <html lang="en" />

      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <title>{title}</title>

      {/* Favicon stuff */}
      <meta name="apple-mobile-web-app-title" content="vimalrajselvam.com" />
      <meta name="application-name" content="vimalrajselvam.com" />
      <meta name="theme-color" content="#1B1F23" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
    </Helmet>
    <Header />
    {children}
  </>
)

export default Layout
