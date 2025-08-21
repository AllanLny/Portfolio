import { useState } from "react";
import "./ProjectCard.scss";
// Supprime l'import inutilisé de 'fs' qui peut causer des erreurs dans le navigateur
// import { link } from "fs";

export default function ProjectCard({ project }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`project-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-inner">
        <div className="card-front">
          <div className="image-container">
            <img src={project.image} alt={project.title} />
          </div>
          <div className="project-info">
            <h3>{project.title}</h3>
            <p className="description">{project.description}</p>
          </div>
        </div>
        <div className="card-back">
          <h3>Technologies</h3>
          <ul className="technologies">
            {project.technologies ? (
              project.technologies.map((tech, i) => (
                <li key={i}>{tech}</li>
              ))
            ) : (
              <>
              </>
            )}
          </ul>
          {project.link && project.link.length > 0 ? (
            <a 
              href={project.link} 
              className="view-project"
              target="_blank"
              rel="noopener noreferrer"
            >
              Voir le projet
            </a>
          ) : (
            <>
            </>
          )}
          {project.inProgress && <span className="badge in-progress">En cours</span>}
        </div>
      </div>
    </div>
  );
}