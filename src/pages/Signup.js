import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    company: '',
    isAgency: 'yes',
  });
  const [errors, setErrors] = useState({});
  const [profilePic, setProfilePic] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePic(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required.';
    if (!form.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^\d{7,15}$/.test(form.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Enter a valid phone number.';
    }
    if (!form.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!form.email.includes('@')) {
      newErrors.email = 'Email must contain @.';
    }
    if (!form.password) {
      newErrors.password = 'Password is required.';
    } else if (form.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.';
    }
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // Pass data via sessionStorage so Profile can read it
    sessionStorage.setItem('popx_user', JSON.stringify({
      fullName: form.fullName,
      email: form.email,
      profilePic,
    }));
    navigate('/profile');
  };

  return (
    <div className="signup-page page">
      <div className="signup-header">
        <h1 className="signup-title">Create your<br />PopX account</h1>
      </div>

      <div className="signup-form">

        {/* Profile Picture Upload */}
        <div className="pic-upload-group">
          <label className="field-label">Profile Photo</label>
          <div className="pic-upload-row">
            <div className="pic-preview">
              {profilePic ? (
                <img src={profilePic} alt="Profile" className="pic-img" />
              ) : (
                <span className="pic-initials">
                  {form.fullName ? form.fullName[0].toUpperCase() : '?'}
                </span>
              )}
              <label className="pic-cam-btn" htmlFor="pic-input">
                <svg width="12" height="12" fill="#fff" viewBox="0 0 24 24">
                  <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
                  <circle cx="12" cy="13" r="4" fill="#fff"/>
                </svg>
              </label>
              <input
                id="pic-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </div>
            <p className="pic-hint">Tap the camera icon to upload your photo</p>
          </div>
        </div>

        <div className="field-group">
          <label className="field-label">Full Name<span className="required">*</span></label>
          <input
            className={`field-input ${errors.fullName ? 'input-error' : ''}`}
            type="text"
            name="fullName"
            placeholder="Mary Doe"
            value={form.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <span className="error-msg">{errors.fullName}</span>}
        </div>

        <div className="field-group">
          <label className="field-label">Phone number<span className="required">*</span></label>
          <input
            className={`field-input ${errors.phone ? 'input-error' : ''}`}
            type="tel"
            name="phone"
            placeholder="+91 99999 00000"
            value={form.phone}
            onChange={handleChange}
          />
          {errors.phone && <span className="error-msg">{errors.phone}</span>}
        </div>

        <div className="field-group">
          <label className="field-label">Email address<span className="required">*</span></label>
          <input
            className={`field-input ${errors.email ? 'input-error' : ''}`}
            type="email"
            name="email"
            placeholder="mary@example.com"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error-msg">{errors.email}</span>}
        </div>

        <div className="field-group">
          <label className="field-label">Password<span className="required">*</span></label>
          <input
            className={`field-input ${errors.password ? 'input-error' : ''}`}
            type="password"
            name="password"
            placeholder="Min. 8 characters"
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && <span className="error-msg">{errors.password}</span>}
          {form.password && !errors.password && (
            <div className="password-strength">
              <div
                className="strength-bar"
                style={{
                  width: form.password.length >= 12 ? '100%' : form.password.length >= 8 ? '60%' : '30%',
                  background: form.password.length >= 12 ? '#22c55e' : form.password.length >= 8 ? '#f59e0b' : '#ef4444',
                }}
              />
              <span className="strength-label">
                {form.password.length >= 12 ? 'Strong' : form.password.length >= 8 ? 'Medium' : 'Weak'}
              </span>
            </div>
          )}
        </div>

        <div className="field-group">
          <label className="field-label">Company name</label>
          <input
            className="field-input"
            type="text"
            name="company"
            placeholder="Your company (optional)"
            value={form.company}
            onChange={handleChange}
          />
        </div>

        <div className="field-group">
          <label className="field-label">Are you an Agency?<span className="required">*</span></label>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="isAgency"
                value="yes"
                checked={form.isAgency === 'yes'}
                onChange={handleChange}
              />
              <span className="radio-custom" />
              Yes
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="isAgency"
                value="no"
                checked={form.isAgency === 'no'}
                onChange={handleChange}
              />
              <span className="radio-custom" />
              No
            </label>
          </div>
        </div>

        <button className="btn-primary" onClick={handleSubmit}>
          Create Account
        </button>
      </div>
    </div>
  );
};

export default Signup;
