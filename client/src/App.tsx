import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/Landing';
import Test from './pages/Test';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import StartTestPage from './pages/StartTestPage';
import Analysis from './pages/AnalysisPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/test" element={<Test />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Start" element={<StartTestPage />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/analysis/:testId" element={<Analysis />} />
      </Routes>
    </Router>
  );
}

export default App;