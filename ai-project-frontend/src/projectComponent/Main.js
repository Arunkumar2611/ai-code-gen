import React, { useState } from "react";
import { Container, Box } from "@mui/material";
import ProjectForm from "./ProjectForm";
import LogDisplay from "./LogDisplay";


const Main = () => {
  const [logs, setLogs] = useState([]);

  return (
    <Container maxWidth="md">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4, paddingTop: 4 }}>
        <ProjectForm setLogs={setLogs} />
        <LogDisplay logs={logs} />
      </Box>
    </Container>
  );
};

export default Main;
