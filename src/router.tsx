import { Switch, Route } from 'react-router-dom';
import ArticleStore from 'store/article';
import Bar from './pages/bar';
import Foo from './pages/foo';
import Home from './pages/home';

const articleStore = new ArticleStore();

export default function MyRouter() {
  return (
    <Switch>
      <Route path="/foo" component={Foo} />
      <Route path="/bar" component={Bar} />
      <Route path="/">

        <Home store={articleStore} />
      </Route>
    </Switch>
  );
}
