import { useQuery } from '@tanstack/react-query';
import { fetchProjects } from '../api/projects';
import ProjectCard from './ProjectCard';
import './Projects.scss';

export default function Projects() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false
  });

  return (
    <section id="projects" className="projects-section">
      <div className="liquid-glass section-container">
        <h2>Projets récents</h2>
        <p className="section-intro">
          Voici une sélection de projets récents sur lesquels j'ai travaillé.
          Chaque projet représente un défi technique unique et des solutions innovantes.
        </p>
        
        <div className="projects-grid">
          {isLoading ? (
            <div className="loading-container">
              <div className="loading-indicator"></div>
              <p>Chargement des projets...</p>
            </div>
          ) : isError ? (
            <p className="error-message">
              Une erreur s'est produite lors du chargement des projets.
            </p>
          ) : (
            data.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
