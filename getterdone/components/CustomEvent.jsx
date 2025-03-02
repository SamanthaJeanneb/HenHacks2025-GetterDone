import React from 'react';

export default function CustomEvent({ event, toggleCompletion }) {
  const handleCheckboxChange = (e) => {
    e.stopPropagation();
    toggleCompletion(event.id);
  };

  return (
    <div>
      <span>{event.title}</span>
      <input
        type="checkbox"
        checked={event.completed}
        onChange={handleCheckboxChange}
        style={{ marginLeft: '10px' }}
      />
    </div>
  );
}