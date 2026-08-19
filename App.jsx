import React, { useState, useEffect } from "react";
import Editor from "./components/Editor";
import Console from "./components/Console";
import Preview from "./components/Preview";
import Tabs from "./components/Tabs";
import StatusBar from "./components/StatusBar";
import { ProjectManager } from "./core/projectManager";
import { runSandbox } from "./core/sandbox";

export default function App() {
  const [projects, setProjects] = useState({});
  const [current, setCurrent] = useState(null);
  const [activeFile, setActiveFile] = useState("html");
  const [logs, setLogs] = useState([]);
  const [saveState, setSaveState] = useState("idle");

  useEffect(() => {
    (async () => {
      const loaded = await ProjectManager.loadProjects();
      if (!Object.keys(loaded).length) {
        loaded["default"] = ProjectManager.createProject("default");
      }
      setProjects(loaded);
      setCurrent("default");
    })();
  }, []);

  const project = projects[current];

  const updateFile = (value) => {
    const updated = {
      ...projects,
      [current]: {
        ...project,
        files: { ...project.files, [activeFile]: value }
      }
    };

    setProjects(updated);
    setSaveState("saving");

    setTimeout(() => {
      ProjectManager.saveProjects(updated);
      setSaveState("saved");
    }, 500);
  };

  const run = () => {
    setLogs([]);
    runSandbox(
      project.files.html,
      project.files.css,
      project.files.js,
      (msg) => setLogs(prev => [...prev, msg])
    );
  };

  return (
    <div className="app">
      <Tabs active={activeFile} setActive={setActiveFile} />

      <Editor
        code={project.files[activeFile]}
        lang={activeFile}
        onChange={updateFile}
      />

      <button className="run-btn" onClick={run}>▶ اجرا</button>

      <Preview />
      <Console logs={logs} />

      <StatusBar
        lang={activeFile}
        lines={project.files[activeFile].split("\n").length}
        chars={project.files[activeFile].length}
        saveState={saveState}
      />
    </div>
  );
}
