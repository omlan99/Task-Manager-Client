import { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Fetch tasks from the backend on component mount
  useEffect(() => {
    fetch('http://localhost:3000/tasks')
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error(err));
  }, []);

  // Function to add a new task
  const addTask = () => {
    if (newTask.trim() === '') return;
    const taskData = { title: newTask, description: '', category: 'To-Do' };

    fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData),
    })
      .then(res => res.json())
      .then(data => {
        // Append new task to state
        setTasks(prev => [...prev, data]);
        setNewTask('');
      })
      .catch(err => console.error(err));
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Task Management App</h1>
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          placeholder="Enter task title"
          style={{ padding: '0.5rem', width: '250px' }}
        />
        <button onClick={addTask} style={{ padding: '0.5rem', marginLeft: '0.5rem' }}>
          Add Task
        </button>
      </div>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            {task.title} <span style={{ fontSize: '0.8rem', color: '#666' }}>({task.category})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
