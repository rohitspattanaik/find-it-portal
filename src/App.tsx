import styles from './App.module.css';
import '@mantine/core/styles.css'
import Navbar from './components/Navbar/Navbar';
import EnvironmentLoader from './components/EnvironmentLoader/EnvironmentLoader';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { MantineProvider } from '@mantine/core';

function App() {
  return (
    <div className={styles.appContainer}>
      <MantineProvider>
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <EnvironmentLoader />
        </AuthProvider>
      </BrowserRouter>
      </MantineProvider>
    </div>
  );
}

export default App;
