import React from "react";

export default function Console({ logs }) {
  return (
    <div className="console">
      {logs.map((log, i) => (
        <div key={i} className="console-line">{log}</div>
      ))}
    </div>
  );
}
