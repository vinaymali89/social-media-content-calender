import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../features/calendarSlice';

function AddPostModal({ onClose }) {
  const dispatch = useDispatch();
  const existingPosts = useSelector((state) => state.calendar.posts);

  const [formData, setFormData] = useState({
    id: `post-${Date.now()}`,
    pageName: '',
    category: 'Meme',
    followers: '',
    profileLink: 'https://instagram.com/memestorm',
    postLink: 'https://instagram.com/p/xyz10',
    postType: 'Reel',
    image: 'https://i.imgur.com/z6RVSYk.jpg',
    likes: '',
    views: '',
    comments: '',
    shares: '',
    reach: '',
    impressions: '',
    scheduleDate: '',
  });

const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: name === 'pageName' ? (value.startsWith('@') ? value : '@' + value) : value,
  }));
};


  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedPosts = [...existingPosts, { ...formData, followers: +formData.followers }];
    localStorage.setItem('scheduledPosts', JSON.stringify(updatedPosts));
    dispatch(setPosts(updatedPosts));
    onClose();
  };

return (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white rounded-lg shadow-lg p-6 max-w-2xl w-full overflow-y-auto max-h-[90vh]">
      <h2 className="text-xl font-semibold mb-4">➕ Add New Post</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        
        {/* Page Name */}
        <div className="col-span-2 sm:col-span-1">
          <label className="block font-medium text-sm mb-1">Page Name</label>
          <input
            type="text"
            name="pageName"
            value={formData.pageName}
            onChange={handleChange}
            className="form-control w-full text-sm px-2 py-1 rounded"
            required
          />
        </div>

        {/* Category Dropdown */}
        <div className="col-span-2 sm:col-span-1">
          <label className="block font-medium text-sm mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="form-select w-full text-sm px-2 py-1 rounded"
            required
          >
            <option value="Meme">Meme</option>
            <option value="Edit">Edit</option>
            <option value="Bollywood">Bollywood</option>
          </select>
        </div>

        {/* Other Input Fields */}
        {[
          ['followers', 'Followers'],
          ['profileLink', 'Profile Link'],
          ['postLink', 'Post Link'],
          ['postType', 'Post Type'],
          ['image', 'Image URL'],
          ['likes', 'Likes'],
          ['views', 'Views'],
          ['comments', 'Comments'],
          ['shares', 'Shares'],
          ['reach', 'Reach'],
          ['impressions', 'Impressions'],
          ['scheduleDate', 'Schedule Date (Optional)'],
        ].map(([key, label]) => (
          <div key={key} className="col-span-2 sm:col-span-1">
            <label className="block font-medium text-sm mb-1">{label}</label>
            <input
              type={key === 'scheduleDate' ? 'date' : 'text'}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="form-control w-full text-sm px-2 py-1 rounded"
              required={key !== 'comments' && key !== 'scheduleDate'}
            />
          </div>
        ))}

        {/* Submit Buttons */}
        <div className="col-span-2 flex justify-end mt-4 gap-3">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-outline-secondary"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-success">
            ✅ Save Post
          </button>
        </div>
      </form>
    </div>
  </div>
);

}

export default AddPostModal;
