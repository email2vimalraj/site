const crypto = require('crypto')
const { createFilePath } = require('gatsby-source-filesystem')

let contentPath = `posts`

const PostTemplate = require.resolve(`./src/templates/post`)

const mdxResolverPassthrough = fieldName => async (
  source,
  args,
  context,
  info
) => {
  const type = info.schema.getType(`Mdx`)
  const mdxNode = context.nodeModel.getNodeById({ id: source.parent })
  const resolver = type.getFields()[fieldName].resolve
  const result = await resolver(mdxNode, args, context, { fieldName })
  return result
}

exports.sourceNodes = ({ actions, schema }) => {
  const { createTypes } = actions
  createTypes(
    schema.buildObjectType({
      name: `BlogPost`,
      fields: {
        id: { type: `ID!` },
        title: { type: `String!` },
        slug: { type: `String!` },
        date: { type: `Date`, extensions: { dateformat: {} } },
        tags: { type: `[String]!` },
        keywords: { type: `[String]!` },
        excerpt: {
          type: `String!`,
          args: {
            pruneLength: {
              type: `Int`,
              defaultValue: 140
            }
          },
          resolve: mdxResolverPassthrough(`excerpt`)
        },
        body: {
          type: `String!`,
          resolve: mdxResolverPassthrough(`body`)
        }
      },
      interfaces: [`Node`]
    })
  )
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      mdxPages: allBlogPost(
        sort: { fields: [date, title], order: DESC }
        limit: 1000
      ) {
        edges {
          node {
            id
            excerpt
            slug
            title
            date(formatString: "MMMM DD, YYYY")
            parent {
              parent {
                ... on File {
                  relativeDirectory
                }
              }
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panic(result.errors)
  }

  // create post pages
  const { mdxPages } = result.data
  const posts = mdxPages.edges

  // create a page for each post
  posts.forEach(({ node: post }) => {
    const { slug } = post
    createPage({
      path: `/post${slug}`,
      component: PostTemplate,
      context: {
        ...post,
        relativeDirectory: post.parent.parent.relativeDirectory
      }
    })
  })
}

// create fields for post slugs and source
// this will change with schema customization
exports.onCreateNode = ({ node, actions, getNode, createNodeId }) => {
  const { createNode, createParentChildLink } = actions

  // make sure it's an mdx node
  if (node.internal.type !== `Mdx`) {
    return
  }

  // create source filed (according to contentPath)
  const fileNode = getNode(node.parent)
  const source = fileNode.sourceInstanceName

  if (node.internal.type === `Mdx` && source === contentPath) {
    const slug = createFilePath({
      node: fileNode,
      getNode,
      basePath: contentPath
    })

    const fieldData = {
      title: node.frontmatter.title,
      tags: node.frontmatter.tags || [],
      slug,
      date: node.frontmatter.date,
      keywords: node.frontmatter.keywords || []
    }

    createNode({
      ...fieldData,
      // Required fields
      id: createNodeId(`${node.id} >>> BlogPost`),
      parent: node.id,
      children: [],
      internal: {
        type: `BlogPost`,
        contentDigest: crypto
          .createHash('md5')
          .update(JSON.stringify(fieldData))
          .digest(`hex`),
        content: JSON.stringify(fieldData),
        description: `Blog Posts`
      }
    })
    createParentChildLink({ parent: fileNode, child: node })
  }
}
