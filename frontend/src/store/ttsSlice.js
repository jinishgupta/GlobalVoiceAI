import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  text: '',
  voiceId: 'en-US-Wavenet-D',
  style: 'Conversational',
  audioUrl: null,
  loading: false,
  ocrLoading: false,
  ocrError: '',
  ttsError: '',
  ttsJobs: [],
  ttsJobsLoading: false,
  ttsJobsError: '',
};

export const getTTS = createAsyncThunk(
  'tts/getTTS',
  async ({ text, voiceId, style }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/tts",
        { text, voiceId, style },
    {
        withCredentials: true,
    });
      return response.data;
    } catch (error) {
      console.error('Error fetching TTS:', error);
    }
  }
);

export const getVoices = createAsyncThunk(
  'tts/getVoices',
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/voices", 
    {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching voices:', error);
    }
  }
);

export const saveTTSProject = createAsyncThunk(
    "/tts/saveProject",
  
    async ({projectName, script, sourceLocale, targetLocale, audioUrl, transcript}) => {
        console.log("Saving project with data:");
      const response = await axios.post(
        "http://localhost:5000/api/tts-translate-project",
        {projectName, script, sourceLocale, targetLocale, audioUrl, transcript},
        {
          withCredentials: true,
        }
      );
  
      return response.data;
    }
  );  

export const getUserTTSJobs = createAsyncThunk(
  'tts/getUserTTSJobs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:5000/api/tts-jobs', { withCredentials: true });
      return response.data.jobs;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Network Error');
    }
  }
);

const ttsSlice = createSlice({
    name: 'tts',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(getTTS.pending, (state) => {
                state.loading = true;
                state.audioUrl = null;
                state.ttsError = '';
            })
            .addCase(getTTS.fulfilled, (state, action) => {
                state.loading = false;
                state.audioUrl = action.payload.audioUrl;
            })
            .addCase(getTTS.rejected, (state) => {
                state.loading = false;
                state.ttsError = 'Failed to generate audio.';
            })
            .addCase(getVoices.pending, (state) => {
                state.loading = true;
            })
            .addCase(getVoices.fulfilled, (state, action) => {
                state.loading = false;
                state.voices = action.payload;
            })
            .addCase(getVoices.rejected, (state) => {
                state.loading = false;
                state.ttsError = 'Failed to fetch voices.';
            })
            .addCase(saveTTSProject.pending, (state) => {
                state.loading = true;
            })
            .addCase(saveTTSProject.fulfilled, (state, action) => {
                state.loading = false;
                state.ttsError = '';
                console.log("Project saved successfully:", action.payload);
            })
            .addCase(saveTTSProject.rejected, (state) => {
                state.loading = false;
                state.ttsError = 'Failed to save audio.';
            })
            .addCase(getUserTTSJobs.pending, (state) => {
                state.ttsJobsLoading = true;
                state.ttsJobsError = '';
            })
            .addCase(getUserTTSJobs.fulfilled, (state, action) => {
                state.ttsJobsLoading = false;
                state.ttsJobs = action.payload;
            })
            .addCase(getUserTTSJobs.rejected, (state, action) => {
                state.ttsJobsLoading = false;
                state.ttsJobsError = action.payload || 'Failed to fetch TTS jobs';
            });

    }
});

export default ttsSlice.reducer;