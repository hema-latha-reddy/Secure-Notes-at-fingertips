/* src/CustomNavbar.js
import React from 'react';
//import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div style={{display: 'flex', flexDirection: 'row',justifyContent: 'space-between',background: 'green',padding:'20px'}}>
        <div style={{display:'flex',gap:'10px',cursor:'pointer'}}>
            <Link to="/">About</Link>
            <Link to="/">Contact</Link>
        </div>
      </div>
  );
};

export default Navbar;
// src/CustomNavbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: 'green',
      padding: '20px',
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      zIndex: '1000'
    }}>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link to="/" style={linkStyle}>Home</Link>
        
      </div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link to="/about" style={linkStyle}>About</Link>
        <Link to="/contact" style={linkStyle}>Contact</Link>
      </div>
    </div>
  );
};

// Inline styling for links to keep it consistent
const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '1rem',
  fontWeight: 'bold'
};

export default Navbar;*/
// src/CustomNavbar.js
// src/CustomNavbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'green', padding: '20px', position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000 }}>
      {/* Logo or Branding */}
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>
        
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>SecureNotes</Link>
      </div>

      {/* Navigation Links */}
      <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '200px' }}>
        <Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>About</Link>
        <Link to="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</Link>
      </div>
    </div>
  );
};

export default Navbar;


