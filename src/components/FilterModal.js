import React, { useState } from 'react';

const allPages = [
  '@MemeKing',
  '@BollyBuzz',
  '@EditQueen',
  '@LaughingLad',
  '@BollyWorld',
  '@ClipArtz',
  '@ComicByte',
  '@EditHub',
  '@BollyVibes',
  '@MemeStorm',
];

const allCategories = ['Meme', 'Bollywood', 'Edit'];

function FilterModal({ onSubmit }) {
  const [selectedPages, setSelectedPages] = useState(allPages);
  const [selectedCategories, setSelectedCategories] = useState(allCategories);

  const toggleSelection = (value, list, setList) => {
    if (list.includes(value)) {
      setList(list.filter((item) => item !== value));
    } else {
      setList([...list, value]);
    }
  };

  const handleSubmit = () => {
    if (selectedPages.length === 0 || selectedCategories.length === 0) {
      alert('Please select at least one Page and one Category');
      return;
    }
    onSubmit(selectedPages, selectedCategories);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 text-black dark:text-white p-6 rounded-lg max-w-xl w-full shadow-xl">
        <h2 className="text-xl font-bold mb-4">🔍 Select Pages & Categories</h2>

        <div className="mb-4">
          <label className="font-semibold mb-2 block">Select Pages:</label>
          <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
            {allPages.map((page) => (
              <label key={page} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedPages.includes(page)}
                  onChange={() =>
                    toggleSelection(page, selectedPages, setSelectedPages)
                  }
                />
                <span>{page}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="font-semibold mb-2 block">Select Categories:</label>
          <div className="flex gap-4">
            {allCategories.map((cat) => (
              <label key={cat} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() =>
                    toggleSelection(cat, selectedCategories, setSelectedCategories)
                  }
                />
                <span>{cat}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button className="btn btn-secondary" onClick={handleSubmit}>
            ✅ Confirm & Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterModal;
