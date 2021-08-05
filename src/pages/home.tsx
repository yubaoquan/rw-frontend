import classnames from 'classnames';
import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Articles from 'components/home/articles';
import Pagination from 'components/home/pagination';
import Tags from 'components/home/tags';
import { Article } from 'types';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const home: React.FC = () => {
  console.info(123);
  const articles: Article[] = [
    {
      slug: '123',
      title: '第一篇文章',
      description: '456',
      createdAt: 123,
      favorited: true,
      favoritesCount: 1,
      marking: true,
      tagList: ['aaa', 'bbb'],
      author: { username: 'xiaoming' },
    },
    {
      slug: '124',
      title: '第2篇文章',
      description: '456',
      createdAt: 123,
      favorited: false,
      favoritesCount: 1,
      marking: false,
      tagList: ['aaa', 'ccc'],
      author: { username: 'xiaoming5' },
    },
  ];
  const tags: any = [];
  const totalPages = 0;
  const page = 0;

  const query = useQuery();
  const tag = query.get('tag');
  const tab = query.get('tab');

  const handleMarkArticle = () => {
    console.info('123');
  };

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
              <div className="feed-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item" v-if="user">
                    <Link
                      className={classnames('nav-link', { active: tab === 'your_feed' })}
                      to={{
                        pathname: '/',
                        search: '?tab=your_feed',
                      }}
                    >Your Feed
                    </Link
                >
                  </li>
                  <li className="nav-item">
                    <Link
                      className={classnames('nav-link', { active: tab === 'global_feed' })}
                      to={{
                        pathname: '/',
                        search: '?tab=global_feed',
                      }}
                    >Global Feed
                    </Link
                >
                  </li>
                  {tag && (
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      to={{
                        pathname: '/',
                        search: `?tag=${tag}`,
                      }}
                    >#{tag}
                    </Link
                >
                  </li>
                  )}
                </ul>
              </div>

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
};

export default home;
