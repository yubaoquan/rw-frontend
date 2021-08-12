import { Switch, Route } from 'react-router-dom';
import ArticleStore from 'store/article';
import UserStore from 'store/user';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';

interface MyRouterProps {
  userStore: UserStore;
  articleStore: ArticleStore;
}

export default function MyRouter({ userStore, articleStore }: MyRouterProps) {
  return (
    <Switch>
      <Route path="/login">
        <Login userStore={userStore} />
      </Route>
      <Route path="/register">
        <Register userStore={userStore} />
      </Route>
      <Route path="/">
        <Home articleStore={articleStore} userStore={userStore} />
      </Route>
    </Switch>
  );
}
