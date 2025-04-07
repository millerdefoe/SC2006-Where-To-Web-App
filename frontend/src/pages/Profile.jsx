import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BackButton from '../components/BackButton';
import '../styles/Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [view, setView] = useState(null);
  const [formData, setFormData] = useState({ identifier: '', password: '', rfid: '' });
  const [accountExists, setAccountExists] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [savedUser, setSavedUser] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const cookie = document.cookie.split('; ').find((row) => row.startsWith('user='));
    if (cookie) {
      const userData = JSON.parse(decodeURIComponent(cookie.split('=')[1]));
      setAccountExists(true);
      setSavedUser(userData);
      setIsLoggedIn(true);
      localStorage.setItem('user', JSON.stringify(userData));
    }
  }, []);

  const isValidIdentifier = (identifier) => {
    const phoneRegex = /^\d{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return phoneRegex.test(identifier) || emailRegex.test(identifier);
  };

  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const setCookie = (name, value, days) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
  };

  const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  const validateAndSubmit = (e, action) => {
    e.preventDefault();
    if (!isValidIdentifier(formData.identifier)) {
      alert("Please enter a valid phone number (8+ digits) or email address.");
      return;
    }
    if (!isValidPassword(formData.password)) {
      alert("Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, and a number.");
      return;
    }
    if (action === 'create') {
      setCookie('user', JSON.stringify(formData), 7);
      setSavedUser(formData);
      setIsLoggedIn(true);
      setAccountExists(true);
      localStorage.setItem('user', JSON.stringify(formData));
      if (location.state && location.state.fromFeedback) {
        navigate('/feedback', { state: { savedFeedback: location.state.savedFeedback } });
      } else {
        setView(null);
      }
    } else if (action === 'login') {
      if (!accountExists) {
        alert('No account found. Please create an account first.');
        return;
      }
      if (
        formData.identifier === savedUser?.identifier &&
        formData.password === savedUser?.password
      ) {
        setIsLoggedIn(true);
        localStorage.setItem('user', JSON.stringify(savedUser));
        if (location.state && location.state.fromFeedback) {
          navigate('/feedback', { state: { savedFeedback: location.state.savedFeedback } });
        } else {
          setView(null);
        }
      } else {
        alert('Invalid credentials.');
      }
    }
  };

  const handleLogout = () => {
    deleteCookie('user');
    localStorage.removeItem('user');
    setSavedUser(null);
    setIsLoggedIn(false);
    setAccountExists(false);
    setView(null);
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    setCookie('user', JSON.stringify(formData), 7);
    setSavedUser(formData);
    localStorage.setItem('user', JSON.stringify(formData));
    setEditing(false);
  };

  return (
    <div className="profile-page">
      <div className="top-left-button">
        <BackButton iconOnly />
      </div>
      <div className="profile-container">
        {!isLoggedIn && !view && (
          <div className="profile-intro">
            <h2>Welcome to Profile</h2>
            <div className="button-row">
              <button onClick={() => setView('login')} className="btn green">Login</button>
              <button onClick={() => setView('create')} className="btn blue">Create Account</button>
            </div>
          </div>
        )}

        {view && (
          <form onSubmit={(e) => validateAndSubmit(e, view)} className="profile-form">
            <h2>{view === 'login' ? 'Login' : 'Create Account'}</h2>
            <label>Phone Number / Email</label>
            <input type="text" name="identifier" value={formData.identifier} onChange={handleChange} required />
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            <label>RFID Tag (optional)</label>
            <input type="text" name="rfid" value={formData.rfid} onChange={handleChange} />
            <button type="submit" className="btn blue">{view === 'login' ? 'Login' : 'Create Account'}</button>
          </form>
        )}

        {isLoggedIn && !editing && (
          <div className="profile-details">
            <h2>Welcome back, {savedUser?.identifier}!</h2>
            <p>RFID: {savedUser?.rfid || 'Not set'}</p>
            <div className="button-row">
              <button onClick={() => setEditing(true)} className="btn yellow">Edit Profile</button>
              <button onClick={handleLogout} className="btn red">Logout</button>
            </div>
          </div>
        )}

        {isLoggedIn && editing && (
          <form onSubmit={handleSaveChanges} className="profile-form">
            <h2>Edit Your Details</h2>
            <label>Phone Number / Email</label>
            <input type="text" name="identifier" value={formData.identifier} onChange={handleChange} required />
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            <label>RFID Tag (optional)</label>
            <input type="text" name="rfid" value={formData.rfid} onChange={handleChange} />
            <button type="submit" className="btn green">Save Changes</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
