// src/About.js
import React from 'react';

const About = () => {
  return (
    <div style={{ marginTop: '80px', padding: '20px' }}>
      <h1>About Secure Notes</h1>
      <p>
        Welcome to <strong>Secure Notes</strong>! We are a platform designed with one core principle in mind: 
        <em>Privacy First</em>. Our service is built to help you securely store and manage your personal and professional notes in a digital format, ensuring that only you have access to them.
      </p>

      <h2>Why Choose Secure Notes?</h2>
      <p>
        In today's world, personal data is more valuable than ever, and privacy is a growing concern. With Secure Notes, you can rest assured that your notes are stored with the highest levels of encryption, preventing unauthorized access and ensuring that your sensitive information remains private.
      </p>
      
      <h3>Our Features</h3>
      <ul>
        <li><strong>End-to-End Encryption:</strong> Your notes are encrypted both in transit and at rest using AES-256 encryption, one of the most secure encryption methods available.</li>
        <li><strong>User Authentication:</strong> We offer secure login using unique usernames and passkeys, ensuring that only authorized users can access their notes.</li>
        <li><strong>Cross-Platform:</strong> Access your notes from any device with an internet connection. Whether you're on your phone, tablet, or computer, your notes are just a click away.</li>
        <li><strong>Backup and Restore:</strong> Your notes are securely backed up to prevent data loss, and you can easily restore them if needed.</li>
        <li><strong>Privacy by Design:</strong> We adhere to privacy best practices, ensuring that your data is never shared or used for any purposes other than providing our service.</li>
      </ul>

      <h3>Our Mission</h3>
      <p>
        At Secure Notes, our mission is to empower individuals and businesses by providing a secure, reliable, and user-friendly platform for managing important information. We aim to become the go-to service for individuals who value their privacy and want to keep their personal notes safe from prying eyes.
      </p>

      <h3>Security Matters</h3>
      <p>
        Security is at the heart of everything we do. We continuously update our infrastructure and practices to ensure that we stay ahead of emerging threats. From frequent security audits to compliance with global standards, we are committed to maintaining the highest security standards for our users.
      </p>

      <h3>Join Us</h3>
      <p>
        Start using Secure Notes today and take control of your data! With our user-friendly platform and top-tier security measures, managing your notes has never been easier or more secure.
      </p>

      <p>
        If you have any questions, feel free to <a href="/contact">contact us</a>. We're here to help!
      </p>
    </div>
  );
};

export default About;
