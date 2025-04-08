import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BackButton from '../components/BackButton';
import '../styles/Feedback.css';
import { submitFeedback } from '../utils/apis/user.api';

function Feedback() {
  const [feedback, setFeedback] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const cookie = document.cookie.split('; ').find((row) => row.startsWith('user='));
    if (cookie) {
      const userData = JSON.parse(decodeURIComponent(cookie.split('=')[1]));
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    }

    if (location.state && location.state.savedFeedback) {
      setFeedback(location.state.savedFeedback);
    }
  }, [location.state]);

  const handleSubmit = async () => {
    if (!user) {
      navigate('/profile', {
        state: { fromFeedback: true, savedFeedback: feedback },
      });
      return;
    }

    try {
      await submitFeedback({ userId: user.identifier, feedback });
      alert('Feedback submitted successfully!');
      setFeedback(""); // ✅ Clears only after successful submit
    } catch (err) {
      console.error("Feedback submission failed:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="feedback-page">
      <div className="top-left-button">
        <BackButton iconOnly />
      </div>
      <h1>Submit Feedback</h1>
      <textarea
        className="feedback-input"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Enter your feedback here..."
      ></textarea>
      <button
        className="feedback-submit-button"
        onClick={handleSubmit}
        disabled={feedback.trim() === ""}
      >
        Submit
      </button>
    </div>
  );
}

export default Feedback;