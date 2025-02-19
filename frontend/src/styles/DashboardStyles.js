// src/components/DashboardStyles.js
const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '180px', // Matches or exceeds navbar height
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      padding: '120px',
      boxSizing: 'border-box',
    },
    heading: {
      fontSize: '2.5rem',
      color: '#333',
      marginBottom: '10px',
      textAlign: 'center',
    },
    subHeading: {
      fontSize: '1.2rem',
      color: '#555',
      marginBottom: '30px',
      textAlign: 'center',
    },
    cardContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '30px',
      flexWrap: 'wrap',
    },
    card: {
      textDecoration: 'none',
      backgroundColor: '#ffffff',
      border: '1px solid #ddd',
      borderRadius: '10px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      width: '250px',
      height: '150px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    cardContent: {
      textAlign: 'center',
      color: '#333',
    },
    cardTitle: {
      fontSize: '1.5rem',
      marginBottom: '10px',
      color: '#007BFF',
    },
    cardDescription: {
      fontSize: '1rem',
      color: '#555',
    },
  };
  
  export default styles;
  