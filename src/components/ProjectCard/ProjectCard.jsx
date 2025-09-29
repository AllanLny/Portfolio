import "./ProjectCard.scss";

export default function ProjectCard({ project, isActive, onActivate }) {

  return (
    <div
      className={`project-card${isActive ? ' active' : ''}`}
      onClick={onActivate}
    >
      <div className="card-inner">
        <div className="card-front">
          <div className="image-container">
            {project.image && (
              <picture>
                <source srcSet={project.image.optimized} type="image/webp" />
                <img src={project.image.fallback} alt={project.title} loading="lazy" />
              </picture>
            )}
          </div>
          <div className="project-info">
            <h3>{project.title}</h3>
            <p className="description">{project.description}</p>
          </div>
        </div>
        <div className="card-back">
          <h3>Technologies</h3>
          <ul className="technologies">
            {project.technologies && project.technologies.length > 0 
              ? project.technologies.map((tech, i) => (
                  <li key={i}>{tech}</li>
                ))
              : null
            }
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
          ) : null}
          {project.inProgress && <span className="badge in-progress">En cours</span>}
        </div>
      </div>
    </div>
  );
}