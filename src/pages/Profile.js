import React, { useRef, useState } from 'react';
import './Profile.css';

const Profile = () => {
  const fileInputRef = useRef(null);

  // Load user data saved during signup (if any)
  const saved = JSON.parse(sessionStorage.getItem('popx_user') || '{}');

  const [profilePic, setProfilePic] = useState(saved.profilePic || null);
  const [name] = useState(saved.fullName || 'Mary Doe');
  const [email] = useState(saved.email || 'Marydoe@email.com');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        // Update session storage too
        const updated = { ...saved, profilePic: reader.result };
        sessionStorage.setItem('popx_user', JSON.stringify(updated));
      };
      reader.readAsDataURL(file);
    }
  };

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="profile-page page">
      {/* Top bar */}
      <div className="profile-topbar">
        <h2 className="topbar-title">Account Settings</h2>
      </div>

      {/* User info row */}
      <div className="profile-user-row">
        <div className="profile-avatar-wrap">
          <div className="profile-avatar">
            {profilePic ? (
              <img src={profilePic} alt="Profile" className="profile-pic-img" />
            ) : (
              <span>{initials}</span>
            )}
          </div>
          <div
            className="profile-avatar-cam"
            onClick={() => fileInputRef.current.click()}
            title="Change photo"
          >
            <svg width="11" height="11" fill="#fff" viewBox="0 0 24 24">
              <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
              <circle cx="12" cy="13" r="4" fill="#fff"/>
            </svg>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </div>

        <div className="profile-user-info">
          <p className="profile-name">{name}</p>
          <p className="profile-email">{email}</p>
        </div>
      </div>

      {/* Divider */}
      <div className="profile-divider" />

      {/* Bio text */}
      <div className="profile-bio">
        <p>
          Lorem ipsum dolor sit amet, Consectetur adipiscing elit, Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Enim
          Quet Sed Diam.
        </p>
      </div>
    </div>
  );
};

export default Profile;
