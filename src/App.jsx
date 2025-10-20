import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';
import StationFormPage from './pages/StationFormPage';
import './App.css'; // Import the new App.css styles

function App() {
  const [route, setRoute] = useState({ page: 'dashboard', stationId: null });

  const navigateTo = (page, stationId = null) => {
    setRoute({ page, stationId });
  };

  const renderPage = () => {
    switch (route.page) {
      case 'dashboard':
        return <Dashboard navigateTo={navigateTo} />;
      case 'form':
        return <StationFormPage navigateTo={navigateTo} stationId={route.stationId} />;
      default:
        return <Dashboard navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="app-container">
      {renderPage()}
    </div>
  );
}

export default App;