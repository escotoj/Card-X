import React from 'react';

const SingleThought = ({ thought }) => {
  return (
    <div className="thought-card">
      <p>{thought.message}</p>
      <div className="thought-card-info">
        <span className="username">Posted by: {thought.username}</span>
        <span className="date">Posted on: {thought.createdAt}</span>
      </div>
    </div>
  );
};

export default SingleThought;
