import { pool } from '../db.js';

export const initProjectsTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS projects (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      goal TEXT NOT NULL,
      problems TEXT NOT NULL,
      solutions TEXT NOT NULL,
      result TEXT NOT NULL
    );
  `);
};

export const seedProjects = async () => {
  const countResult = await pool.query('SELECT COUNT(*) AS count FROM projects');
  const count = Number(countResult.rows[0].count);

  if (count > 0) {
    return;
  }

  const projects = [
    {
      title: 'Project Alpha',
      description: 'A dashboard for managing key initiatives and tracking progress.',
      goal: 'Create a centralized workspace where teams can monitor project status and key metrics.',
      problems: 'Teams had scattered data across tools, unclear status updates, and no single source of truth.',
      solutions: 'Built a dashboard with project cards, progress indicators, and real-time updates.',
      result: 'Teams could quickly understand priorities and reduce status meetings by 40%.'
    },
    {
      title: 'Project Beta',
      description: 'A mobile-friendly collaboration platform for remote teams.',
      goal: 'Provide a seamless way for distributed teams to communicate and track work on mobile devices.',
      problems: 'Remote team members struggled with laggy tools and poor mobile support.',
      solutions: 'Designed a responsive app with message threads, tasks, and instant notifications.',
      result: 'Collaboration improved, and remote engagement rose by 30%.'
    },
    {
      title: 'Project Gamma',
      description: 'A lightweight project tracker with deadlines and priorities.',
      goal: 'Help small teams manage work without heavy project management software.',
      problems: 'Existing tools were too complex and required too much setup.',
      solutions: 'Created a simple tracker with drag-and-drop priorities and deadline reminders.',
      result: 'Teams completed more work on time and reduced planning overhead.'
    }
  ];

  for (const project of projects) {
    await pool.query(
      `INSERT INTO projects (title, description, goal, problems, solutions, result)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [project.title, project.description, project.goal, project.problems, project.solutions, project.result]
    );
  }
};

export const findAllProjects = async () => {
  const result = await pool.query('SELECT id, title, description FROM projects ORDER BY id');
  return result.rows;
};

export const findProjectById = async (id) => {
  const result = await pool.query(
    'SELECT id, title, description, goal, problems, solutions, result FROM projects WHERE id = $1',
    [id]
  );
  return result.rows[0];
};
