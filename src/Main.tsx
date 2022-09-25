import { h, render } from "preact";
import { Router } from "preact-router";

import { Header } from "./components/Header";
import { Home } from "./routes/Home";
import { TwoStateApp } from "./routes/TwoState/TwoStateApp";
import "./index.css";

export const App = () => (
  <div id="root">
    <Header />
    <Router>
      <Home path="/" />
      <TwoStateApp path="/two-state" />
    </Router>
  </div>
);

render(<App />, document.getElementById("root")!);
