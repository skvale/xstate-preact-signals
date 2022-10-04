import { h, render } from 'preact';
import { Router } from 'preact-router';

import { Header } from './components/Header';
import { Home } from './routes/Home';
import { TwoStateApp } from './routes/TwoState/TwoStateApp';
import { ApiResponseApp } from './routes/ApiResponse/ApiResponseApp';
import './index.css';

const App = () => (
  <div id="root">
    <Header />
    <Router>
      <Home path="/" />
      <TwoStateApp path="/two-state" />
      <ApiResponseApp path="/api-response" />
    </Router>
  </div>
);

render(<App />, document.getElementById('root')!);
