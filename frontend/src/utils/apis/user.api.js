export const submitFeedback = async ({ userId, feedback }) => {
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, feedback }),
      });
      return response.json();
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };
  