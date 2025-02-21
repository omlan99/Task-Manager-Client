import { useState, useCallback } from 'react';
import axios from 'axios';

// Create an axios instance with your base URL
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // update this if your backend URL differs
});

const useAxios = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch tasks
  const getTasks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/tasks');
      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      setError(err);
      throw err;
    }
  }, []);

  // Create a new task
  const createTask = useCallback(async (task) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post('/tasks', task);
      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      setError(err);
      throw err;
    }
  }, []);

  // Update an existing task
  const updateTask = useCallback(async (id, updatedTask) => {
    setLoading(true);
    try {
      const response = await axiosInstance.put(`/tasks/${id}`, updatedTask);
      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      setError(err);
      throw err;
    }
  }, []);

  // Delete a task
  const deleteTask = useCallback(async (id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.delete(`/tasks/${id}`);
      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      setError(err);
      throw err;
    }
  }, []);

  return { getTasks, createTask, updateTask, deleteTask, loading, error };
};

export default useAxios;
