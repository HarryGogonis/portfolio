import React from 'react';
import { config } from 'config';
import './style.css';
import '../../static/fonts/fontawesome/style.css';

class SiteLinks extends React.Component {
  render() {
    return (
      <div className="blog-links">
        <ul>
          {config.siteTwitterHandle && (
            <li>
              <a href={`http://twitter.com/${config.siteTwitterHandle}`}>
                <i className="fa fa-twitter" />
              </a>
            </li>
          )}
          {config.siteGithubUrl && (
            <li>
              <a href={config.siteGithubUrl}>
                <i className="fa fa-github-alt" />
              </a>
            </li>
          )}
          {config.siteLinkedInUrl && (
            <li>
              <a href={config.siteLinkedInUrl}>
                <i className="fa fa-linkedin" />
              </a>
            </li>
          )}
          {config.siteVkUrl && (
            <li>
              <a href={config.siteVkUrl}><i className="fa fa-vk" /></a>
            </li>
          )}
        </ul>
        <ul>
          {config.siteEmailUrl && (
            <li>
              <a href={`mailto:${config.siteEmailUrl}`}>
                <i className="fa fa-envelope-o" />
              </a>
            </li>
          )}
          {config.siteTelegramUrl && (
            <li>
              <a href={config.siteTelegramUrl}>
                <i className="fa fa-paper-plane" />
              </a>
            </li>
          )}
        </ul>
        <ul>
          {config.siteRssUrl && (
            <li>
              <a href={config.siteRssUrl}><i className="fa fa-rss" /></a>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default SiteLinks;
