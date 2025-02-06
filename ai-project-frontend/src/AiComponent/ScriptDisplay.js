import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const ScriptDisplay = ({ script }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Generated Script:</Typography>
        <pre>{script}</pre>
      </CardContent>
    </Card>
  );
};

export default ScriptDisplay;
