import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,
  dubs: [],
  userJobs: [],
  error: null,
  currentJob: null,
  jobLoading: false,
  jobError: null,
  jobDetails: null,
  jobDetailsLoading: false,
  jobDetailsError: null
};

export const dubWithJob = createAsyncThunk(
  "dubbing/dubWithJob",
  async ({ projectName, priority, target_locales,source_locale, file }) => {
    const formData = new FormData();
    formData.append("projectName", projectName);
    formData.append("priority", priority);
    target_locales.forEach(locale => formData.append("target_locales", locale));
    if (source_locale && source_locale !== 'Auto-Detect') {
        formData.append('source_locale', source_locale);
      }
    formData.append("file", file);

    const response = await axios.post(
      "https://globalvoiceai-backend.onrender.com/api/dubbing/create",
      formData,
      { withCredentials: true }
    );
    return response.data;
  }
);

export const fetchUserJobs = createAsyncThunk(
  'dubbing/fetchUserJobs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        'https://globalvoiceai-backend.onrender.com/api/dubbing/jobs',
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
 
export const getStatus = createAsyncThunk(
  'dubbing/getStatus',
  async (jobId) => {
    try {
      console.log("Fetching status from backend...");
      const response = await axios.get(
        `https://globalvoiceai-backend.onrender.com/api/dubbing/status/${jobId}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return error.response?.data || error.message;
    }
  }
);

export const fetchJobById = createAsyncThunk(
  'dubbing/fetchJobById',
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://globalvoiceai-backend.onrender.com/api/dubbing/job/${jobId}`, { withCredentials: true });
      return response.data.job;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Network Error');
    }
  }
);

const dubbingSlice = createSlice({
    name: "dubbing",
    initialState,
    reducers: {
      updateJobStatus: (state, action) => {
        const { jobId, status, downloadDetails } = action.payload;
        const jobIndex = state.userJobs.findIndex(job => job.jobId === jobId);
        if (jobIndex !== -1) {
          state.userJobs[jobIndex].status = status;
          if (downloadDetails) {
            state.userJobs[jobIndex].downloadDetails = downloadDetails;
          }
        }
      },
      clearError: (state) => {
        state.error = null;
      }
    },
    extraReducers: (builder) => {
        builder
        .addCase(dubWithJob.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(dubWithJob.fulfilled, (state, action) => {
            state.isLoading = false;
            console.log("Project created successfully:", action.payload.data);
            state.dubs.push(action.payload.data);
        })
        .addCase(dubWithJob.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
        .addCase(fetchUserJobs.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(fetchUserJobs.fulfilled, (state, action) => {
            state.isLoading = false;
            state.userJobs = action.payload.jobs || [];
        })
        .addCase(fetchUserJobs.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
        .addCase(getStatus.pending, (state) => {
            state.jobLoading = true;
            state.jobError = null;
        })
        .addCase(getStatus.fulfilled, (state, action) => {
            state.jobLoading = false;
            state.currentJob = action.payload;
        })
        .addCase(getStatus.rejected, (state, action) => {
            state.jobLoading = false;
            state.jobError = action.payload || 'Failed to fetch job status';
        })
        .addCase(fetchJobById.pending, (state) => {
            state.jobDetailsLoading = true;
            state.jobDetailsError = null;
        })
        .addCase(fetchJobById.fulfilled, (state, action) => {
            state.jobDetailsLoading = false;
            state.jobDetails = action.payload;
        })
        .addCase(fetchJobById.rejected, (state, action) => {
            state.jobDetailsLoading = false;
            state.jobDetailsError = action.payload || 'Failed to fetch job details';
        });
    }
});

export const { updateJobStatus, clearError } = dubbingSlice.actions;
export default dubbingSlice.reducer;