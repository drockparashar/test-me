import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/Landing';
import Test from './pages/Test';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import StartTestPage from './pages/StartTestPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/test" element={<Test />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Start" element={<StartTestPage />} />

      </Routes>
    </Router>
  );
}

export default App;