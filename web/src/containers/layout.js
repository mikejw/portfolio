import {graphql, StaticQuery} from 'gatsby'
import React, {useState} from 'react'
import Layout from '../components/layout'
import bgImage from "../images/fractal.jpg";

const query = graphql`
  query SiteTitleQuery {
    site: sanitySiteSettings(_id: {regex: "/(drafts.|)siteSettings/"}) {
      title
    }
  }
`

function LayoutContainer (props) {
  const [showNav, setShowNav] = useState(false)
  function handleShowNav () {
    setShowNav(true)
  }
  function handleHideNav () {
    setShowNav(false)
  }

  const containerStyle = {
    backgroundColor: '#fafafa',
    backgroundImage: `url(${bgImage})`,
    backgroundSize: '844px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top right'
  }

  return (
    <StaticQuery
      query={query}
      render={data => {
        if (!data.site) {
          throw new Error(
            'Missing "Site settings". Open the studio at http://localhost:3333 and add "Site settings" data'
          )
        }
        return (
          <div style={containerStyle}>
            <Layout
              {...props}
              showNav={showNav}
              siteTitle={data.site.title}
              onHideNav={handleHideNav}
              onShowNav={handleShowNav}
            />
          </div>
        )
      }}
    />
  )
}

export default LayoutContainer
