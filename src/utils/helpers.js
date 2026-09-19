/**
 * Format a date string for display.
 */
export function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Check if a date is overdue (past due and not completed).
 */
export function isOverdue(dueDate) {
  if (!dueDate) return false;
  return new Date(dueDate) < new Date();
}

/**
 * Get human-readable error message from API error.
 */
export function getErrorMessage(error) {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.message === 'Network Error') {
    return 'Unable to connect to server. Please check your connection.';
  }
  return 'Something went wrong. Please try again.';
}

/**
 * Priority color mapping.
 */
export const priorityColors = {
  high: '#ef4444',
  medium: '#f59e0b',
  low: '#22c55e',
};

/**
 * Priority label mapping.
 */
export const priorityLabels = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};
