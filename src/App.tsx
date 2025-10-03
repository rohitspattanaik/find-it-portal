import styles from './App.module.css';
import Navbar from './components/Navbar/Navbar';
import EnvironmentLoader from './components/EnvironmentLoader/EnvironmentLoader';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <div className={styles.appContainer}>
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <EnvironmentLoader />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
