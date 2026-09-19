import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFoundPage() {
  return (
    <div className="not-found" id="not-found-page">
      <div className="not-found-content">
        <h1 className="not-found-code">404</h1>
        <h2 className="not-found-title">Page Not Found</h2>
        <p className="not-found-message">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link to="/dashboard" className="btn btn-primary" id="go-home-btn">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
