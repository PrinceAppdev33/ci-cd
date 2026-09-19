import './EmptyState.css';

export default function EmptyState({ title, message, icon = '📋', action }) {
  return (
    <div className="empty-state" id="empty-state">
      <div className="empty-icon">{icon}</div>
      <h3 className="empty-title">{title || 'No items found'}</h3>
      <p className="empty-message">{message || 'Get started by creating something new.'}</p>
      {action && (
        <button className="btn btn-primary" onClick={action.onClick} id="empty-action-btn">
          {action.label}
        </button>
      )}
    </div>
  );
}
