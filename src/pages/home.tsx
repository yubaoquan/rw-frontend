import classnames from 'classnames';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Articles from 'components/home/articles';
import Pagination from 'components/home/pagination';
import Tags from 'components/home/tags';
import ArticleStore from 'store/article';
import UserStore from 'store/user';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

interface HomePageProps {
  articleStore: ArticleStore;
  userStore: UserStore;
}

enum FeedType {
  GLOBAL = 'global_feed',
  YOUR = 'your_feed',
}

const home: React.FC<HomePageProps> = observer((stores) => {
  const {
    fetchArticles,
    fetchTags,
    articles,
    tags,
    loadingArticles,
    loadingTags,
  } = stores.articleStore;
  const { user } = stores.userStore;
  console.info(tags);

  React.useEffect(() => {
    fetchArticles();
    fetchTags();
  }, []);

  const totalPages = 0;
  const page = 0;

  const query = useQuery();
  const tag = query.get('tag');
  const tab = user ? query.get('tab') ?? FeedType.GLOBAL : FeedType.GLOBAL;

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
        {user && renderNavItem({
          className: classnames('nav-link', { active: tab === FeedType.YOUR }),
          search: '?tab=your_feed',
          title: 'Your Feed',
        })}

        {renderNavItem({
          className: classnames('nav-link', { active: tab === FeedType.GLOBAL }),
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
              {
                loadingArticles
                  ? <div className="article-preview">Loading articles...</div>
                  : <Articles articles={articles} handleMark={handleMarkArticle} />
              }
            </div>

            <div className="col-md-3">
              <Tags tags={tags} loading={loadingTags} />
            </div>
          </div>

          <Pagination total={totalPages} current={page} />
        </div>
      </div>
    </>
  );
});

export default home;
