import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BackButton.css';

const BackButton = ({ iconOnly = false }) => {
  const navigate = useNavigate();

  return (
    <button className="back-button" onClick={() => navigate(-1)}>
      ←{!iconOnly && ' Back'}
    </button>
  );
};

export default BackButton;
