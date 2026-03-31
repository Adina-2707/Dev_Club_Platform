import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projectsAPI } from '../services/api';
import '../App.css';

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchProject(id);
    }
  }, [id]);

  const fetchProject = async (projectId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await projectsAPI.getById(projectId);
      setProject(response.data);
    } catch (err) {
      setError(`Unable to load project details: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Link to="/projects" style={{ color: '#007bff', textDecoration: 'none' }}>
        ← Back to Projects
      </Link>

      {loading ? (
        <p>Loading project details...</p>
      ) : error ? (
        <div style={{ color: 'red', marginTop: '20px', padding: '10px', background: '#ffe0e0' }}>{error}</div>
      ) : project ? (
        <div style={{ marginTop: '20px', padding: '20px', background: '#fafafa', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h1>{project.title}</h1>
          <p style={{ marginTop: '10px', lineHeight: 1.7 }}>{project.description}</p>

          <section style={{ marginTop: '24px' }}>
            <h2>Goal</h2>
            <p>{project.goal}</p>
          </section>

          <section style={{ marginTop: '20px' }}>
            <h2>Problems</h2>
            <p>{project.problems}</p>
          </section>

          <section style={{ marginTop: '20px' }}>
            <h2>Solutions</h2>
            <p>{project.solutions}</p>
          </section>

          <section style={{ marginTop: '20px' }}>
            <h2>Result</h2>
            <p>{project.result}</p>
          </section>

          <div style={{ marginTop: '20px', color: '#555' }}>
            <strong>Project ID:</strong> {project.id}
          </div>
        </div>
      ) : (
        <p style={{ marginTop: '20px' }}>No project data available.</p>
      )}
    </div>
  );
}
