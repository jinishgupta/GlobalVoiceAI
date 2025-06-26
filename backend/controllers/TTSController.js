import axios from 'axios';
import dotenv from 'dotenv';
import TTSJob from '../models/ttsJob.js';
dotenv.config();

const getTTS = async(req, res) => {
    const {text, voiceId, style} = req.body;
    const url = 'https://api.murf.ai/v1/speech/generate';
    const data = {
      text,
      voiceId,
      style
    };

    try {
      const response = await axios.post(url, data, {
      headers: {
        'api-key': process.env.MURF_API_KEY,
        'Content-Type': 'application/json'
      }
      });
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
}

const getVoices = async(req, res) => {
    const url = 'https://api.murf.ai/v1/speech/voices';
    try {
        const response = await axios.get(url, {
            headers: {
                'api-key': process.env.MURF_API_KEY,
                'Content-Type': 'application/json'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

const createTTSJobWithTranslation = async (req, res) => {
  console.log('Creating TTS+Translate job with data:', req.body);
  try {
    const { projectName, script, sourceLocale, targetLocale, audioUrl, transcript  } = req.body;
    const userId = req.user?._id;
    if (!projectName || !script || !targetLocale) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    const jobId = 'TTS-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8);
    const jobData = {
      jobId,
      userId,
      projectName,
      originalScript: script,
      translatedScript: transcript,
      sourceLocale,
      targetLocale,
      ttsAudioUrl: audioUrl,
      status: 'COMPLETED',
    };
    const newJob = new TTSJob(jobData);
    await newJob.save();
    console.log('TTS+Translate job created:', newJob);
    res.json({ success: true, job: newJob });
  } catch (error) {
    console.error('Error creating TTS+Translate job:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

const getUserTTSJobs = async (req, res) => {
  try {
    const userId = req.user._id;
    const jobs = await TTSJob.find({ userId }).sort({ createdAt: -1 });
    res.json({ success: true, jobs });
  } catch (error) {
    console.error('Error fetching TTS jobs:', error);
    res.status(500).json({ success: false, message: 'Error fetching TTS jobs' });
  }
};

export {getTTS, getVoices, createTTSJobWithTranslation, getUserTTSJobs};