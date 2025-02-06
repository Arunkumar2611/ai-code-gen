// src/components/Footer.js
import React, { useState } from 'react';
import { TextField, Button, CircularProgress, Box } from '@mui/material';
import { postOpenAI } from '../services/api'; // Assuming this is the function calling your backend API

const Footer = ({ setConversation, fileLocation, setPromptLoading }) => {
  const [userPrompt, setUserPrompt] = useState('');
  const [loading, setLoading] = useState(false); // State to handle loading

  const handlePromptSubmit = async () => {
    setLoading(true); // Show loader
    setConversation(prevConversation => [
      ...prevConversation,
      { sender: 'user', message: userPrompt },
    ]);

    try {
      const response = await postOpenAI({ projectName: userPrompt, fileLocation });
      const openAIResponse = response.data;
      setConversation(prevConversation => [
        ...prevConversation,
        { sender: 'openAI', message: openAIResponse },
      ]);
    } catch (error) {
      console.error('Error generating response', error);
    } finally {
      setLoading(false); // Hide loader after response
    }
  };

  return (
    <Box sx={{
      display: 'flex',
      padding: 2,
      gap: 5,
      flexDirection: 'row',
      alignItems: 'center',
      position: 'fixed',
      bottom: 0,
      width: '96%',
      boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)'
    }}>
      {/* Full-width text field */}
      <TextField
        label="Your Prompt"
        variant="outlined"
        fullWidth
        value={userPrompt}
        onChange={(e) => setUserPrompt(e.target.value)}
      />

      {/* Submit button with loader */}
      <Box sx={{  }}>
        <Button
          variant="contained"
          size='large'
          onClick={handlePromptSubmit}
          disabled={userPrompt === '' || loading} // Disable button when loading or prompt is empty
          fullWidth
        >
          Submit
        </Button>
        {loading && <CircularProgress sx={{ marginLeft: 2 }} />} {/* Show loader when loading */}
      </Box>
    </Box>
  );
};

export default Footer;
