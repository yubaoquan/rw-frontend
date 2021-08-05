import * as React from 'react';

interface TagsProps {
  tags: string[];
}

const Tags: React.FC<TagsProps> = ({ tags }: TagsProps) => (
  <div>
    {tags.map((tag) => (
      <span>{tag}</span>
    ))}
  </div>
);

export default Tags;
