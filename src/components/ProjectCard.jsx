import { useState } from "react";
import "./ProjectCard.scss";

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
                <li>React</li>
                <li>Node.js</li>
                <li>Docker</li>
                <li>Kubernetes</li>
              </>
            )}
          </ul>
          <button className="view-project">Voir le projet</button>
        </div>
      </div>
    </div>
  );
}
