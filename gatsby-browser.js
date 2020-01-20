const React = require('react')
const { createGlobalStyle } = require('styled-components')

require('prismjs/themes/prism-okaidia.css')

const Layout = require('./src/components/layout').default

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Fira+Code:300|Roboto&display=swap');
  
  /* Reset */
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }
  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
      display: none;
  }
  body {
    line-height: 1;
  }
  strong {
    font-weight: bold;
  }
  /* ol, ul {
    list-style: none;
  } */
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  /* Global Styles */
  body {
    background-color: #1B1F23;
    color: #fff;
    font-family: 'Fira Code', monospace, sans-serif;
    font-size: 16px;
    line-height: 24px;
    margin: 0;
  }

  h1, h2, h3, h4, h5 {
    font-family: 'Roboto', monospace, sans-serif;
    font-weight: bold;
  }

  h1 {
    font-size: 40px;
    line-height: 50px;
  }

  h2 {
    font-size: 28px;
    line-height: 1.25;
  }

  p {
    margin-bottom: 10px;
  }

  a {
    text-decoration: none;
    color: #fff;

    &:hover {
      text-decoration: none;
      color: tomato;
    }
  }

  pre {
    background-color: #313940;
    padding: 10px;
    overflow: auto;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  code {
    background-color: #313940;
  }
`

exports.wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}

exports.wrapRootElement = ({ element }) => {
  return (
    <>
      <GlobalStyle />
      {element}
    </>
  )
}
