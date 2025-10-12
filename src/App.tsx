import styles from './App.module.css';
import '@mantine/core/styles.css'
import EnvironmentLoader from './components/EnvironmentLoader/EnvironmentLoader';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AppShell, MantineProvider } from '@mantine/core';
import Header from './Pages/App/Header/Header';
import Navbar from './Pages/App/Navbar/Navbar';
import Main from './Pages/App/Main/Main';

function App() {
  return (
    <div className={styles.appContainer}>
      <MantineProvider>
        <BrowserRouter>
          <AuthProvider>
              <AppShell
                padding="md"
                header={{ height: 50}}
                navbar={{ width: 200, breakpoint: 'sm' }}>
                <Header />
                <Navbar />
                <Main>
                    <EnvironmentLoader />
                </Main>
              </AppShell>
          </AuthProvider>
        </BrowserRouter>
      </MantineProvider>
    </div>
  );
}

export default App;
