import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { projectsAPI } from '../services/api';
import '../App.css';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await projectsAPI.getAll();
      setProjects(response.data || []);
    } catch (err) {
      setError(`Unable to load projects: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <h1>Project List</h1>
      <p>Choose a project to explore more details and get started.</p>
      <Link
        to="/"
        style={{
          display: 'inline-block',
          marginBottom: '20px',
          padding: '10px 16px',
          background: '#007bff',
          color: '#fff',
          borderRadius: '5px',
          textDecoration: 'none'
        }}
      >
        Back to Home
      </Link>

      {error && (
        <div style={{ color: 'red', marginBottom: '20px', padding: '10px', background: '#ffe0e0' }}>{error}</div>
      )}

      {loading ? (
        <p>Loading projects...</p>
      ) : projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {projects.map((project) => (
            <div key={project.id} style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', background: '#fafafa' }}>
              <h2 style={{ marginBottom: '10px' }}>{project.title}</h2>
              <p style={{ margin: 0 }}>{project.description}</p>
              <Link to={`/projects/${project.id}`} style={{ display: 'inline-block', marginTop: '12px', color: '#007bff' }}>
                View details
              </Link>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={fetchProjects}
        style={{ marginTop: '20px', padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        Reload Projects
      </button>
    </div>
  );
}
