import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    text: '',
    targetLanguage: 'en',
    translation: null,
    loading: false,
    error: '',
};

export const getTranslate = createAsyncThunk(
    'translate/getTranslate',
    async ({ text, targetLanguage }) => {
        try {
            const response = await axios.post(
                "https://globalvoiceai-backend.onrender.com/api/translate",
                { text, targetLanguage },
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            console.error('Error fetching translation:', error);
            throw error;
        }
    }
);

const translateSlice = createSlice({
    name: 'translate',
    initialState,
    reducers: {
        setText: (state, action) => {
            state.text = action.payload;
        },
        setTargetLanguage: (state, action) => {
            state.targetLanguage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTranslate.pending, (state) => {
                state.loading = true;
                state.translation = null;
                state.error = '';
            })
            .addCase(getTranslate.fulfilled, (state, action) => {
                state.loading = false;
                state.translation = action.payload;
            })
            .addCase(getTranslate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default translateSlice.reducer;