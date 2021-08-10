import { Switch, Route } from 'react-router-dom';
import ArticleStore from 'store/article';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';

const articleStore = new ArticleStore();

export default function MyRouter() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/">

        <Home store={articleStore} />
      </Route>
    </Switch>
  );
}
