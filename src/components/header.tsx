import classnames from 'classnames';
import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const user: any = null;
  const { pathname } = useLocation();

  // eslint-disable-next-line arrow-body-style
  const getNavClassName = (itemPath: string) => {
    return classnames('nav-link', { active: pathname === itemPath });
  };

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">conduit</Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <Link className={getNavClassName('/')} to="/home">Home</Link>
          </li>
          {
          user ? (
            <>
              <li className="nav-item">
                <Link className={getNavClassName('/editor')} to="/editor">
                  <i className="ion-compose" />&nbsp;New Post
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/settings">
                  <i className="ion-gear-a" />&nbsp;Settings
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile/ybq">
                  <img className="user-pic" src={user.image} alt="user-pic" />
                  {user.username}
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Sign in</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Sign up</Link>
              </li>
            </>
          )
        }
        </ul>
      </div>
    </nav>
  );
};

export default Header;
