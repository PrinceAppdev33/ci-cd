import './LoadingSpinner.css';

export default function LoadingSpinner({ fullScreen = false, size = 'medium' }) {
  if (fullScreen) {
    return (
      <div className="spinner-fullscreen" id="loading-spinner">
        <div className={`spinner spinner-${size}`}></div>
      </div>
    );
  }

  return <div className={`spinner spinner-${size}`} id="loading-spinner"></div>;
}
