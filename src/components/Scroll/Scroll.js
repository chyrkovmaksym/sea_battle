import './Scroll.css';
import React from 'react';

function Scroll(props) {
  return (
    <div
      className='scroll'
      style={{ overflow: 'scroll', border: '1px solid black', maxHeight: '700px' }}
    >
      {props.children}
    </div>
  );
}

export default Scroll;
