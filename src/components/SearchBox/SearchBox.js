import './SearchBox.css';
import React from 'react';

function SearchBox({ searchChange }) {
  return (
    <div className='searchbox'>
      <input
        className='search'
        type='search'
        placeholder='search users'
        onChange={searchChange}
      />
    </div>
  );
}

export default SearchBox;
