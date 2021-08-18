import classnames from 'classnames';
import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
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

const home: FC<HomePageProps> = observer((stores) => {
  const {
    fetchArticles,
    fetchTags,
    articles,
    articlesCount,
    tags,
    loadingArticles,
    loadingTags,
  } = stores.articleStore;
  const { user } = stores.userStore;

  const articlesPerPage = 3;

  const query = useQuery();
  const history = useHistory();
  const tag = query.get('tag') || undefined;
  const page = +(query.get('page') || 1);
  const tab = user ? query.get('tab') ?? FeedType.GLOBAL : FeedType.GLOBAL;

  useEffect(() => {
    fetchTags();
  }, []);

  useEffect(() => {
    fetchArticles({ limit: articlesPerPage, offset: (page - 1) * articlesPerPage, tag });
  }, [page, tag]);

  const handleMarkArticle = () => {
    if (user) {
      console.info('mark like');
    } else {
      history.push('/register');
    }
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
          className: classnames('nav-link', { active: tab === FeedType.YOUR && !tag }),
          search: '?tab=your_feed',
          title: 'Your Feed',
        })}

        {renderNavItem({
          className: classnames('nav-link', { active: tab === FeedType.GLOBAL && !tag }),
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

  const totalPages = Math.ceil(articlesCount / articlesPerPage);

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
