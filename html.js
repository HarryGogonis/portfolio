import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import { prefixLink } from 'gatsby-helpers';

import faviconApple from './static/favicons/apple-touch-icon.png'
import favicon32 from './static/favicons/favicon-32x32.png'
import favicon16 from './static/favicons/favicon-16x16.png'
import manifest from './static/favicons/manifest.json'
import safariPinned from './static/favicons/safari-pinned-tab.svg'
import faviconICO from './static/favicons/favicon.ico'

const BUILD_TIME = new Date().getTime();

module.exports = React.createClass({
  displayName: 'HTML',
  propTypes: {
    body: PropTypes.string,
  },
  render() {
    const { body } = this.props;
    const helmet = Helmet.rewind()

    const fonts = [
      <link href="https://fonts.googleapis.com/css?family=Libre+Franklin:100italic,300,400,400italic,500,700&subset=latin,cyrillic" rel="stylesheet" type="text/css" />,
      <link href="https://fonts.googleapis.com/css?family=Libre+Baskerville:400,400italic,500,700&subset=latin,cyrillic" rel="stylesheet" type="text/css" />,
    ];
    let css;
    if (process.env.NODE_ENV === 'production') {
      // eslint-disable-next-line import/no-webpack-loader-syntax
      css = <style dangerouslySetInnerHTML={{ __html: require('!raw!./public/styles.css') }} />;
    }

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0 maximum-scale=5.0" />
          <link rel="apple-touch-icon" sizes="180x180" href={faviconApple} />
          <link rel="icon" type="image/png" sizes="32x32" href={favicon32} />
          <link rel="icon" type="image/png" sizes="16x16" href={favicon16} />
          <link rel="manifest" href={manifest} />
          <link rel="mask-icon" href={safariPinned} color="#1abc9c" />
          <link rel="shortcut icon" href={faviconICO} />
          <meta name="theme-color" content="#1abc9c" />
          <meta
            name="description"
            content="React/Redux Software Engineer for hire. Gainesville, Florida"
          />
          <meta property="og:site_name" content="Harry Gogonis" />
          { helmet.title.toComponent() }
          { helmet.meta.toComponent() }
          { fonts }
          { css }
        </head>
        <body>
          <div id="react-mount" dangerouslySetInnerHTML={{ __html: this.props.body }} />
          <script src={prefixLink(`/bundle.js?t=${BUILD_TIME}`)} />
        </body>
      </html>
    );
  },
});