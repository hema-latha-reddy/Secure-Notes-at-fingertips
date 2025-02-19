import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../App.js';
const Navbar1 = () => {
    const {isLogin,setIsLogin}=useContext(UserContext);

    const navigate=useNavigate();
    const logout=()=>{
        setIsLogin(false);
        navigate('/');
        

    }
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'green', padding: '20px', position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000 }}>
    
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>
        
      <Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>About</Link>&ensp;
      <Link to="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</Link>&ensp;
      <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>
      </div>

     
      <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '200px' ,position: 'relative', left: '-30px' }}>
      <Link to="/changepass" style={{ color: 'white', textDecoration: 'none' ,fontWeight:"bold"}}>Change Password</Link>&ensp;&ensp;
        <button type="button" style={{border:'0px'}} onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar1;