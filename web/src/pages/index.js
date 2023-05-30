import React from 'react'
import {graphql} from 'gatsby'
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from '../lib/helpers'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import ProjectPreviewGrid from '../components/project-preview-grid'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import styles from '../components/header.module.css'

export const query = graphql`
  query IndexPageQuery {
    site: sanitySiteSettings(_id: {regex: "/(drafts.|)siteSettings/"}) {
      title
      description
      keywords
    }
    projects: allSanitySampleProject(
      limit: 6
      sort: {fields: [startedAt], order: DESC}
      filter: {slug: {current: {ne: null}}, publishedAt: {ne: null}}
    ) {
      edges {
        node {
          id
          mainImage {
            crop {
              _key
              _type
              top
              bottom
              left
              right
            }
            hotspot {
              _key
              _type
              x
              y
              height
              width
            }
            asset {
              _id
            }
            alt
          }
          title
          _rawExcerpt
          slug {
            current
          }
        }
      }
    }
  }
`

const IndexPage = props => {
  const {data, errors} = props

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const site = (data || {}).site
  const projectNodes = (data || {}).projects
    ? mapEdgesToNodes(data.projects)
      .filter(filterOutDocsWithoutSlugs)
      .filter(filterOutDocsPublishedInTheFuture)
    : []

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    )
  }

  return (
    <Layout>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.branding}>
            <ul>
              <li>React/Frontend Architect</li>
              <li>Full Stack</li>
              <li>Cloud Infrastructure</li>
            </ul>
            <p>
              Please feel free to contact me<br />
              for more information and a<br />
              copy of my CV:
            </p>
            <ul>
             <li>mail@mikejw.co.uk</li>
            </ul>
            <div>
              <a target="_blank" href="https://www.linkedin.com/in/mikeyjw/"><i className="fa fa-linkedin"></i></a>
              <a target="_blank" href="https://github.com/mikejw"><i className="fa fa-github"></i></a>
              <a target="_blank" href="https://twitter.com/mikejw"><i className="fa fa-twitter"></i></a>
              <a target="_blank" href="https://instagram.com/mikejw9000"><i className="fa fa-instagram"></i></a>
              <a target="_blank" href="https://www.facebook.com/mikejw9000"><i className="fa fa-facebook"></i></a>
              <a target="_blank" href="https://stackoverflow.com/users/6108127/mikejw"><i className="fa fa-stack-overflow"></i></a>
              <a target="_blank" href="https://stackexchange.com/users/8106900/mikejw"><i className="fa fa-stack-exchange"></i></a>
              <a target="_blank" href="https://gitlab.com/mikejw"><i className="fa fa-gitlab"></i></a>
            </div>
          </div>
        </div>

        <h1 hidden>Welcome to {site.title}</h1>
        {projectNodes && (
          <ProjectPreviewGrid
            title='Latest projects'
            nodes={projectNodes}
            browseMoreHref='/archive/'
          />
        )}
      </Container>
    </Layout>
  )
}

export default IndexPage
