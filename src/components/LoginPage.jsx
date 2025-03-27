import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ onClose }) => {
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
    rfid: ''
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [savedUser, setSavedUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const cookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith('user='));
    if (cookie) {
      try {
        const savedData = JSON.parse(decodeURIComponent(cookie.split('=')[1]));
        setSavedUser(savedData);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Failed to parse user cookie:', error);
      }
    }
  }, []);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setCookie('user', JSON.stringify(formData), 7);
    setSavedUser(formData);
    setIsLoggedIn(true);
    setEditing(false);
    onClose();
  };

  const handleEdit = () => {
    setFormData(savedUser);
    setEditing(true);
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    setCookie('user', JSON.stringify(formData), 7);
    setSavedUser(formData);
    setEditing(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-center">
          {isLoggedIn ? `Welcome back, ${savedUser?.identifier}!` : 'Login / Create Profile'}
        </h2>

        {!isLoggedIn && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Phone Number / Email</label>
              <input
                type="text"
                name="identifier"
                value={formData.identifier}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">RFID Tag (optional)</label>
              <input
                type="text"
                name="rfid"
                value={formData.rfid}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </form>
        )}

        {isLoggedIn && !editing && (
          <>
            <button
              className="w-full mt-4 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition"
              onClick={handleEdit}
            >
              Edit Profile
            </button>
            <button
              className="w-full mt-2 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
              onClick={() => {
                deleteCookie('user');
                setIsLoggedIn(false);
                setSavedUser(null);
                onClose();
              }}
            >
              Logout
            </button>
          </>
        )}

        {editing && (
          <form onSubmit={handleSaveChanges} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Edit Email / Phone</label>
              <input
                type="text"
                name="identifier"
                value={formData.identifier}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">New Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">RFID Tag (optional)</label>
              <input
                type="text"
                name="rfid"
                value={formData.rfid}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              Save Changes
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
