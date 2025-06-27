import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, updateProfile, changePassword } from '../store/authSlice';
import { Camera, UserCircle2 } from 'lucide-react';

function getInitials(name) {
  return name ? name.charAt(0).toUpperCase() : '?';
}

const Settings = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef();
  const {
    profile,
    profileLoading,
    profileError,
    updateProfileLoading,
    updateProfileError,
    passwordChangeLoading,
    passwordChangeError,
    passwordChangeSuccess
  } = useSelector((state) => state.auth);

  const [userName, setUserName] = useState('');
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setUserName(profile.userName);
      setPreviewUrl(profile.profilePicture || '');
    }
  }, [profile]);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setProfilePicFile(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('userName', userName);
    if (profilePicFile) {
      formData.append('profilePicture', profilePicFile);
    }
    dispatch(updateProfile(formData));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) return;
    dispatch(changePassword({ currentPassword, newPassword }));
  };

  return (
    <div className="max-w-2xl mx-auto p-8 rounded-xl">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Settings</h1>
      {/* Profile Section */}
      <form onSubmit={handleProfileSubmit} className="mb-10 bg-white rounded-2xl p-6 shadow">
        <div className="flex items-center gap-8 mb-6">
          <div className="relative w-28 h-28">
            {previewUrl ? (
              <img src={previewUrl} alt="Profile" className="w-28 h-28 rounded-full object-cover border-4 border-indigo-500 shadow" />
            ) : profile?.userName ? (
              <div className="w-28 h-28 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-4xl font-bold shadow">
                {getInitials(profile.userName)}
              </div>
            ) : (
              <UserCircle2 className="w-28 h-28 text-gray-300" />
            )}
            <button
              type="button"
              className="absolute bottom-2 right-2 bg-white border border-gray-200 rounded-full p-2 shadow hover:bg-gray-100"
              onClick={() => fileInputRef.current.click()}
              title="Change profile picture"
            >
              <Camera className="w-6 h-6 text-indigo-500" />
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleProfilePicChange}
            />
          </div>
          <div>
            <div className="mb-2">
              <label className="block text-gray-600 font-semibold mb-1">Username</label>
              <input
                type="text"
                className="border rounded px-3 py-2 w-56 focus:ring-indigo-500 focus:border-indigo-500"
                value={userName}
                onChange={e => setUserName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 font-semibold mb-1">Email</label>
              <input
                type="email"
                className="border rounded px-3 py-2 w-56 bg-gray-100 text-gray-500 cursor-not-allowed"
                value={profile?.email || ''}
                disabled
              />
            </div>
          </div>
        </div>
        {updateProfileError && <div className="text-red-500 mb-2">{updateProfileError}</div>}
        <button
          type="submit"
          className="bg-gradient-to-r from-indigo-500 to-violet-600 text-white px-6 py-2 rounded font-semibold hover:from-violet-600 hover:to-indigo-500 transition-colors shadow"
          disabled={updateProfileLoading}
        >
          {updateProfileLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>

      {/* Password Section */}
      <form onSubmit={handlePasswordSubmit} className="bg-white rounded-2xl p-6 shadow">
        <h2 className="text-lg font-bold mb-4 text-gray-900">Change Password</h2>
        <div className="mb-4">
          <label className="block text-gray-600 font-semibold mb-1">Current Password</label>
          <input
            type="password"
            className="border rounded px-3 py-2 w-full focus:ring-indigo-500 focus:border-indigo-500"
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-semibold mb-1">New Password</label>
          <input
            type="password"
            className="border rounded px-3 py-2 w-full focus:ring-indigo-500 focus:border-indigo-500"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-semibold mb-1">Confirm New Password</label>
          <input
            type="password"
            className="border rounded px-3 py-2 w-full focus:ring-indigo-500 focus:border-indigo-500"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {newPassword !== confirmPassword && (
          <div className="text-red-500 mb-2">New passwords do not match.</div>
        )}
        {passwordChangeError && <div className="text-red-500 mb-2">{passwordChangeError}</div>}
        {passwordChangeSuccess && <div className="text-green-600 mb-2">{passwordChangeSuccess}</div>}
        <button
          type="submit"
          className="bg-gradient-to-r from-indigo-500 to-violet-600 text-white px-6 py-2 rounded font-semibold hover:from-violet-600 hover:to-indigo-500 transition-colors shadow"
          disabled={passwordChangeLoading || newPassword !== confirmPassword}
        >
          {passwordChangeLoading ? 'Changing...' : 'Change Password'}
        </button>
      </form>
    </div>
  );
};

export default Settings; 