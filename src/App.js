import React, { useState, useEffect } from 'react';

import Header from './components/Header';
import api from './services/api';

import './App.css';

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setProjects(response.data);
    });
  }, []);

  async function handleAddProject() {
    const response = await api.post('repositories', {
      "title": `Novo repositorio ${Date.now()}`,
      "url": "https://github.com/rafaelhirooka/proffy",
      "techs": ["Node", "React"]
    });

    setProjects([...projects, response.data]);
  }

  return (
    <>
      <Header title="Repositórios" />

      <ul>
        {projects.map(project => <li key={project.id}>{project.title}</li>)}
      </ul>

      <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
    </>
  )
}

export default App;