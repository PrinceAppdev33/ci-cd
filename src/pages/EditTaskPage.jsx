import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import taskService from '../services/taskService';
import TaskForm from '../components/TaskForm';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { getErrorMessage } from '../utils/helpers';
import toast from 'react-hot-toast';
import './EditTask.css';

export default function EditTaskPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await taskService.getTask(id);
        setTask(res.data.data.task);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  const handleSubmit = async (data) => {
    setSaving(true);
    try {
      await taskService.updateTask(id, data);
      toast.success('Task updated');
      navigate('/dashboard');
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner fullScreen />;
  if (error) return <div className="edit-task-page"><ErrorMessage message={error} /></div>;

  return (
    <div className="edit-task-page" id="edit-task-page">
      <div className="edit-task-card">
        <h1 className="edit-task-title">Edit Task</h1>
        <TaskForm
          task={task}
          onSubmit={handleSubmit}
          onCancel={() => navigate('/dashboard')}
          loading={saving}
        />
      </div>
    </div>
  );
}
