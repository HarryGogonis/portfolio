// https://raw.githubusercontent.com/Vagr9K/gatsby-advanced-starter/master/src/components/SEO/SEO.jsx
import React, { Component } from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'

import { config } from 'config'
import profilePic from '../../pages/photo.jpg';

const { siteUrl, siteTitleAlt } = config

class SEO extends Component {
  static propTypes = {
    post: PropTypes.shape({
      cover: PropTypes.string,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
    }),
    postPath: PropTypes.string,
    postSEO: PropTypes.bool,
  }

  getTitle() {
    const { post, postSEO } = this.props

    if (postSEO) {
      return post.title
    }
    return config.siteTitle
  }

  getDescription() {
    const { post, postSEO } = this.props
  
    if (postSEO) {
      return post.description
    }
    return config.siteDescr
  }

  getImage() {
    const { post, postSEO, postPath } = this.props
    const postUrl = siteUrl + postPath

    if (postSEO) {
      return post.cover && (postUrl + post.cover)
    }
    return config.siteLogo
  }

  getPostUrl() {
    const { post, postPath, postSEO } = this.props

    if (postSEO) {
      return siteUrl + postPath
    }
    return null
  }

  render() {
    const { post, postPath, postSEO } = this.props
    const title = this.getTitle()
    const description = this.getDescription()
    const image = this.getImage();
    const postUrl = this.getPostUrl();

    const schemaOrgJSONLD = [
      {
        '@context': 'http://schema.org',
        '@type': 'WebSite',
        url: siteUrl,
        name: title,
        alternateName: siteTitleAlt ? siteTitleAlt : '',
      },
    ];

    if (postSEO) {
      schemaOrgJSONLD.push([
        {
          '@context': 'http://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              item: {
                '@id': postUrl,
                name: title,
                image,
              },
            },
          ],
        },
        {
          '@context': 'http://schema.org',
          '@type': 'BlogPosting',
          url: siteUrl,
          name: title,
          alternateName: config.siteTitleAlt ? config.siteTitleAlt : '',
          headline: title,
          image: {
            '@type': 'ImageObject',
            url: image,
          },
          description,
        },
      ]);
    }

    return (
      <Helmet>
        {/* General tags */}
        <meta name="description" content={description} />
        <meta name="image" content={image} />

        {/* Schema.org tags */}
        <script type="application/ld+json">
          {JSON.stringify(schemaOrgJSONLD)}
        </script>

        {/* OpenGraph tags */}
        <meta property="og:url" content={postSEO ? postUrl : siteUrl} />
        {postSEO ? <meta property="og:type" content="article" /> : null}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta
          property="fb:app_id"
          content={config.siteFBAppID ? config.siteFBAppID : ''}
        />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:creator"
          content={config.siteTwitterHandle ? config.siteTwitterHandle : ''}
        />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
      </Helmet>
    );
  }
}

export default SEO;
