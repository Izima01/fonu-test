import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
  filteredTasks: [],
  filter: 'all',
};

// Create the slice
const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: Math.round(Math.random() * 10000),
        text: action.payload,
        completed: false,
      };
      state.tasks = [newTask, ...state.tasks];
      localStorage.setItem('tasks', JSON.stringify(state.tasks)); // Save to localStorage
    },
    toggleTask: (state, action) => {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      );
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    setFilter: (state, action) => {
      state.filter = action.payload;

      state.filteredTasks = state.tasks.filter((task) => {
        if (action.payload === 'active') return !task.completed;
        if (action.payload === 'completed') return task.completed;
        return true;
      });
    },
  },
});

// Export actions and reducer
export const { addTask, toggleTask, deleteTask, setFilter } = taskSlice.actions;
export default taskSlice.reducer;
