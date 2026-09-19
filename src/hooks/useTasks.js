import { useState, useEffect, useCallback } from 'react';
import taskService from '../services/taskService';
import toast from 'react-hot-toast';

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    completed: '',
    priority: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const params = {};
      if (filters.search) params.search = filters.search;
      if (filters.completed) params.completed = filters.completed;
      if (filters.priority) params.priority = filters.priority;
      if (filters.sortBy) params.sortBy = filters.sortBy;
      if (filters.sortOrder) params.sortOrder = filters.sortOrder;

      const res = await taskService.getTasks(params);
      setTasks(res.data.data.tasks);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const createTask = async (taskData) => {
    const res = await taskService.createTask(taskData);
    setTasks((prev) => [res.data.data.task, ...prev]);
    toast.success('Task created');
    return res.data.data.task;
  };

  const updateTask = async (id, taskData) => {
    const res = await taskService.updateTask(id, taskData);
    setTasks((prev) => prev.map((t) => (t._id === id ? res.data.data.task : t)));
    toast.success('Task updated');
    return res.data.data.task;
  };

  const toggleTask = async (id) => {
    const res = await taskService.toggleTask(id);
    setTasks((prev) => prev.map((t) => (t._id === id ? res.data.data.task : t)));
    const task = res.data.data.task;
    toast.success(task.completed ? 'Task completed!' : 'Task reopened');
    return task;
  };

  const deleteTask = async (id) => {
    await taskService.deleteTask(id);
    setTasks((prev) => prev.filter((t) => t._id !== id));
    toast.success('Task deleted');
  };

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    pending: tasks.filter((t) => !t.completed).length,
    highPriority: tasks.filter((t) => t.priority === 'high' && !t.completed).length,
  };

  return {
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
    refetch: fetchTasks,
  };
}
