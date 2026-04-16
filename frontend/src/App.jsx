import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/Login'
import UserPage from './pages/UserPage'
import AdminPage from './pages/AdminPage'
import SignupPage from './pages/Signup'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}
