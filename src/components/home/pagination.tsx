import * as React from 'react';

interface PatinationProps {
  total: number;
  current: number;
}
const Pagination: React.FC<PatinationProps> = ({ total, current }: PatinationProps) => {
  console.info('1');
  return (
    <div>{total} / {current}</div>
  );
};

export default Pagination;
