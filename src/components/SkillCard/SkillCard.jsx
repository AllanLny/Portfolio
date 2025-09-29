import React, { useState } from 'react';
import './SkillCard.scss';

// Ajout de la déclaration du composant fonctionnel et des props
const SkillCard = ({ title, skills }) => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive((prev) => !prev);
  };

  return (
    <div
      className={`project-card skill-card${active ? ' active' : ''}`}
      onClick={handleClick}
      tabIndex={0}
      role="button"
      aria-pressed={active}
      style={{ outline: 'none' }}
    >
      <div className="card-inner">
        <div className="card-front">
          <h3>{title}</h3>
        </div>
        <div className="card-back">
          <ul className="technologies">
            {skills.map((skill, idx) => (
              <li key={idx}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;