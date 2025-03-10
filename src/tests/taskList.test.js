import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import TaskList from '../components/TaskList';
import TaskInput from '../components/TaskInput';
import taskReducer from '../redux/TaskSlice';
import { configureStore } from '@reduxjs/toolkit';

function renderWithRedux(ui, { preloadedState } = { preloadedState: {} }) {
  const store = configureStore({
    reducer: { tasks: taskReducer },
    preloadedState,
  });
  return { store, ...render(<Provider store={store}>{ui}</Provider>) };
}

test('renders task list with a task', () => {
  const preloadedState = {
    tasks: {
      tasks: [{ id: '3652', text: 'Test Task', completed: false }],
      filter: 'all',
    },
  };

  renderWithRedux(<TaskList />, { preloadedState });
  const element = screen.getByText('Test Task');

  expect(element).toBeTruthy();
});

test('adds a new task', () => {
  const { store } = renderWithRedux(
    <>
      <TaskInput />
      <TaskList />
    </>
  );

  const input = screen.getByPlaceholderText('Add a new task...');
  fireEvent.change(input, { target: { value: 'New Task' } });

  const addButton = screen.getByText('Add');
  fireEvent.click(addButton);

  expect(screen.getByText('New Task')).toBeTruthy();
});

test('toggles task completion', () => {
  const preloadedState = {
    tasks: {
      tasks: [{ id: '3652', text: 'Task to be Toggled', completed: false }],
      filter: 'all',
    },
  };
  renderWithRedux(<TaskList />, { preloadedState });

  const checkbox = screen.getByTestId('checkbox');
  expect(checkbox.checked).toBe(false);

  fireEvent.click(checkbox);
  expect(checkbox.checked).toBe(true);
});

test('deletes a task', () => {
  const preloadedState = {
    tasks: {
      tasks: [{ id: '3652', text: 'Task To Be Deleted', completed: false }],
      filter: 'all',
    },
  };
  renderWithRedux(<TaskList />, {
    preloadedState,
  });

  const deleteButton = screen.getByTestId('delete-btn');
  fireEvent.click(deleteButton);

  setTimeout(() => {
    expect(screen.queryByText('Task To Be Deleted')).not.toBeTruthy();
  }, 3000);
});
