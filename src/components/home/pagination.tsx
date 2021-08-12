import * as React from 'react';

interface PatinationProps {
  total: number;
  current: number;
}
const Pagination: React.FC<PatinationProps> = ({ total, current }: PatinationProps) => {
  return (
    <div>{total} / {current}</div>
  );
};

export default Pagination;
