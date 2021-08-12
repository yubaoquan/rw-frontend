import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Layout from 'layout/layout1';
import ArticleStore from 'store/article';
import Router from './router';
import UserStore from './store/user';

const userStore = new UserStore();
const articleStore = new ArticleStore();

export default function App() {
  return (
    <BrowserRouter>
      <Layout userStore={userStore}>
        <Router userStore={userStore} articleStore={articleStore} />
      </Layout>
    </BrowserRouter>
  );
}
