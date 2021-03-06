import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import { ThemeProvider, theme as styledTheme, styled } from '../styled'
import Header from './header'

const Content = styled.div`
  height: 100%;
  width: 100%;
  .tp {
    padding-top: 1rem;
  }
  .wp {
    padding: 1rem 2.5rem 1rem 2.5rem;
  }
`

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            description
            keywords
          }
        }
      }
    `}
    render={data => (
      <Wrapper>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            {
              name: 'description',
              content: data.site.siteMetadata.description,
            },
            { name: 'keywords', content: data.site.siteMetadata.keywords },
          ]}
        >
          <html lang="en" />
        </Helmet>
        <Header />
        <Content>{children}</Content>
      </Wrapper>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

Layout.defaultProps = {}

const WithTheme = ({ children }) => (
  <ThemeProvider theme={styledTheme}>
    <Layout>{children}</Layout>
  </ThemeProvider>
)

export default WithTheme
