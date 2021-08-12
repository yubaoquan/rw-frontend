import { FC } from 'react';
import { Link } from 'react-router-dom';

interface TagsProps {
  tags: string[];
  loading: boolean;
}

const Tags: FC<TagsProps> = ({ tags, loading }: TagsProps) => (
  <div className="sidebar">
    <p>Popular Tags</p>
    {loading
      ? <div>Loading tags...</div>
      : (
        <div className="tag-list">
          {
            tags.map((tagItem) => {
              return (
                <Link
                  to={{
                    pathname: '/',
                    search: `?tab=tag&tag=${tagItem}`,
                  }}
                  className="tag-pill tag-default"
                  key={tagItem}
                >
                  {tagItem}
                </Link>
              );
            })
          }
        </div>
      )}
  </div>
);

export default Tags;
