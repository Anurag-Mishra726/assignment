import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { taskApi } from '../api/task.api';
import toast from 'react-hot-toast';

export const useTask = () => {
  const queryClient = useQueryClient();

  // List all tasks
  const listTasksQuery = useQuery({
    queryKey: ['tasks'],
    queryFn: taskApi.listTasks,
    staleTime: 1000 * 60 * 5, 
  });

  // Create task mutation
  const createTaskMutation = useMutation({
    mutationFn: taskApi.createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Task created successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to create task');
    },
  });

  // Update task mutation
  const updateTaskMutation = useMutation({
    mutationFn: ({ id, data }) => taskApi.updateTask(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Task updated successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update task');
    },
  });

  // Delete task 
  const deleteTaskMutation = useMutation({
    mutationFn: taskApi.deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Task deleted successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete task');
    },
  });

  return {
    // Queries
    tasks: listTasksQuery.data,
    isLoadingTasks: listTasksQuery.isLoading,
    isErrorTasks: listTasksQuery.isError,
    errorTasks: listTasksQuery.error,

    // Mutations
    createTask: createTaskMutation.mutate,
    isCreatingTask: createTaskMutation.isPending,

    updateTask: updateTaskMutation.mutate,
    isUpdatingTask: updateTaskMutation.isPending,

    deleteTask: deleteTaskMutation.mutate,
    isDeletingTask: deleteTaskMutation.isPending,
  };
};
