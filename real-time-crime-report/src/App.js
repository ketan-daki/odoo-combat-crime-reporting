// import logo from './logo.svg';
import './App.css';
import MapComponent from './components/MapComponent';

import Dashboard from './components/Dashboard';
import Users from './components/Users';
import Settings from './components/Settings';
import Login from './components/Login';
import Signup from './components/Signup';
import Report from './components/Report';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <GoogleOAuthProvider clientId="191782626824-gugkihcb5i9ojs6m90tfdjsf313u2kdh.apps.googleusercontent.com">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          {/* <Route path="/settings" element={<Settings />} /> */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/report" element={<Report />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
