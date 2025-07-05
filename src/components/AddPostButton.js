import React from 'react';

function AddPostButton({ onClick }) {
  return (
    <button className="btn btn-success mt-4 px-4 py-2" onClick={onClick}>
      ➕ Add New Post
    </button>
  );
}

export default AddPostButton;
