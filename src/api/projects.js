import projectsData from '../data/project.json';

// Cache des projets pour éviter les requêtes inutiles
let cachedProjects = null;

export const fetchProjects = async () => {
  // Si déjà en cache, retourne immédiatement
  if (cachedProjects) {
    return Promise.resolve(cachedProjects);
  }
  
  // Simule un délai de chargement
  await new Promise((res) => setTimeout(res, 200));
  
  // Utiliser les projets du JSON
  cachedProjects = projectsData;
  
  return cachedProjects;
};