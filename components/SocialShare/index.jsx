import PropTypes from 'prop-types';
import React from 'react';
import {
  ShareButtons,
} from 'react-share';
import { config } from 'config';

import './style.css';

const {
  TwitterShareButton,
  FacebookShareButton,
} = ShareButtons;

const SocialShare = ({ title, url }) => (
  <div className="social-share">
    <TwitterShareButton
      url={url}
      title={title}
      via={config.siteTwitterHandle}
    >
      <i className="fa fa-twitter" />
    </TwitterShareButton>

    <FacebookShareButton url={url}>
      <i className="fa fa-facebook" />
    </FacebookShareButton>
  </div>
);

SocialShare.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default SocialShare;