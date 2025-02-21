import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Todo = ({ category }) => {
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);

  const handleAdd = async () => {
    if (input.trim() === "") return;

    // Create a new task object with title and category
    const newTask = {
      title: input,
      category: category,
      // Optionally add more fields such as description, timestamp, etc.
    };

    // Update local state (for immediate UI feedback)
    setItems([...items, newTask]);
    setInput("");

    // Send the new task to the backend
    axios.post("http://localhost:3000/task", newTask)
    .then(res => {
      console.log(res.data)
    })

 
}
  return (
    <div className="p-4">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
        placeholder="Type here"
        className="input input-bordered w-full max-w-xs mb-3"
      />
      <button onClick={handleAdd} className="btn mb-3">Add task</button>
      <div className='w-full'>
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-4 mb-2"
          >
            <p>{item.title}</p>
            <small>{item.category}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
