import classnames from 'classnames';
import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User } from 'types';

interface HeaderProps {
  user?: User;
}

const Header: FC<HeaderProps> = ({ user }: HeaderProps) => {
  console.info('user in header:', user);
  const { pathname } = useLocation();

  const getNavClassName = (itemPath: string) => {
    return classnames('nav-link', { active: pathname === itemPath });
  };

  const partialWithUser = (
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
          <img className="user-pic" src={user?.image} alt="user-pic" />
          {user?.username}
        </Link>
      </li>
    </>
  );

  const partialWithoutUser = (
    <>
      <li className="nav-item">
        <Link className={getNavClassName('/login')} to="/login">Sign in</Link>
      </li>
      <li className="nav-item">
        <Link className={getNavClassName('/register')} to="/register">Sign up</Link>
      </li>
    </>
  );

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">conduit</Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <Link className={getNavClassName('/')} to="/home">Home</Link>
          </li>
          {user ? partialWithUser : partialWithoutUser}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
