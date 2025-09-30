import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for doesn't exist or has been moved.</p>
      <Link to="/" style={{ color: '#007bff', textDecoration: 'none' }}>
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;
