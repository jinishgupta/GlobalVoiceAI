import axios from 'axios';
import dotenv from 'dotenv';
import FormData from 'form-data';
import DubbingJob from '../models/dubbingJob.js';
import { audioUploadUtil } from '../cloudinary.js';
dotenv.config();

const dubWithJob = async (req, res) => {
  const { projectName, target_locales, source_locale, priority = 'NORMAL' } = req.body;
  const file = req.file;
  const userId = req.user?._id;

  // Validate required environment variables
  const apiKey = process.env.MURF_DUB_KEY?.trim();

  if (!apiKey) {
    console.error('MURF_DUB_KEY environment variable is not set');
    return res.status(500).json({ success: false, message: 'API key not configured' });
  }

  if (!file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }
  if (!projectName || !target_locales) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  const form = new FormData();
  form.append('file', file.buffer, file.originalname);
  form.append('file_name', projectName);

  const locales = Array.isArray(target_locales) ? target_locales : [target_locales];
  locales.forEach(locale => {
    form.append('target_locales', locale);
  });

  if (source_locale && source_locale !== "Auto-Detect") {
    form.append('source_locale', source_locale);
  }
  form.append('priority', priority);

  const url = 'https://api.murf.ai/v1/murfdub/jobs/create';
  try {
    const response = await axios.post(url, form, {
      headers: {
        "api-key": apiKey,
      },
    });
    if (response.data && response.data.job_id) {
      const jobData = {
        jobId: response.data.job_id,
        userId: userId,
        projectName: projectName,
        originalFile: file.originalname,
        sourceLocale: source_locale || 'Auto-Detect',
        targetLocales: Array.isArray(target_locales) ? target_locales : [target_locales],
        status: 'PENDING'
      };

      try {
        const newJob = new DubbingJob(jobData);
        await newJob.save();
        console.log('Job saved to database:', newJob._id);
      } catch (dbError) {
        console.error('Error saving job to database:', dbError);
      }
    }

    res.json({ success: true, data: response.data });
  } catch (error) {
    console.error('Error making request to Murf API:', error.message);
    if (error.response) {
      console.error('Murf API error response:', error.response.data);
      console.error('Status:', error.response.status);
    }
    return res.status(500).json({
      success: false,
      error: error.response?.data || error.message,
      details: error.response?.status ? `HTTP ${error.response.status}` : 'Network error'
    });
  }
};

const getJobStatus = async (req, res) => {
  const { jobId } = req.params;
  const apiKey = process.env.MURF_DUB_KEY?.trim();

  if (!apiKey) {
    console.error('MURF_DUB_KEY environment variable is not set');
    return res.status(500).json({ success: false, message: 'API key not configured' });
  }

  const url = `https://api.murf.ai/v1/murfdub/jobs/${jobId}/status`;

  try {
    const response = await axios.get(url, {
      headers: {
        "api-key": apiKey,
      },
    });
    console.log('Received job status from Murf API:', response.data);
    const jobData = response.data;

    if (jobData?.job_id) {
      // Fetch the existing job from MongoDB
      const existingJob = await DubbingJob.findOne({ jobId: jobData.job_id });
      let updateData = {
        status: jobData.status,
        updatedAt: Date.now()
      };

      if (jobData.download_details) {
        updateData.downloadDetails = await Promise.all(jobData.download_details.map(async (detail) => {
          // Try to find existing locale details in MongoDB
          let existingLocale = null;
          if (existingJob && existingJob.downloadDetails) {
            existingLocale = existingJob.downloadDetails.find(l => l.locale === detail.locale);
          }
          let cloudinaryUrl = existingLocale?.cloudinaryUrl || null;
          let transcriptUrl = existingLocale?.transcriptUrl || null;
          let transcriptText = existingLocale?.transcriptText || null;
          // Only process if completed and download_url exists and not already uploaded
          if (detail.status === 'COMPLETED' && detail.download_url && !cloudinaryUrl) {
            try {
              const audioResp = await axios.get(detail.download_url, { responseType: 'arraybuffer' });
              const audioBuffer = Buffer.from(audioResp.data, 'binary');
              const uploadResult = await audioUploadUtil("data:audio/mp3;base64," + audioBuffer.toString('base64'));
              cloudinaryUrl = uploadResult.secure_url;
            } catch (e) {
              console.error('Cloudinary upload failed:', e.message);
            }
          }
          // Download transcript if available and not already saved
          if (detail.download_srt_url) {
            transcriptUrl = transcriptUrl || detail.download_srt_url;
            if (!transcriptText) {
              try {
                const transcriptResp = await axios.get(detail.download_srt_url);
                transcriptText = transcriptResp.data;
              } catch (e) {
                transcriptText = null;
              }
            }
          }
          return {
            locale: detail.locale,
            status: detail.status,
            downloadUrl: detail.download_url,
            cloudinaryUrl,
            transcriptUrl,
            transcriptText,
            errorMessage: detail.error_message
          };
        }));
      }

      if (jobData.failure_reason) {
        updateData.failureReason = jobData.failure_reason;
      }

      const updatedJob = await DubbingJob.findOneAndUpdate(
        { jobId: jobData.job_id },
        updateData,
        { new: true }
      );
      
      if(updatedJob) {
           console.log('Job status updated in database:', updatedJob.status);
           return res.json({ success: true, job: updatedJob });
      } else {
           console.warn('Job not found in database to update:', jobData.job_id);
           // Still return the status from the API even if we can't save it
           return res.json({ success: true, job: jobData });
      }
    }
    
    res.json({ success: true, job: jobData });
  } catch (error) {
    console.error('Error fetching job status from Murf API:', error.message);
    if (error.response) {
      console.error('Murf API error response:', error.response.data);
      console.error('Status:', error.response.status);
    }
    return res.status(error.response?.status || 500).json({
      success: false,
      error: error.response?.data || 'Error fetching job status',
    });
  }
};

// Add a function to get user's dubbing jobs
const getUserJobs = async (req, res) => {
  try {
    const userId = req.user._id;
    const jobs = await DubbingJob.find({ userId }).sort({ createdAt: -1 });
    res.json({ success: true, jobs });
  } catch (error) {
    console.error('Error fetching user jobs:', error);
    res.status(500).json({ success: false, message: 'Error fetching jobs' });
  }
};

const getJobById = async (req, res) => {
  const { jobId } = req.params;

  try {
    const job = await DubbingJob.findOne({ jobId });
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    res.json({ success: true, job });
  } catch (error) {
    console.error('Error fetching job by ID:', error);
    res.status(500).json({ success: false, message: 'Error fetching job' });
  }
}

export { dubWithJob, getUserJobs, getJobStatus, getJobById };