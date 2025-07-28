import React, { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    // Carrega do localStorage (ou array vazio se não existir)
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [newTask, setNewTask] = useState('');

  // Salva no localStorage sempre que tasks muda
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Adicionar tarefa
  function addTask() {
    if (!newTask.trim()) return;
    const novaTarefa = {
      id: Date.now(),
      text: newTask.trim(),
      done: false
    };
    setTasks([...tasks, novaTarefa]);
    setNewTask('');
  }

  // Alternar concluída/não concluída
  function toggleDone(id) {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, done: !t.done } : t
    ));
  }

  // Remover tarefa
  function removeTask(id) {
    setTasks(tasks.filter(t => t.id !== id));
  }

  return (
    <div className="container">
      <h1 className="title">✨ Lista de tarefas</h1>

      <div className="input-container">
        <input
          type="text"
          placeholder="Digite uma tarefa..."
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTask()}
        />
        <button onClick={addTask}>+</button>
      </div>

      <ul className="task-list">
        {tasks.length === 0 && (
          <p className="empty">Nenhuma tarefa ainda! 👀</p>
        )}

        {tasks.map(task => (
          
          <li key={task.id} className={`task ${task.done ? 'done' : ''}`}>
            <span onClick={() => toggleDone(task.id)}>
              {task.text}
            </span>
            <button
              className="delete"
              onClick={() => removeTask(task.id)}
            >
              ✖
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;