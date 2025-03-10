import React, { useState } from 'react';
import '../styles/TaskItem.css';
import { useDispatch } from 'react-redux';
import { deleteTask, toggleTask } from '../redux/TaskSlice';

const TaskItem = ({ task }) => {
  const [status, setStatus] = useState('');
  const dispatch = useDispatch();

  const toTitleCase = (text) => {
    return text[0].toUpperCase().concat(text.substr(1));
  };

  return (
    <div
      className={`task-item ${status === 'deleting' ? 'slide-out' : ''} ${
        task.completed ? 'completed' : ''
      }`}
      key={task.id}
    >
      <label className='checkbox-container'>
        <input
          type='checkbox'
          data-testid='checkbox'
          checked={task.completed}
          onChange={() => {
            setStatus('changed');
            dispatch(toggleTask(task.id));
          }}
        />
        <span className='checkmark'></span>
      </label>
      <span className='task-text' data-testid='task-title'>
        {toTitleCase(task.text)}
      </span>
      <button
        className='delete-btn'
        data-testid='delete-btn'
        onClick={() => {
          setStatus('deleting');
          setTimeout(() => {
            dispatch(deleteTask(task.id));
          }, 1200);
        }}
        aria-label='Delete task'
      >
        ✕
      </button>
    </div>
  );
};

export default TaskItem;
