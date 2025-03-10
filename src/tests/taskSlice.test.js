import taskReducer, {
  addTask,
  toggleTask,
  deleteTask,
  setFilter,
} from '../redux/TaskSlice';

describe('taskSlice', () => {
  const initialState = { tasks: [], filter: 'all', filteredTasks: [] };

  test('should add a new task', () => {
    const newState = taskReducer(initialState, addTask('New Task'));
    expect(newState.tasks.length).toBe(1);
    expect(newState.tasks[0].text).toBe('New Task');
  });

  test('should toggle task completion', () => {
    const stateWithTask = {
      tasks: [{ id: '1', text: 'Test Task', completed: false }],
      filter: 'all',
      filteredTasks: [],
    };
    const newState = taskReducer(stateWithTask, toggleTask('1'));
    expect(newState.tasks[0].completed).toBe(true);
  });

  test('should delete a task', () => {
    const stateWithTask = {
      tasks: [{ id: '1', text: 'Test Task', completed: false }],
      filter: 'all',
      filteredTasks: [],
    };
    const newState = taskReducer(stateWithTask, deleteTask('1'));
    expect(newState.tasks.length).toBe(0);
  });

  test('should change the filter', () => {
    const newState = taskReducer(initialState, setFilter('completed'));
    expect(newState.filter).toBe('completed');
  });
});
