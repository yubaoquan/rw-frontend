import { Switch, Route } from 'react-router-dom';
import Bar from './pages/bar';
import Foo from './pages/foo';
import Home from './pages/home';

export default function MyRouter() {
  return (
    <Switch>
      <Route path="/foo" component={Foo} />
      <Route path="/bar" component={Bar} />
      <Route path="/" component={Home} />
    </Switch>
  );
}
