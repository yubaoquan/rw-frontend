import classnames from 'classnames';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Articles from 'components/home/articles';
import Pagination from 'components/home/pagination';
import Tags from 'components/home/tags';
import ArticleStore from 'store/article';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const home: React.FC<{ store: ArticleStore }> = observer(({ store }) => {
  const { fetchArticles, articles } = store;
  React.useEffect(() => {
    fetchArticles();
  }, []);

  const tags: any = [];
  const totalPages = 0;
  const page = 0;

  const query = useQuery();
  const tag = query.get('tag');
  const tab = query.get('tab');

  const handleMarkArticle = () => {
    console.info('123');
  };

  const renderNavItem = ({ className = '', pathname = '/', search = '', title }: {
    className: string;
    pathname?: string;
    search: string;
    title: string;
  }) => (
    <li className="nav-item" v-if="user">
      <Link className={className} to={{ pathname, search }}>{title}</Link>
    </li>
  );

  const nav = (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        {renderNavItem({
          className: classnames('nav-link', { active: tab === 'your_feed' }),
          search: '?tab=your_feed',
          title: 'Your Feed',
        })}

        {renderNavItem({
          className: classnames('nav-link', { active: tab === 'global_feed' }),
          search: '?tab=global_feed',
          title: 'Global Feed',
        })}

        {tag && renderNavItem({
          className: classnames('nav-link', 'active'),
          search: `?tag=${tag}`,
          title: `#${tag}`,
        })}
      </ul>
    </div>
  );

  return (
    <>
      <div className="home-page">
        <div className="banner">
          <div className="container">
            <h1 className="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>

        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              {nav}
              <Articles articles={articles} handleMark={handleMarkArticle} />
            </div>

            <div className="col-md-3">
              <Tags tags={tags} />
            </div>
          </div>

          <Pagination total={totalPages} current={page} />
        </div>
      </div>
    </>
  );
});

export default home;
