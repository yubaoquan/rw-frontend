import './App.css';
import { BrowserRouter, Link } from 'react-router-dom';
import Router from './router';

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/foo">foo</Link>
          </li>
          <li>
            <Link to="/bar">bar</Link>
          </li>
        </ul>
      </nav>
      <Router />
    </BrowserRouter>
  );
}
