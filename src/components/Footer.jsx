import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import { userData } from '../data';

const Footer = () => {
  return (
    <footer style={{
      borderTop: '1px solid var(--glass-border)',
      padding: '2rem 0',
      textAlign: 'center',
      marginTop: 'auto'
    }}>
      <div className="container">
        <h3 style={{ marginBottom: '1rem' }}>{userData.name}</h3>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '1rem' }}>
          <a href={userData.linkedin !== 'LinkedIn' ? userData.linkedin : '#'} target="_blank" rel="noreferrer" style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}>
            <FaLinkedin />
          </a>
          <a href="#" target="_blank" rel="noreferrer" style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}>
            <FaGithub />
          </a>
          <a href={`mailto:${userData.email}`} style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}>
            <FaEnvelope />
          </a>
        </div>
        <p style={{ fontSize: '0.9rem' }}>© {new Date().getFullYear()} {userData.name}. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
