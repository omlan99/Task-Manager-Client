// /src/Hooks/useAxios.js
import { useState, useCallback } from 'react';
import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:3000', // Adjust as needed
  baseURL: 'https://task-manager-server-8frn.onrender.com/', 
});

const useAxios = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Accept an optional query string
  const getTasks = useCallback(async (query = "") => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/tasks' + query);
      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      setError(err);
      throw err;
    }
  }, []);

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
