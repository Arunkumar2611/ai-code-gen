import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";

const ProjectForm = ({ setLogs }) => {
  const [destination, setDestination] = useState("");
  const [projectName, setProjectName] = useState("");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFolderSelect = async () => {
    try {
      const folderHandle = await window.showDirectoryPicker();
      const folderPath = folderHandle.name; // This is just the folder's name
      setDestination(folderPath); // Storing the folder name for display
        console.log(folderPath, folderHandle);
      setLogs((prev) => [...prev, `📂 Destination set: ${folderPath}`]);
  
      // Send the full path (not just the name)
      await axios.post("http://localhost:5000/select-folder", { destinationPath: folderHandle });
    } catch (error) {
      setLogs((prev) => [...prev, "❌ Folder selection cancelled"]);
    }
  };
  

  const handleSubmit = async () => {
    console.log(destination, projectName, prompt);
    if (!destination || !projectName || !prompt) {
      setLogs((prev) => [...prev, "❌ All fields are required!"]);
      return;
    }

    setLogs((prev) => [...prev, `🚀 Creating project: ${projectName}...`]);
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/create-project", { projectName, prompt, destination });
      setLogs((prev) => [...prev, `✅ Project Created: ${response.data.message}`]);
    } catch (error) {
      setLogs((prev) => [...prev, `❌ Error: ${error.response?.data?.error || "Unknown error"}`]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
      <Button variant="contained" onClick={handleFolderSelect}>
        Select Destination
      </Button>

      {destination && <Typography>📂 Selected Folder: {destination}</Typography>}

      <TextField 
        label="Project Name" 
        fullWidth 
        disabled={!destination} 
        onChange={(e) => setProjectName(e.target.value)} 
      />

      <TextField 
        label="Prompt" 
        fullWidth 
        multiline 
        rows={4} 
        disabled={!destination} 
        onChange={(e) => setPrompt(e.target.value)} 
      />
      
      <Button variant="contained" onClick={handleSubmit} disabled={loading || !destination}>
        {loading ? "Creating..." : "Create Project"}
      </Button>
    </Box>
  );
};

export default ProjectForm;
