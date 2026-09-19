import { formatDate, isOverdue, priorityColors, priorityLabels } from '../utils/helpers';
import './TaskCard.css';

export default function TaskCard({ task, onToggle, onEdit, onDelete }) {
  const overdue = !task.completed && isOverdue(task.dueDate);

  return (
    <div className={`task-card ${task.completed ? 'task-completed' : ''} ${overdue ? 'task-overdue' : ''}`} id={`task-card-${task._id}`}>
      <div className="task-card-header">
        <button
          className={`task-toggle ${task.completed ? 'toggled' : ''}`}
          onClick={() => onToggle(task._id)}
          title={task.completed ? 'Mark incomplete' : 'Mark complete'}
          id={`toggle-${task._id}`}
        >
          {task.completed ? '✓' : ''}
        </button>

        <div className="task-card-content">
          <h3 className="task-title">{task.title}</h3>
          {task.description && (
            <p className="task-description">{task.description}</p>
          )}
        </div>
      </div>

      <div className="task-card-meta">
        <span
          className="task-priority"
          style={{ '--priority-color': priorityColors[task.priority] }}
        >
          {priorityLabels[task.priority]}
        </span>

        {task.dueDate && (
          <span className={`task-due ${overdue ? 'overdue' : ''}`}>
            {overdue ? '⚠ ' : '📅 '}
            {formatDate(task.dueDate)}
          </span>
        )}

        <span className="task-created">
          Created {formatDate(task.createdAt)}
        </span>
      </div>

      <div className="task-card-actions">
        <button
          className="btn btn-sm btn-ghost"
          onClick={() => onEdit(task)}
          id={`edit-${task._id}`}
        >
          Edit
        </button>
        <button
          className="btn btn-sm btn-danger"
          onClick={() => onDelete(task._id)}
          id={`delete-${task._id}`}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
