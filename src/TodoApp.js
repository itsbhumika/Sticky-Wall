import React, { useState } from 'react';
import './TodoApp.css';

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, { id: Date.now(), text: input.trim(), completed: false }]);
      setInput('');
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="todo-grid">
      <div className="note-card yellow">
        <h3>Social Media</h3>
        <ul>
          <li>- Plan social content</li>
          <li>- Build content calendar</li>
          <li>- Plan promotion and distribution</li>
        </ul>
      </div>

      <div className="note-card blue">
        <h3>Content Strategy</h3>
        <p>Brainstorm SEO goals, budget & marketing tools. Assemble content team next.</p>
      </div>

      <div className="note-card pink">
        <h3>Email A/B Tests</h3>
        <ul>
          <li>- Subject lines</li>
          <li>- CTA</li>
          <li>- Send times</li>
        </ul>
      </div>

      <div className="note-card orange">
        <h3>Banner Ads</h3>
        <p>- Visual appeal<br />- Sizing<br />- Landing page match</p>
      </div>

      <div className="note-card gray">
        <h3>Your To-Do</h3>
        <div className="todo-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a task"
          />
          <button onClick={addTask}>+</button>
        </div>
        <ul className="todo-list">
          {tasks.map((task) => (
            <li key={task.id}>
              <label>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
                <span className={task.completed ? 'done' : ''}>{task.text}</span>
              </label>
              <button onClick={() => deleteTask(task.id)}>🗑️</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="note-card add-new">➕</div>
    </div>
  );
}

export default TodoApp;
