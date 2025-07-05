import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveCategories } from '../features/calendarSlice';

const categories = ['Meme', 'Edit', 'Bollywood'];

function CategorySelector() {
  const dispatch = useDispatch();
  const active = useSelector((state) => state.calendar.activeCategories);

  const toggleCategory = (cat) => {
    let updated;
    if (active.includes(cat)) {
      updated = active.filter((c) => c !== cat);
    } else {
      updated = [...active, cat];
    }
    dispatch(setActiveCategories(updated));
  };

  return (
    <div className="p-3 bg-white rounded shadow mt-4">
      <h5 className="mb-2 font-semibold">🎯 Filter Categories to Schedule</h5>
      <div className="d-flex gap-3 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => toggleCategory(cat)}
            className={`btn btn-sm ${
              active.includes(cat) ? 'btn-success' : 'btn-outline-secondary'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategorySelector;
