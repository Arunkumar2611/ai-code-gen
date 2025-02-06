// src/ProjectCreator.js
import React, { useState } from 'react';
import { Box, CircularProgress, Snackbar } from '@mui/material';
import AppBarHeader from './AppBarHeader';
import Conversation from './Conversation';
import Footer from './Footer';
import { postOpenAI } from '../services/api'; // Assuming this is the function calling your backend API

const ProjectCreator = () => {
  const [projectName, setProjectName] = useState('');
  const [fileLocation, setFileLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [promptLoading, setPromptLoading] = useState(false);

  const handleCreateProject = async () => {
    setLoading(true);
    const userMessage = `Project Name: ${projectName}, File Location: ${fileLocation}`;
    setConversation(prevConversation => [
      ...prevConversation,
      { sender: 'user', message: userMessage },
    ]);

    try {
      const response = await postOpenAI({ projectName, fileLocation });
      const openAIResponse = response.data;
      setConversation(prevConversation => [
        ...prevConversation,
        { sender: 'openAI', message: openAIResponse },
      ]);
      setMessage('Project created successfully!');
    } catch (error) {
      setMessage('Error generating project');
    } finally {
      setLoading(false);
      setOpenSnackbar(true);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Header */}
      <AppBarHeader />

      {/* Body */}
      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
        <Box sx={{ width: '100%', }}>
          <Conversation conversation={conversation} />
        </Box>
      </Box>

      {/* Footer */}
      <Footer setConversation={setConversation} fileLocation={fileLocation} setPromptLoading={setPromptLoading} />

      {loading && <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%' }} />}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={message}
      />
    </Box>
  );
};

export default ProjectCreator;
