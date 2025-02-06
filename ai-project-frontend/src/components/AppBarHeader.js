// src/components/AppBarHeader.js
import React from 'react';
import { AppBar, Toolbar, Box, Avatar } from '@mui/material';

const AppBarHeader = () => {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#3f51b5', padding: 2 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box component="img" alt="Logo" sx={{ height: 40 }} />
        <Avatar sx={{ bgcolor: '#1976d2' }}>U</Avatar>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarHeader;
