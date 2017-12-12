import React from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers';
import { config } from 'config';
import ReadNext from '../ReadNext';
import SocialShare from '../SocialShare';
import SEO from '../SEO';
import './style.css';
import '../../static/css/ateliersulphurpool.light.css';

class SitePost extends React.Component {
  render() {
    const { route } = this.props;
    const post = route.page.data;
    const home = (
      <div>
        <Link className="gohome" to={prefixLink('/')}>All Articles</Link>
      </div>
    );

    const postPath = route.page.path;
    const url = config.siteUrl + postPath;

    return (
      <div>
        <SEO postPath={postPath} post={post} postSEO />
        {home}
        <div className="blog-single">
          <div className="text">
            <h1>{post.title}</h1>
            { post.cover && (
              <div className="cover">
                <img src={post.cover} role="presentation" />
              </div>
            )}
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
