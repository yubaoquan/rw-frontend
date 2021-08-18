import { FC } from 'react';
import { Link } from 'react-router-dom';
import { User, Comment } from 'types';

interface ComponentsProps {
  user: User;
  comments: Comment[];
  slug: string;
  onDelete: () => void;
  onUpdate: () => void;
}

const commentsComponent: FC<ComponentsProps> = ({ user, comments, onDelete, onUpdate }) => {
  console.info(123);
  const handleSubmit = () => console.info('handleSubmit');
  const handleUpdateSubmit = () => onUpdate();
  const handleCancelUpdateClick = () => console.info('handleCancelUpdateClick');
  const handleDeleteConfirm = () => onDelete();
  const handleDeleteCancel = () => console.info('handleDeleteCancel');
  const handleEditClick = (comment: any) => console.info('handleEditClick', comment);
  const handleDeleteClick = (comment: any) => console.info('handleDeleteClick', comment);
  const handleCurrentCommentChange = () => console.info('handleCurrentCommentChange');
  const updating = false;
  const submitting = false;

  // const myComment = '';
  // const currentCommentContent = '';
  const needDeleteConfirm = false;
  const handleCommentChange = () => console.info('handleCommentChange');
  const currentComment = null;
  const isEdit = false;

  return (
    <div className="col-xs-12 col-md-8 offset-md-2">
      {user && (
      <form className="card comment-form" onSubmit={handleSubmit}>
        <div className="card-block">
          <textarea
            className="form-control"
            placeholder="Write a comment..."
            rows={3}
            onChange={handleCommentChange}
            required
          />
        </div>
        <div className="card-footer">
          <img src={user.image} className="comment-author-img" alt="author" />
          <button
            type="button"
            className="btn btn-sm btn-primary"
            disabled={submitting}
          >
            Post Comment
          </button>
        </div>
      </form>
      )}

      {
        comments.map((comment) => {
          const isEditingComment = currentComment === comment && isEdit;
          return (
            <>
              {isEditingComment ? (
                <form
                  className="card comment-form"
                  key="comment.id"
                  onSubmit={handleUpdateSubmit}
                >
                  <div className="card-block">
                    <textarea
                      className="form-control"
                      placeholder="Write a comment..."
                      rows={3}
                      onChange={handleCurrentCommentChange}
                      required
                    />
                  </div>
                  <div className="card-footer">
                    <img src={user.image} className="comment-author-img" alt="user" />
                    <button
                      type="button"
                      onClick={handleCancelUpdateClick}
                      disabled={updating}
                    >
                      cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-primary"
                      disabled={updating}
                    >
                      Update Comment
                    </button>
                  </div>
                </form>
              )
                : (
                  <div className="card" key={comment.id}>
                    <div className="card-block">
                      <p className="card-text" v-html="comment.html" />
                    </div>
                    <div className="card-footer">
                      <Link to={`/profile/${comment.author.username}`} className="comment-author">
                        <img src={comment.author.image} className="comment-author-img" alt="author" />
                      </Link>
                      &nbsp;
                      <Link to={`/profile/${comment.author.username}`} className="comment-author">
                        {comment.author.username}
                      </Link>
                      <span className="date-posted">{comment.createdAt}</span>
                      {
                        (comment.author.username === user?.username)
                      && (
                      <span className="mod-options">
                        <i className="ion-edit" role="button" onClick={() => handleEditClick(comment)} />
                        <i className="ion-trash-a" role="button" onClick={() => handleDeleteClick(comment)} />
                        {
                          needDeleteConfirm
                          && (
                          <span>
                            <button type="button" onClick={handleDeleteConfirm}>confirm delete</button>
                            <button type="button" onClick={handleDeleteCancel}>cancel</button>
                          </span>
                          )
                        }
                      </span>
                      )
                      }
                    </div>
                  </div>
                )}
            </>
          );
        })
      }
    </div>
  );
};

export default commentsComponent;
