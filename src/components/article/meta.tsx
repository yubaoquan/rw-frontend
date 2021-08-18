import classnames from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Article, User } from 'types';

interface ArticleMetaProps {
  article: Article;
  user: User;
}

const articleMeta: FC<ArticleMetaProps> = ({ article, user }) => {
  console.info(123);
  const handleCancelDelete = () => console.info('cancel delete');
  const handleConfirmDelete = () => console.info('confirm delete');
  const handleDeleteArticleClick = () => console.info(' handleDeleteArticleClick');
  const handleFollowClick = () => console.info(' handleFollowClick');
  const currentIsAuthor = user && user.username === article.author.username;
  const deleting = false;
  const needDeleteConfirm = false;
  const markingFollowStatus = false;

  const whenCurrentIsAuthor = (
    <>
      {deleting && (
      <Link
        className="btn btn-outline-secondary btn-sm"
        to={`/editor/${article.slug}`}
      >
        <i className="ion-edit" /> Edit Article
      </Link>
      )}

      {
        needDeleteConfirm
          ? (
            <span>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={handleCancelDelete}
                type="button"
              >
                cancel
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-danger"
                onClick={handleConfirmDelete}
              >
                confirm
              </button>
            </span>
          )
          : (
            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              disabled={deleting}
              onClick={handleDeleteArticleClick}
            >
              <i className="ion-trash-a" /> Delete Article
            </button>
          )
      }
    </>
  );

  const whenCurrentIsNotAuthor = (
    <>
      <button
        type="button"
        className={
          classnames(
            'btn btn-sm btn-outline-secondary',
            { active: article.author.following },
          )
        }
        disabled={markingFollowStatus}
        onClick={handleFollowClick}
      >
        <i className="ion-plus-round" />
        &nbsp; Follow {article.author.username} <span className="counter">(10)</span>
      </button>

      &nbsp;&nbsp;

      <button
        type="button"
        className={classnames(
          'btn btn-sm btn-outline-primary',
          { active: article.favorited },
        )}
      >
        <i className="ion-heart" />
        &nbsp; Favorite Post <span className="counter">(29)</span>
      </button>
    </>
  );

  return (
    <div className="article-meta">
      <Link to={`/profile/${article.author.username}`}>
        <img src={article.author.image} alt="author" />
      </Link>

      <div className="info">
        <Link to={`/profile/${article.author.username}`} className="author">
          {article.author.username}
        </Link>
        <span className="date">{article.createdAt}</span>
      </div>

      {currentIsAuthor ? whenCurrentIsAuthor : whenCurrentIsNotAuthor}
    </div>
  );
};

export default articleMeta;
