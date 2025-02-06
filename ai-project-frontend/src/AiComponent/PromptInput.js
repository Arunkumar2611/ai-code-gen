import React, { useState } from "react";
import { TextField, Button, Container } from "@mui/material";
import axios from "axios";

const PromptInput = ({ onScriptGenerated }) => {
    const [prompt, setPrompt] = useState("");

    const handleSubmit = async () => {
        const response = await axios.post("http://localhost:8000//generate-script/", { prompt });
        onScriptGenerated(response.data.script);
    };

    return (
        <Container>
            <TextField
                label="Enter your project prompt"
                fullWidth
                variant="outlined"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Generate Script
            </Button>
        </Container>
    );
};

export default PromptInput;
