// src/components/Dashboard.js

import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/DashboardStyles.js'; // Import the styles

const Dashboard = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Manage Your Secure Space</h1>
      <p style={styles.subHeading}>Manage your Links, Notes, and Passwords all in one place.</p>
      <div style={styles.cardContainer}>
        <Link to="/links" style={styles.card}>
          <div style={styles.cardContent}>
            <h2 style={styles.cardTitle}>Links</h2>
            <p style={styles.cardDescription}>Store and manage your important links.</p>
          </div>
        </Link>
        <Link to="/notes" style={styles.card}>
          <div style={styles.cardContent}>
            <h2 style={styles.cardTitle}>Notes</h2>
            <p style={styles.cardDescription}>Keep track of your personal and professional notes.</p>
          </div>
        </Link>
        <Link to="/passwords" style={styles.card}>
          <div style={styles.cardContent}>
            <h2 style={styles.cardTitle}>Passwords</h2>
            <p style={styles.cardDescription}>Securely store and retrieve your passwords.</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
