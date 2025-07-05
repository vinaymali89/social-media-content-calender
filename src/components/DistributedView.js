import React from 'react';
import { useSelector } from 'react-redux';
import { Droppable } from '@hello-pangea/dnd';

function DistributedView() {
  const selectedDates = useSelector((state) => state.calendar.selectedDates);
  const posts = useSelector((state) => state.calendar.posts);
  const activeCategories = useSelector((state) => state.calendar.activeCategories);

  return (
    <div className="p-0">
      {selectedDates.map((date) => {
        const filteredPosts = posts.filter(
          (post) => post.scheduleDate === date && activeCategories.includes(post.category)
        );

        return (
          <div key={date} className="mb-6">
            <h3 className="text-lg font-bold text-indigo-600 dark:text-indigo-400 mb-3">
              {date}
            </h3>

            <Droppable droppableId={date}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="grid sm:grid-cols-2 md:grid-cols-2 gap-4"
                >
                  {filteredPosts.length === 0 ? (
                    <p className="text-sm text-muted col-span-2 italic">
                      🚫 No posts scheduled on this date.<br /> Select a date first for drag and drop schedule post.
                    </p>
                  ) : (
                    filteredPosts.map((post, index) => (
                      <div
                        key={post.id}
                        className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden transition hover:shadow-lg"
                      >
                        {post.image && (
                          <img
                            src={post.image}
                            alt="post preview"
                            className="w-full h-40 object-cover"
                          />
                        )}
                        <div className="p-4">
                          <h4 className="font-semibold text-md text-indigo-700 dark:text-indigo-300">
                            {post.pageName}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {post.category} • {post.postType}
                          </p>
                          <p className="text-sm mt-2 text-gray-500 dark:text-gray-400">
                            Followers: <strong>{post.followers.toLocaleString()}</strong>
                          </p>
                          <a
                            href={post.postLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-500 underline mt-2 inline-block"
                          >
                            🔗 View Post
                          </a>
                        </div>
                      </div>
                    ))
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

          </div>
        );
      })}
    </div>
  );
}

export default DistributedView;