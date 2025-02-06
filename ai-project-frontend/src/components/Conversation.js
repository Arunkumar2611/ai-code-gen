    // src/components/Conversation.js
    import React from 'react';
    import { Box, Paper, Typography, Stack, Avatar, Divider } from '@mui/material';

    const Conversation = ({ conversation }) => {
        return (
            <Box sx={{  overflowY: 'auto', padding: 2, marginBottom: 12, border: "2px solid black" }}>
                <Stack spacing={2}>
                    {conversation.map((msg, index) => (
                        <Box key={index} sx={{ display: 'flex', flexDirection: msg.sender === 'openAI' ? 'row' : 'row-reverse', alignItems: 'flex-end' }}>
                            {msg.sender === 'openAI' && (
                                <Avatar sx={{ marginRight: 2 }}>AI</Avatar>
                            )}
                            <Paper
                                sx={{
                                    maxWidth: '100%',
                                    padding: 2,
                                    backgroundColor: msg.sender === 'openAI' ? '#f0f0f0' : '#d3f8e2',
                                    borderRadius: 2,
                                    boxShadow: 2,
                                    wordWrap: 'break-word',
                                    marginRight: msg.sender === 'openAI' ? 2 : 0,
                                    marginLeft: msg.sender === 'user' ? 2 : 0,
                                }}
                            >
                                <Typography variant="body1" color={msg.sender === 'openAI' ? 'textSecondary' : 'textPrimary'}>
                                    {msg.message}
                                </Typography>
                            </Paper>
                            {msg.sender === 'user' && (
                                <Avatar sx={{ marginLeft: 2 }}>You</Avatar>
                            )}
                        </Box>
                    ))}
                </Stack>
            </Box>
        );
    };

    export default Conversation;
