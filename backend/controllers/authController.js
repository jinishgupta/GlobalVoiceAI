import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import { imageUploadUtil } from '../cloudinary.js'

//register
const registerUser = async (req, res) => {
    console.log("Request body:", req.body);
    const { userName, email, password } = req.body;

    
    // Validate required fields
    const missingFields = [];
    if (!userName) missingFields.push('userName');
    if (!email) missingFields.push('email');
    if (!password) missingFields.push('password');

    if (missingFields.length > 0) {
        console.log("Validation failed - Missing fields:", missingFields);
        return res.status(400).json({
            success: false,
            message: `Please provide ${missingFields.join(', ')}`
        });
    }

    try {
        const checkUser = await User.findOne({ email });
        if(checkUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists with same email"
            });
        }

        const hashPassword = await bcrypt.hash(password,12);
        const newUser = new User({
            userName,
            email,
            password: hashPassword
        });
        await newUser.save();
        res.status(200).json({
            success: true,
            message: "Registration successful"
        });

    } catch(e) {
        console.error("Registration error:", e);
        const errorMessage = e.message || "Some error occurred";
        res.status(500).json({
            success: false,
            message: errorMessage
        });
    }
}

//login

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try{
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({
                success: false,
                message: "User does not exist with this email"
            });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid password"
            });
        }
        const token = jwt.sign({ id: user._id, email: user.email, userName: user.userName}, 'CLIENT_SECRET_KEY', { expiresIn: '240m' });
        res.cookie('token', token, { httpOnly: true, secure: false }).json({
            success: true,
            message: "Login successful",
            user: {
                email: user.email,
                id: user._id,
                userName: user.userName
            }
        });

    } catch(e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message:"Some error occured"
        });
    }
}

//logout

const logoutUser = async (req, res) => {
    try {
        console.log("Logging out user");
        res.clearCookie('token').json({
            success: true,
            message: "Logout successful"
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occurred"
        });
    }
}

//middleware

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized user!"
        });
    }
    try {
        const decoded = jwt.verify(token, 'CLIENT_SECRET_KEY');
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (e) {
        console.log(e);
        return res.status(401).json({
            success: false,
            message: "Unauthorized user!"
        });
    }
}

// Get user profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update profile (username, profilePicture)
const updateProfile = async (req, res) => {
  try {
    const { userName } = req.body;
    let update = {};
    if (userName) update.userName = userName;
    if (req.file) {
      // Upload image to Cloudinary
      const uploadResult = await imageUploadUtil("data:image/png;base64," + req.file.buffer.toString('base64'));
      update.profilePicture = uploadResult.secure_url;
    }
    const user = await User.findByIdAndUpdate(req.user._id, update, { new: true }).select('-password');
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Change password
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: 'Current password is incorrect' });
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export { registerUser, loginUser , logoutUser , authMiddleware, getProfile, updateProfile, changePassword };