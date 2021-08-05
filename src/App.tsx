import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Layout from 'layout/layout1';
import Router from './router';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Router />
      </Layout>
    </BrowserRouter>
  );
}
