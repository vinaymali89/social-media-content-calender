import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Calendar from './components/Calendar';
import ExportButton from './components/ExportButton';
import DistributedView from './components/DistributedView';
import CategorySelector from './components/CategorySelector';
import ResetButton from './components/ResetButton';
import { setPosts } from './features/calendarSlice';
import posts from './data/posts.json';
import { distributePostsByDateAndCategory } from './utils/distributePosts';
import { ToastContainer } from 'react-toastify';
import { DragDropContext } from '@hello-pangea/dnd';
import { updateScheduleDate } from './features/calendarSlice';
import AddPostModal from './components/AddPostModal';
import AddPostButton from './components/AddPostButton';
import Header from './shared-components/Header';
import Footer from './shared-components/Footer';
import { setActiveCategories, setSelectedPages } from './features/calendarSlice';
import { fetchPosts } from './utils/fakeApi';
import logo from './assets/img/smcc.png';
// import FilterModal from './components/FilterModal';


function App() {
  const dispatch = useDispatch();
  const selectedDates = useSelector((state) => state.calendar.selectedDates);
  const allPosts = useSelector((state) => state.calendar.posts);
  const [showAddPost, setShowAddPost] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(true);

useEffect(() => {
  const localData = localStorage.getItem('scheduledPosts');
  if (localData) {
    dispatch(setPosts(JSON.parse(localData)));
  } else {
    fetchPosts().then((data) => {
      dispatch(setPosts(data));
    });
  }
}, [dispatch]);

  useEffect(() => {
    const distributed = distributePostsByDateAndCategory(allPosts, selectedDates);
    console.log('📊 Live Preview:', distributed);
  }, [allPosts, selectedDates]);

  // sDnD handler
  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    dispatch(updateScheduleDate({ postId: draggableId, date: destination.droppableId }));
  };

  const handleFilterSubmit = (pages, categories) => {
    dispatch(setSelectedPages(pages));
    dispatch(setActiveCategories(categories));
    setShowFilterModal(false);
  };

  // if (showFilterModal) {
  //   return <FilterModal onSubmit={handleFilterSubmit} />;
  // }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <ToastContainer position="top-center" autoClose={3000} />
      <Header />
      <div className="container mt-4 mb-5">
        <h1 className="text-3xl font-bold text-indigo-600 flex flex-row justify-center items-center text-center">
          <img src={logo} alt="calender" height={50} width={50}/>&nbsp;&nbsp;Social Media Content Calendar
        </h1>

        <div className="flex justify-between gap-2 mb-1">
          <div>
            <AddPostButton onClick={() => setShowAddPost(true)} />
          </div>
          <div className="flex gap-2 mb-3">
            <ExportButton />
            <ResetButton />
          </div>
        </div>

        {showAddPost && <AddPostModal onClose={() => setShowAddPost(false)} />}

        <DragDropContext onDragEnd={handleDragEnd}>
          {/*  2-Columns view */}
          <div className="row g-4">
            {/* Left side */}
            <div className="col-md-5">
              <Calendar />
            </div>

            {/* Right side */}
            <div className="col-md-7">
              <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-4">
                <h2 className="text-heading mb-4">📊 Scheduled Post Preview</h2>
                <CategorySelector />
                <div className="mt-4 max-h-[790px] overflow-y-auto pr-2">
                  <DistributedView />
                </div>
              </div>
            </div>
          </div>
        </DragDropContext>
      </div>
      <Footer />
    </div>
  );
}

export default App;
