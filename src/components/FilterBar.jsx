import React from 'react';
import '../styles/FilterBar.css';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../redux/TaskSlice';

const FilterBar = () => {
  const { filter } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(setFilter(filter));
  // }, [filter, dispatch]);

  return (
    <div className='filter-bar'>
      <button
        className={filter === 'all' ? 'active' : ''}
        onClick={() => dispatch(setFilter('all'))}
      >
        All
      </button>
      <button
        className={filter === 'active' ? 'active' : ''}
        onClick={() => dispatch(setFilter('active'))}
      >
        Active
      </button>
      <button
        className={filter === 'completed' ? 'active' : ''}
        onClick={() => dispatch(setFilter('completed'))}
      >
        Completed
      </button>
    </div>
  );
};

export default FilterBar;
