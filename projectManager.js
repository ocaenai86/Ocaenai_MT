export const ProjectManager = {
  async loadProjects() {
    const raw = await window.storage.get('ocaenai-projects', false);
    return raw?.value ? JSON.parse(raw.value) : {};
  },

  async saveProjects(projects) {
    await window.storage.set('ocaenai-projects', JSON.stringify(projects), false);
  },

  createProject(name) {
    return {
      name,
      files: {
        html: "<h1>Hello OcaenAI</h1>",
        css: "body { background: #0f1115; color: white; }",
        js: "console.log('OcaenAI Ready');"
      }
    };
  }
};
