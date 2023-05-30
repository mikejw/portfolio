
import React, { useState } from 'react';
import { graphql } from 'gatsby';
import Container from '../../components/container';
import SEO from '../../components/seo';
import Layout from '../../containers/layout';
import MDContent from './MDContent';

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;

const ContentPage = ({data}) => {
  const post = data.markdownRemark;

  return (
    <>
      <SEO title={ post.frontmatter.title } description="" />
      <Layout>
        <Container>
          <MDContent title={post.frontmatter.title} html={post.html}/>
        </Container>
      </Layout>
    </>
  )
}

export default ContentPage;
