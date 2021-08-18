import { FC } from 'react';
import { Article, User } from 'types';
import Comments from './comments';
import ArticleMeta from './meta';

interface ArticleProps {
  article: Article;
  user: User;
}

const articleComponent: FC<ArticleProps> = ({ article, user }) => {
  const handleCommentDelete = () => console.info('handleCommentDelete');
  const fetchComments = () => console.info('fetchComments');
  const comments: any[] = [];

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>
          <ArticleMeta article={article} user={user} />
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12" v-html="article.html" />
        </div>

        <hr />

        <div className="article-actions">
          <ArticleMeta article={article} user={user} />
        </div>

        <div className="row">
          <Comments
            comments={comments}
            user={user}
            slug={article.slug}
            onDelete={handleCommentDelete}
            onUpdate={fetchComments}
          />
        </div>
      </div>
    </div>
  );
};

export default articleComponent;
