import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Login from './views/login';
import Home from './views/home';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/home">Home</Link></li>
          </ul>
        </nav>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/home" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
