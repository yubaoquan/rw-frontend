import classnames from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Article } from 'types';

interface ArticlesProps {
  articles: Article[];
  handleMark: () => void;
}

const Articles: React.FC<ArticlesProps> = ({ articles, handleMark }: ArticlesProps) => {
  console.info(handleMark);
  const handleMarkArticle = () => console.info('123');
  return (
    <div>
      {
        articles.map((article) => (
          <div className="article-preview">
            <div className="article-meta">
              <Link to={`/profile/${article.author.username}`}>
                <img src="article.author.image" alt="author-img" />
              </Link>
              <div className="info">
                <Link to={`/profile/${article.author.username}`} className="author">
                  {article.author.username}
                </Link>
                <span className="date">{article.createdAt}</span>
              </div>
              <button
                type="button"
                className={classnames('btn btn-outline-primary btn-sm pull-xs-right', { active: article.favorited })}
                disabled={article.marking}
                onClick={handleMarkArticle}
              >
                <i className="ion-heart" /> {article.favoritesCount}
              </button>
            </div>
            <Link to={`/article/${article.slug}`} className="preview-link">
              <h1>{article.title}</h1>
              <p>{article.description}</p>
              <span>Read more...</span>
              <ul className="tag-list">
                {article.tagList.map((tag) => (
                  <li className="tag-default tag-pill tag-outline">{tag}</li>
                ))}
              </ul>
            </Link>
          </div>
        ))
      }
    </div>
  );
};

export default Articles;