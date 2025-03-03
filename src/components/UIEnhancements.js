import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

const UIEnhancements = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="container mt-5">
      <Navbar bg={theme} variant={theme} expand="lg">
        <Container>
          <Navbar.Brand href="/">Vendor Panel</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="/vendor-dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/vendor-menu">Menu</Nav.Link>
            <Nav.Link href="/vendor-orders">Orders</Nav.Link>
            <Nav.Link href="/vendor-reports">Reports</Nav.Link>
            <Nav.Link href="/vendor-settings">Settings</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      
      <div className="d-flex justify-content-center mt-4">
        <Button variant={theme === 'light' ? 'dark' : 'light'} onClick={toggleTheme}>
          Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
        </Button>
      </div>
    </div>
  );
};

export default UIEnhancements;
