import './App.css';
import Navbar from './components/Navbar/Navbar';
import EnvironmentLoader from './components/EnvironmentLoader/EnvironmentLoader';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (

    <div>
      <BrowserRouter>
        <Navbar />

        <EnvironmentLoader />
      </BrowserRouter>
    </div>
  );
}

export default App
