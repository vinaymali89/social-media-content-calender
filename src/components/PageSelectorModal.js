import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { togglePageSelection, toggleCategorySelection } from '../features/calendarSlice';

function PageSelectorModal({ onClose }) {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.calendar.posts);
  const selectedPages = useSelector((state) => state.calendar.filteredPages);
  const selectedCategories = useSelector((state) => state.calendar.filteredCategories);

  const allPages = Array.from(new Set(posts.map((post) => post.pageName))).sort();
  const allCategories = Array.from(new Set(posts.map((post) => post.category))).sort();

  const handlePageToggle = (pageName) => {
    dispatch(togglePageSelection(pageName));
  };

  const handleCategoryToggle = (category) => {
    dispatch(toggleCategorySelection(category));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-3xl overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-bold mb-4 text-indigo-600">Select Pages and Categories</h2>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-md font-semibold mb-2">📄 Pages</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto border rounded p-2">
              {allPages.map((page) => (
                <label key={page} className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    checked={selectedPages.includes(page)}
                    onChange={() => handlePageToggle(page)}
                  />
                  <span>{page}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-md font-semibold mb-2">🏷️ Categories</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto border rounded p-2">
              {allCategories.map((category) => (
                <label key={category} className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryToggle(category)}
                  />
                  <span>{category}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6 gap-3">
          <button
            className="btn btn-outline-secondary"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default PageSelectorModal;
