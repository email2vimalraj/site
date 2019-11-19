import 'typeface-montserrat'
import 'typeface-merriweather'
import { toTheme } from '@theme-ui/typography'
import typography from 'typography-theme-wordpress-2016'
import merge from 'deepmerge'

const typographyTheme = toTheme(typography)

const innerMargin = 85
const content = 420

const theme = merge.all([
  typographyTheme,
  {
    colors: {
      darkBackground: '#131217',
      codeBlockBackground: '#1b191f',
      text: '#d9d7e0',
      muted: 'rgba(175, 173, 169, 0.5)'
    },
    space: {
      ...typographyTheme.space,
      innerMargin,
      topMargin: 256,
      fullContentWidth: innerMargin * 2 + content
    },
    sizes: {
      content
    },
    fonts: {
      heading: 'Montserrat, sans-serif',
      monospace: `Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace`
    },
    styles: {
      root: {
        fontFamily: 'body'
      },
      a: {
        color: 'inherit',
        textDecoration: 'none',
        borderBottom: '1px solid',
        borderColor: 'muted'
      },
      ul: {
        listStyleType: 'none',
        margin: 0,
        padding: 0,
        overflow: 'hidden'
      },
      li: {
        float: 'left',
        marginBottom: '4px',
        code: {
          fontSize: 'inherit'
        }
      },
      pre: {
        variant: 'prism',
        fontFamily: 'monospace',
        tabSize: 2,
        hyphens: 'none',
        overflow: 'auto',
        borderRadius: 10,
        p: 0,
        pl: 2,
        color: 'text',
        backgroundColor: 'codeBlockBackground',
        marginBottom: '28px',
        whitespace: 'pre-wrap'
      },
      code: {
        fontFamily: 'monospace',
        fontSize: 'inherit'
      },
      h3: {
        marginTop: 4
      },
      inlineCode: {
        borderRadius: '0.3em',
        paddingTop: '0.15em',
        paddingBottom: '0.05em',
        paddingX: '0.2em'
      },
      hr: {
        borderColor: 'muted'
      },
      p: {
        code: {
          fontSize: 'inherit'
        }
      },
      blockquote: {
        color: 'inherit',
        borderLeftColor: 'inherit',
        opacity: 0.8,
        '&.translation': {
          fontSize: '1em'
        }
      },
      waves: {
        default: {
          Wave: {
            width: ['100%', content * 2 + innerMargin * 2],
            marginLeft: [0, -(content + 2 * innerMargin)],
            marginBottom: '28px',
            position: 'relative',
            display: ['block', 'flex']
          },
          ScrollerContainer: {
            paddingTop: ['80px', 0],
            width: ['auto', 'content'],
            paddingLeft: [0, innerMargin]
          },
          ScrollerStep: {
            position: 'relative',
            padding: 0,
            minHeight: '400px',
            display: 'flex',
            alignItems: 'center',
            borderLeft: 0
          }
        }
      }
    }
  }
])

theme.breakpoints = ['1000px']

theme.prism = {
  '.builtin, .changed, .keyword, .punctuation, .operator, .tag, .deleted, .string, .attr-value, .char, .number, .inserted': {
    color: '#0f8f5e'
  },
  '.comment, .cdata, .doctype': {
    fontStyle: 'italic'
  }
}

export default theme
