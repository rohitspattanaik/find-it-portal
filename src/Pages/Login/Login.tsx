import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { authenticate } from '../../api/Authentication/Authentication';
import Button from '../../components/Button/Button';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated, setIsAdmin } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const session = await authenticate({ email });
        setIsAuthenticated(true);
        setIsAdmin(session.isAdmin);
  
        // navigate to home
        navigate('/');
    } catch (error: any) {
      console.error(error);
        setError("Authentication failed");
    }
    
  };

  useEffect(() => {
    if (isAuthenticated) {
        navigate('/');
    }
  }, [navigate, isAuthenticated]);

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Welcome Back</h1>
        
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            id="email"
            type="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <Button text="Sign In" onClick={handleSubmit} type="submit" />

        {error && <div className={styles.error}>{error}</div>}
      </form>
    </div>
  );
};

export default Login;