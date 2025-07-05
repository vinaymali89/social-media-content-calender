import React from 'react';
import { useDispatch } from 'react-redux';
import { resetCalendar } from '../features/calendarSlice';

function ResetButton() {
  const dispatch = useDispatch();

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset everything?")) {
      localStorage.removeItem('scheduledPosts'); // ✅ remove only one key
      dispatch(resetCalendar());
      window.location.reload(); 
    }
  };

  return (
    <div className="text-center">
      <button className="btn btn-outline-danger mt-4 px-4 py-2" onClick={handleReset}>
        🔄 Reset All
      </button>
    </div>
  );
}

export default ResetButton;
