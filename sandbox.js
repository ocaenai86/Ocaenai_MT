export function runSandbox(html, css, js, onLog) {
  const iframe = document.getElementById("ocaenai-preview");

  const consoleProxy = {
    log: (...args) => onLog(args.join(" "))
  };

  const script = `
    const console = ${JSON.stringify(consoleProxy)};
    try { ${js} } catch(e) { console.log(e.message); }
  `;

  const doc = `
    <!DOCTYPE html>
    <html>
      <head><style>${css}</style></head>
      <body>${html}<script>${script}<\/script></body>
    </html>
  `;

  iframe.srcdoc = doc;
}
