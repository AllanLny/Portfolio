import { useQuery } from '@tanstack/react-query';
import { fetchProjects } from '../../api/projects';
import { useState } from 'react';
import ProjectCard from '../ProjectCard/ProjectCard';
import './Projects.scss';

export default function Projects() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false
  });

  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section id="projects" className="projects-section">
      <div className="liquid-glass section-container">
        <div className="liquid-glass-specular"></div>
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
            data.map((project, i) => (
              <ProjectCard
                key={i}
                project={project}
                isActive={activeIndex === i}
                onActivate={() => setActiveIndex(activeIndex === i ? null : i)}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
