import React, { Component } from 'react';
import './App.css';
import Dashboard from './pages/dashboard/Dashboard';
import TopNavigation from './components/top-nav/TopNav';
import SideNavigation from './components/side-nav/SideNav';

class App extends Component {
  render() {
    return (
      <div className="flexible-content">
        <TopNavigation />
        <main id="content" className="p-5 full-height">
          <Dashboard/>
        </main>
      </div>
    );
  }
}

export default App;
