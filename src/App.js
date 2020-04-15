import React, { useState, useEffect } from "react";
import api from "services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(r => {
      setRepositories(r.data);
    })
  }, []);

  async function handleAddRepository() {
    const data = {
      title: `Repositório ${Date.now()}`,
      url: 'https://github.com/CaiqueRibeiro',
      techs: ['ReactJs', 'React Native', 'NodeJS']
    }

    const response = await api.post('repositories', data);

    const repository = response.data;

    setRepositories([...repositories, repository]);

  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    
    const newRep = repositories.filter(repository => repository.id !== id);

      setRepositories([...newRep]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(rep => (
          <li key={rep.id}>
            {rep.title}
            <button onClick={() => handleRemoveRepository(rep.id)}>
              Remover
          </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
