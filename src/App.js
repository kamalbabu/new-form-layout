import React, { Component } from 'react';
import './App.css';
import Dashboard from './pages/dashboard/Dashboard';
import TopNavigation from './components/top-nav/TopNav';

class App extends Component {
  render() {
    return (
      <div className="flexible-content">
        <TopNavigation />
        <main id="content" className="full-height">
          {/* <Form/> */}
          <Dashboard/>
        </main>
      </div>
    );
  }
}

export default App;
