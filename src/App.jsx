import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Customer from './pages/Customer';
import Provider from './pages/Provider';
import Plumbing from './pages/Plumbing';
import Cleaning from './pages/Cleaning';
import Moving from './pages/Moving';
import Electrician from './pages/Electrician';
import Assembly from './pages/Assembly';
import Terms from './pages/Terms';
import './App.css';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/provider" element={<Provider />} />
        <Route path="/plumbing" element={<Plumbing />} />
        <Route path="/cleaning" element={<Cleaning />} />
        <Route path="/moving" element={<Moving />} />
        <Route path="/electrician" element={<Electrician />} />
        <Route path="/assembly" element={<Assembly />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
