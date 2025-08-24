import projectsData from '../data/project.json';

let cachedProjects = null;

export const fetchProjects = async () => {
  if (cachedProjects) {
    return Promise.resolve(cachedProjects);
  }
  
  await new Promise((res) => setTimeout(res, 200));
  
  cachedProjects = projectsData;
  
  return cachedProjects;
};