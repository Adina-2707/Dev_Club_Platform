import { findAllProjects, findProjectById } from '../models/project.model.js';

export const getProjects = async (req, res) => {
  try {
    const projects = await findAllProjects();
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Unable to load projects' });
  }
};

export const getProjectById = async (req, res) => {
  const projectId = Number(req.params.id);

  try {
    const project = await findProjectById(projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ message: 'Unable to load project details' });
  }
};
