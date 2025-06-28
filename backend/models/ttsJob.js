import mongoose from 'mongoose';

const ttsJobSchema = new mongoose.Schema({
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
  originalScript: {
    type: String,
    required: true
  },
  translatedScript: {
    type: String,
    required: true
  },
  sourceLocale: {
    type: String,
    required: true
  },
  targetLocale: {
    type: String,
    required: true
  },
  ttsAudioUrl: {
    type: String,
    default: ''
  },
  // --- TTS Customization Options ---
  voiceId: { type: String },
  style: { type: String },
  rate: { type: Number },
  pitch: { type: Number },
  variation: { type: Number },
  multiNativeLocale: { type: String },
  pronunciationDictionary: { type: mongoose.Schema.Types.Mixed },
  // --- End TTS Customization Options ---
  status: {
    type: String,
    enum: ['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED'],
    default: 'PENDING'
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

ttsJobSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const TTSJob = mongoose.model('TTSJob', ttsJobSchema);
export default TTSJob; 