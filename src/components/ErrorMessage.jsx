import './ErrorMessage.css';

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-message" id="error-message">
      <div className="error-icon">⚠️</div>
      <p className="error-text">{message || 'Something went wrong'}</p>
      {onRetry && (
        <button className="btn btn-primary" onClick={onRetry} id="retry-btn">
          Try Again
        </button>
      )}
    </div>
  );
}
