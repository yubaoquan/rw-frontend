import classnames from 'classnames';
import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface PatinationProps {
  total: number;
  current: number;
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const pagination: React.FC<PatinationProps> = ({ total, current }: PatinationProps) => {
  const items = Array(total).fill(0).map((t, i) => i + 1);

  return (
    <nav>
      <ul className="pagination">
        {
          items.map((item) => {
            const query = useQuery();
            query.set('page', `${item}`);

            return (
              <li key={item} className={classnames('page-item', { active: item === current })}>
                <Link
                  to={{ pathname: '/', search: query.toString() }}
                  className="page-link ng-binding"
                >
                  {item}
                </Link>
              </li>
            );
          })
        }
      </ul>
    </nav>
  );
};

export default pagination;
