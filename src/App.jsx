import { Provider } from 'react-redux';
import FilterBar from './components/FilterBar';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import './styles/App.css';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <div className='task-app'>
        <h1 className='app-title'>Task Manager</h1>
        <TaskInput />
        <FilterBar />
        <TaskList />
      </div>
    </Provider>
  );
}

export default App;
