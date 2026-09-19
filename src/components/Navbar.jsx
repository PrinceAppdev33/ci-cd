import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="navbar" id="main-navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand" id="navbar-brand">
          <span className="navbar-logo">✓</span>
          <span className="navbar-title">TaskManager</span>
        </Link>

        <div className="navbar-actions">
          {isAuthenticated ? (
            <>
              <span className="navbar-user" id="navbar-user">
                {user?.name}
              </span>
              <button
                className="btn btn-ghost"
                onClick={handleLogout}
                id="logout-btn"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="navbar-auth-links">
              <Link to="/login" className="btn btn-ghost" id="login-link">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary" id="register-link">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
