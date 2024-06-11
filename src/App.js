import React from 'react';
import LayoutComponent from './components/LayoutComponent';
import NavbarComponent from './components/NavbarComponent';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const App = () => {
  const appStyle = {
    backgroundColor: '#023E8A',
    minHeight: '100vh',
    margin: '0',
    padding: '0',
  };

  return (
    <div style={appStyle}>
      <NavbarComponent />
      <LayoutComponent />
    </div>
  );
};

export default App;
