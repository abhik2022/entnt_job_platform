// src/store/index.js
import { configureStore, createSlice } from '@reduxjs/toolkit'; 
import dummyJobs from './dummyJobs';

const loadJobs = () => {
    const storedJobs = JSON.parse(localStorage.getItem('jobs'));
    if (storedJobs) {
        return storedJobs;
    } else {
        localStorage.setItem('jobs', JSON.stringify(dummyJobs));
        return dummyJobs;
    }
};

// Redux slice for jobs
const jobSlice = createSlice({
    name: 'jobs',
    initialState: loadJobs(),
    reducers: {
        addJob: (state, action) => {
            state.push(action.payload); // Add new job to state
            localStorage.setItem('jobs', JSON.stringify(state)); // Sync with localStorage
        },
        // This will handle updating an existing job
        editJob: (state, action) => {
            const index = state.findIndex(job => job.id === action.payload.id);
            if (index !== -1) {
                // If job is found, update it with the new data
                state[index] = { ...state[index], ...action.payload };
                localStorage.setItem('jobs', JSON.stringify(state)); // Sync with localStorage
            } else {
                console.log("Job not found for edit:", action.payload.id);
            }
        },
        deleteJob: (state, action) => {
            const updatedState = state.filter(job => job.id !== action.payload);
            localStorage.setItem('jobs', JSON.stringify(updatedState)); // Sync with localStorage
            return updatedState; // Ensure the state is updated correctly
        },
        updateJobCandidates: (state, action) => {
            const job = state.find(job => job.id === action.payload.jobId);
            if (job) {
                job.applicants.push(action.payload.candidate);
                localStorage.setItem('jobs', JSON.stringify(state)); // Sync with localStorage
            }
        },
        updateCandidateStatus: (state, action) => {
            const job = state.find(job => job.id === action.payload.jobId);
            if (job) {
                const candidate = job.applicants.find(cand => cand.id === action.payload.candidateId);
                if (candidate) {
                    candidate.status = action.payload.status;
                    localStorage.setItem('jobs', JSON.stringify(state)); // Sync with localStorage
                }
            }
        },
    },
});


// Store configuration
const store = configureStore({
    reducer: {
        jobs: jobSlice.reducer,
    }
});

// Subscribe to store updates and save to localStorage
store.subscribe(() => {
    localStorage.setItem('jobs', JSON.stringify(store.getState().jobs));
});

// Export actions and store
export const { 
    addJob, editJob, deleteJob, updateJobCandidates, updateCandidateStatus 
} = jobSlice.actions;

export default store;