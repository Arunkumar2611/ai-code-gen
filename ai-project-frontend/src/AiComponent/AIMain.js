import React, { useState } from "react";
import PromptInput from "./PromptInput";
import ScriptDisplay from "./ScriptDisplay";

const AIMain = () => {
  const [script, setScript] = useState("");

  return (
    <div>
      <h1>Dynamic Project Generator</h1>
      <PromptInput onScriptGenerated={setScript} />
      {script && <ScriptDisplay script={script} />}
    </div>
  );
};

export default AIMain;
