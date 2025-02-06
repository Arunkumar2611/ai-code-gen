import React from "react";
import { Box, Paper, Typography } from "@mui/material";

const LogDisplay = ({ logs }) => {
  return (
    <Paper sx={{ height: 200, overflowY: "auto", padding: 2, backgroundColor: "#f4f4f4" }}>
      {logs.map((log, index) => (
        <Typography key={index} variant="body2">{log}</Typography>
      ))}
    </Paper>
  );
};

export default LogDisplay;
