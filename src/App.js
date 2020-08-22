import React, { useState, useEffect } from 'react';

import Header from './components/Header';
import api from './services/api';

import './App.css';

function App() {
  const [repositories, setRepositories] = useState([]);
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      "title": name,
      "url": link,
      "techs": techs
    });

    setRepositories([...repositories, response.data]);
  }

  function handleRemoveRepository(repositoryId) {
    api.delete(`repositories/${repositoryId}`);

    setRepositories(repositories.filter(repository => repository.id != repositoryId));
  }

  return (
    <>
      <Header title="Repositórios" />

      <ul>
        {repositories.map(repostitory => (
          <li key={repostitory.id}>
            {repostitory.title}
            <button type="button" onClick={() => handleRemoveRepository(repostitory.id)}>Remover</button>
          </li>
        ))}
      </ul>

      <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Repository name" />
      <br/>
      <input type="text" value={link} onChange={e => setLink(e.target.value)} placeholder="Repository link" />
      <br/>
      <input type="text" value={techs} onChange={e => setTechs(e.target.value.split(','))} placeholder="Repository techs (separate it with commas)" />
      <br/>
      <button type="button" onClick={handleAddRepository}>Adicionar projeto</button>
    </>
  )
}

export default App;