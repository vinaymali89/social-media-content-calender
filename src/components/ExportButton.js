import React from 'react';
import { useSelector } from 'react-redux';
import { exportScheduleToExcel } from '../utils/exportToExcel';

function ExportButton() {
  const selectedDates = useSelector((state) => state.calendar.selectedDates);
  const posts = useSelector((state) => state.calendar.posts);

  const handleExport = () => {
    if (!selectedDates.length || !posts.length) {
      alert('Please select at least one date and ensure posts are available.');
      return;
    }

    exportScheduleToExcel(posts, selectedDates);
  };

  return (
    <div className="text-center">
      <button
        className={`btn btn-primary mt-4 px-4 py-2 ${
          selectedDates.length === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        }`}
        disabled={selectedDates.length === 0}
        onClick={handleExport}
      >
        📤 Export to Excel
      </button>
    </div>
  );
}

export default ExportButton;
