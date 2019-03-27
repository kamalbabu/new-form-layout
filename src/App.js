import React, { Component } from 'react';
import './App.css';
import Dashboard from './pages/dashboard/Dashboard';
import Form from './pages/form/Form';
import TopNavigation from './components/top-nav/TopNav';
import SideNavigation from './components/side-nav/SideNav';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";


class App extends Component {
  render() {
    return (
      <div className="flexible-content">
        <TopNavigation />
        <main id="content">
          <Router>
            <Route exact path="/" component={Dashboard} />
            <Route path="/form" component={Form} />
          </Router>
          {/* <Form/> */}
          {/* <Dashboard /> */}
        </main>
      </div>
    );
  }
}

export default App;
