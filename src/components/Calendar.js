// ✅ Calendar.js with Scheduled & Unscheduled posts + drag support
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addDate,
  removeDate,
  setCategoryFilter,
} from '../features/calendarSlice';
import { Droppable, Draggable } from '@hello-pangea/dnd';

function Calendar() {
  const dispatch = useDispatch();
  const [selectedInput, setSelectedInput] = useState('');
  const selectedDates = useSelector((state) => state.calendar.selectedDates);
  const posts = useSelector((state) => state.calendar.posts);
  const categoryFilter = useSelector((state) => state.calendar.categoryFilter);

  const handleAddDate = () => {
    if (selectedInput && !selectedDates.includes(selectedInput)) {
      dispatch(addDate(selectedInput));
      setSelectedInput('');
    }
  };

  const handleRemoveDate = (date) => {
    dispatch(removeDate(date));
  };

  const handleFilterChange = (e) => {
    dispatch(setCategoryFilter(e.target.value));
  };

  const filteredPosts =
    categoryFilter === 'All'
      ? posts
      : posts.filter((post) => post.category === categoryFilter);

  const scheduledPosts = filteredPosts
    .filter((post) => post.scheduleDate)
    .sort((a, b) => b.followers - a.followers); // ✅ Sort descending

  const unscheduledPosts = filteredPosts
  .filter((post) => !post.scheduleDate)
  .sort((a, b) => b.followers - a.followers);


  return (
    <div className="p-4 bg-white dark:bg-gray-800 shadow-lg rounded-xl">
      <div className="d-flex justify-between align-items-center mb-3">
        <h2 className="text-heading font-bold text-indigo-600">
          📅 Social Media Content Calendar
        </h2>
      </div>

      {/* Date Input */}
      <div className="d-flex align-items-center gap-2 mb-4">
        <input
          type="date"
          className="form-control"
          value={selectedInput}
          onChange={(e) => setSelectedInput(e.target.value)}
          style={{ maxWidth: '200px' }}
        />
        <button className="btn btn-success" onClick={handleAddDate}>
          Add Date
        </button>
      </div>

      {/* Selected Dates */}
      {selectedDates.length === 0 ? (
        <p>No dates selected yet. (Please select a date first)</p>
      ) : (
        <>
          <h5>📆 Selected Dates:</h5>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3 mt-2 mb-4">
            {selectedDates.map((date) => (
              <div
                key={date}
                className="p-3 border rounded bg-green-100 text-sm flex justify-between items-center"
              >
                <span>{date}</span>
                <button
                  className="btn btn-sm btn-danger ml-2"
                  onClick={() => handleRemoveDate(date)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Category Filter */}
      <div className="mb-3">
        <label className="form-label font-medium">Filter by Category:</label>
        <select
          className="form-select"
          value={categoryFilter}
          onChange={handleFilterChange}
          style={{ maxWidth: '250px' }}
        >
          <option value="All">All</option>
          <option value="Meme">Meme</option>
          <option value="Bollywood">Bollywood</option>
          <option value="Edit">Edit</option>
        </select>
      </div>

      {/* ✅ Scheduled Posts */}
      <h5 className="mt-4">✅ Scheduled Posts ({scheduledPosts.length})</h5>
      <ul className="list-group mb-4">
        {scheduledPosts.map((post) => (
          <li key={post.id} className="list-group-item text-sm d-flex justify-content-between">
            <div>
              📆 {post.scheduleDate} — <strong>{post.pageName}</strong> ({post.category})
            </div>
            <span className="text-muted">
              {post.followers.toLocaleString()} followers
            </span>
          </li>

        ))}
      </ul>

      {/* 🟡 Unscheduled Posts (Draggable) */}
      <h6 style={{color: 'red'}}>(To use Drog-and-drop functionality for schedule post please select a date first from calender and Drag post from Unscheduled Posts and Drop Scheduled Post Preview 👉)</h6><h5 className="mt-4"> 🟡 Unscheduled Posts ({unscheduledPosts.length}) </h5>
      <Droppable droppableId="unscheduled">
        {(provided) => (
          <ul
            className="list-group mt-2"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {unscheduledPosts.map((post, index) => (
              <Draggable key={post.id} draggableId={post.id} index={index}>
                {(provided) => (
                  <li
                    className="list-group-item d-flex justify-content-between"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <div>
                      <strong>{post.pageName}</strong> — {post.category} — {post.postType}
                    </div>
                    <span className="text-muted">
                      {post.followers.toLocaleString()} followers
                    </span>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
}

export default Calendar;