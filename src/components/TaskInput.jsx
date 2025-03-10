import React, { useState } from 'react';
import '../styles/TaskInput.css';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/TaskSlice';

const TaskInput = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTask(text));
    setText('');
  };

  return (
    <form className='task-input' onSubmit={handleSubmit}>
      <input
        type='text'
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder='Add a new task...'
        aria-label='Add a new task'
      />
      <button type='submit'>Add</button>
    </form>
  );
};

export default TaskInput;
