import React from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers';
import { config } from 'config';
import ReadNext from '../ReadNext';
import SocialShare from '../SocialShare';
import './style.css';
import '../../static/css/highlight.css';

class SitePost extends React.Component {
  render() {
    const { route } = this.props;
    const post = route.page.data;
    const home = (
      <div>
        <Link className="gohome" to={prefixLink('/')}>All Articles</Link>
      </div>
    );

    const url = config.siteUrl + route.page.path;

    return (
      <div>
        {home}
        <div className="blog-single">
          <div className="text">
            <h1>{post.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: post.body }} />
            <div className="date-published">
              <em>Published {moment(post.date).format('D MMM YYYY')}</em>
            </div>
            <SocialShare title={post.title} url={url} />
          </div>
          <div className="footer">
            <ReadNext post={post} {...this.props} />
            <hr />
            <p>
              {config.siteDescr}
              <a href={`https://twitter.com/${config.siteTwitterHandle}`}>
                <br /> <strong>{config.siteAuthor}</strong> on Twitter
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

SitePost.propTypes = {
  route: React.PropTypes.object.isRequired,
};

export default SitePost;
