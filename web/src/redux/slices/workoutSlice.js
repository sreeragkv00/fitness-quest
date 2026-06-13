import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  workouts: [],
  loading: false,
  error: null,
  filter: { type: null, startDate: null, endDate: null }
};

const workoutSlice = createSlice({
  name: 'workout',
  initialState,
  reducers: {
    setWorkouts: (state, action) => {
      state.workouts = action.payload;
    },
    addWorkout: (state, action) => {
      state.workouts.unshift(action.payload);
    },
    updateWorkout: (state, action) => {
      const index = state.workouts.findIndex(w => w._id === action.payload._id);
      if (index > -1) {
        state.workouts[index] = action.payload;
      }
    },
    deleteWorkout: (state, action) => {
      state.workouts = state.workouts.filter(w => w._id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    }
  }
});

export const { setWorkouts, addWorkout, updateWorkout, deleteWorkout, setLoading, setError, setFilter } = workoutSlice.actions;
export default workoutSlice.reducer;
