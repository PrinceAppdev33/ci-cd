import TaskCard from './TaskCard';
import EmptyState from './EmptyState';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import './TaskList.css';

export default function TaskList({ tasks, loading, error, onToggle, onEdit, onDelete, onRetry, onAddTask }) {
  if (loading) {
    return (
      <div className="task-list-loading">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={onRetry} />;
  }

  if (tasks.length === 0) {
    return (
      <EmptyState
        title="No tasks found"
        message="Create your first task to get started, or adjust your filters."
        icon="✨"
        action={{ label: '+ New Task', onClick: onAddTask }}
      />
    );
  }

  return (
    <div className="task-list" id="task-list">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
