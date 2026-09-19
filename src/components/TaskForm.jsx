import { useState, useEffect } from 'react';
import './TaskForm.css';

const initialState = {
  title: '',
  description: '',
  priority: 'medium',
  dueDate: '',
};

export default function TaskForm({ task, onSubmit, onCancel, loading }) {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'medium',
        dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
      });
    } else {
      setForm(initialState);
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...form };
    if (!data.dueDate) delete data.dueDate;
    onSubmit(data);
  };

  const isEdit = !!task;

  return (
    <form className="task-form" onSubmit={handleSubmit} id="task-form">
      <div className="form-group">
        <label htmlFor="title" className="form-label">Title *</label>
        <input
          type="text"
          id="title"
          name="title"
          className="form-input"
          value={form.title}
          onChange={handleChange}
          placeholder="What needs to be done?"
          required
          maxLength={100}
          autoFocus
        />
      </div>

      <div className="form-group">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea
          id="description"
          name="description"
          className="form-input form-textarea"
          value={form.description}
          onChange={handleChange}
          placeholder="Add details..."
          maxLength={500}
          rows={3}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="priority" className="form-label">Priority</label>
          <select
            id="priority"
            name="priority"
            className="form-input form-select"
            value={form.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="dueDate" className="form-label">Due Date</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            className="form-input"
            value={form.dueDate}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-actions">
        {onCancel && (
          <button type="button" className="btn btn-ghost" onClick={onCancel} id="cancel-btn">
            Cancel
          </button>
        )}
        <button type="submit" className="btn btn-primary" disabled={loading || !form.title.trim()} id="submit-btn">
          {loading ? 'Saving...' : isEdit ? 'Update Task' : 'Create Task'}
        </button>
      </div>
    </form>
  );
}
