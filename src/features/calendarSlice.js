import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedDates: [],
  posts: [],
  categoryFilter: 'All',
  activeCategories: ['Meme', 'Edit', 'Bollywood'], 
  assignedPosts: {
    unassigned: [] 
  },
  selectedPages: [],
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
addDate: (state, action) => {
  const date = action.payload;
  if (!state.selectedDates.includes(date)) {
    state.selectedDates.push(date);
    state.assignedPosts[date] = []; 
  }
},
   removeDate: (state, action) => {
      const date = action.payload;
      state.selectedDates = state.selectedDates.filter(d => d !== date);
      delete state.assignedPosts[date];
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
      state.assignedPosts.unassigned = action.payload;
    },

    setCategoryFilter: (state, action) => {
      state.categoryFilter = action.payload;
    },
    setActiveCategories: (state, action) => {
      state.activeCategories = action.payload;
    },
    resetCalendar: (state) => {
      state.selectedDates = [];
      state.activeCategories = ['Meme', 'Edit', 'Bollywood'];
    },
    updateScheduleDate: (state, action) => {
      const { postId, date } = action.payload;
      const post = state.posts.find((p) => p.id === postId);
      if (post) {
        post.scheduleDate = date;
        localStorage.setItem('scheduledPosts', JSON.stringify(state.posts)); 
      }
    },
    setSelectedPages: (state, action) => {
  state.selectedPages = action.payload;
},


  },
});

// Export actions and reducer
export const {
  addDate,
  removeDate,
  setPosts,
  setCategoryFilter,
  setActiveCategories,
  resetCalendar,movePost,updateScheduleDate,setSelectedPages
} = calendarSlice.actions;

export default calendarSlice.reducer;
