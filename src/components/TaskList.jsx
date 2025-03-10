import React from 'react';
// import { useTasks } from '../hooks/useTasks';
import TaskItem from './TaskItem';
import '../styles/TaskList.css';
import { useSelector } from 'react-redux';

const TaskList = () => {
  const { filteredTasks, filter, tasks } = useSelector((state) => state.tasks);
  const tasksToDisplay = filter === 'all' ? tasks : filteredTasks;

  return (
    <div className='task-list'>
      {tasksToDisplay?.length === 0 ? (
        <p className='no-tasks'>No tasks to display</p>
      ) : (
        tasksToDisplay?.map((task) => <TaskItem key={task.id} task={task} />)
      )}
    </div>
  );
};

export default TaskList;
