import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../hooks/useTasks';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import Modal from '../components/Modal';
import toast from 'react-hot-toast';
import { getErrorMessage } from '../utils/helpers';
import './Dashboard.css';

export default function DashboardPage() {
  const { user } = useAuth();
  const {
    tasks,
    loading,
    error,
    filters,
    setFilters,
    stats,
    createTask,
    updateTask,
    toggleTask,
    deleteTask,
    refetch,
  } = useTasks();

  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  const handleOpenCreate = () => {
    setEditingTask(null);
    setShowModal(true);
  };

  const handleOpenEdit = (task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTask(null);
  };

  const handleSubmit = async (data) => {
    setFormLoading(true);
    try {
      if (editingTask) {
        await updateTask(editingTask._id, data);
      } else {
        await createTask(data);
      }
      handleCloseModal();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await deleteTask(id);
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  const handleToggle = async (id) => {
    try {
      await toggleTask(id);
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="dashboard" id="dashboard-page">
      {/* Welcome & Stats */}
      <div className="dashboard-header">
        <div className="dashboard-welcome">
          <h1 className="dashboard-title">
            Welcome, <span className="highlight">{user?.name}</span>
          </h1>
          <p className="dashboard-subtitle">Here&apos;s your task overview</p>
        </div>
        <button className="btn btn-primary" onClick={handleOpenCreate} id="add-task-btn">
          + New Task
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid" id="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total Tasks</div>
        </div>
        <div className="stat-card stat-completed">
          <div className="stat-value">{stats.completed}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-card stat-pending">
          <div className="stat-value">{stats.pending}</div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="stat-card stat-high">
          <div className="stat-value">{stats.highPriority}</div>
          <div className="stat-label">High Priority</div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="dashboard-filters" id="filters-bar">
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="form-input search-input"
            placeholder="Search tasks..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            id="search-input"
          />
        </div>

        <div className="filter-group">
          <select
            className="form-input form-select filter-select"
            value={filters.completed}
            onChange={(e) => handleFilterChange('completed', e.target.value)}
            id="filter-completed"
          >
            <option value="">All Status</option>
            <option value="false">Pending</option>
            <option value="true">Completed</option>
          </select>

          <select
            className="form-input form-select filter-select"
            value={filters.priority}
            onChange={(e) => handleFilterChange('priority', e.target.value)}
            id="filter-priority"
          >
            <option value="">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <select
            className="form-input form-select filter-select"
            value={`${filters.sortBy}-${filters.sortOrder}`}
            onChange={(e) => {
              const [sortBy, sortOrder] = e.target.value.split('-');
              setFilters((prev) => ({ ...prev, sortBy, sortOrder }));
            }}
            id="filter-sort"
          >
            <option value="createdAt-desc">Newest First</option>
            <option value="createdAt-asc">Oldest First</option>
            <option value="dueDate-asc">Due Date ↑</option>
            <option value="dueDate-desc">Due Date ↓</option>
          </select>
        </div>
      </div>

      {/* Task List */}
      <TaskList
        tasks={tasks}
        loading={loading}
        error={error}
        onToggle={handleToggle}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
        onRetry={refetch}
        onAddTask={handleOpenCreate}
      />

      {/* Create/Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingTask ? 'Edit Task' : 'New Task'}
      >
        <TaskForm
          task={editingTask}
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
          loading={formLoading}
        />
      </Modal>
    </div>
  );
}
