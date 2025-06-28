import express from 'express';
import { getTTS, getVoices, createTTSJobWithTranslation, getUserTTSJobs } from './controllers/TTSController.js';
import { getTranslate } from './controllers/TranslateController.js';
import { registerUser, loginUser ,logoutUser, authMiddleware, getProfile, updateProfile, changePassword, googleLogin, verifyEmail } from './controllers/authController.js';
import { dubWithJob, getUserJobs, getJobStatus, getJobById } from './controllers/DubbingController.js';
import multer from 'multer';
import { upload } from './cloudinary.js';

const uploadMulter = multer();
const router = express.Router();

// translation routes
router.post('/tts', getTTS);
router.get('/voices', getVoices);
router.post('/translate',getTranslate);
router.post('/tts-translate-project', authMiddleware, createTTSJobWithTranslation);
router.get('/tts-jobs', authMiddleware, getUserTTSJobs);
 
//dubbing routes
router.post('/dubbing/create', uploadMulter.single('file'),authMiddleware, dubWithJob);
router.get('/dubbing/jobs', authMiddleware, getUserJobs);
router.get('/dubbing/status/:jobId', getJobStatus);
router.get('/dubbing/job/:jobId', authMiddleware, getJobById);

//auth routes
router.post('/signup', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/google-login', googleLogin);
router.get('/verify', verifyEmail);
router.get('/check-auth', authMiddleware, (req, res) => {
    res.json({
        success: true,
        message: "User is authenticated",
        user: {
            email: req.user.email,
            id: req.user._id,
            userName: req.user.userName
        }
    });
});

// User profile routes
router.get('/user/profile', authMiddleware, getProfile);
router.put('/user/profile', authMiddleware, upload.single('profilePicture'), updateProfile);
router.put('/user/password', authMiddleware, changePassword);

export default router;