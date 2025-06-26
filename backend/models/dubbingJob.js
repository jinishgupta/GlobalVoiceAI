import mongoose from 'mongoose';

const dubbingJobSchema = new mongoose.Schema({
  jobId: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  projectName: {
    type: String,
    required: true
  },
  originalFile: {
    type: String,
    required: true
  },
  sourceLocale: {
    type: String,
    required: true
  },
  targetLocales: [{
    type: String,
    required: true
  }],
  status: {
    type: String,
    enum: ['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'PARTIALLY_COMPLETED'],
    default: 'PENDING'
  },
  downloadDetails: [{
    locale: String,
    status: String,
    downloadUrl: String,
    cloudinaryUrl: String,
    transcriptUrl: String,
    transcriptText: String,
    errorMessage: String
  }],
  failureReason: String,
  script: {
    type: String,
    default: ''
  },
  ttsAudioUrl: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field on save
dubbingJobSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const DubbingJob = mongoose.model('DubbingJob', dubbingJobSchema);


export default DubbingJob;
