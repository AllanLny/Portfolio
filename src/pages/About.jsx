import './About.scss';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function About() {
  // Utiliser le hook navigate de React Router
  const navigate = useNavigate();
  
  return (
    <section className="about-section">
      <div className="liquid-glass about-container">
        <h2>À propos de moi</h2>
        
        <div className="about-content">
          <div className="about-image-container">
            <img 
              src="/img/avatar.png" 
              alt="Allan Lannoy" 
              className="about-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/img/avatar-placeholder.png';
              }}
            />
            <div className="image-decoration"></div>
          </div>
          
          <div className="about-text">
            <p className="about-intro">
              Passionné par les technologies modernes, je suis un <strong>ingénieur DevOps et développeur Full-Stack</strong> spécialisé dans les solutions cloud et l'automatisation.
            </p>
            
            <div className="about-info">
              <h3>Mon parcours</h3>
              <p>
                Après plusieurs années de formation intensive en développement web et DevOps, j'ai acquis une expertise dans la conception d'architectures cloud robustes et évolutives, particulièrement sur Google Cloud Platform. Je me spécialise dans l'implémentation de pipelines CI/CD, l'Infrastructure as Code (Terraform) et le développement d'applications web modernes avec React.
              </p>
              <p>
                Ma philosophie est centrée sur l'optimisation des processus, l'automatisation et la création de solutions élégantes qui résolvent des problèmes concrets. J'accorde une importance particulière à la qualité du code, la sécurité et les bonnes pratiques de développement.
              </p>
              
              <h3>Mes valeurs</h3>
              <ul className="values-list">
                <li>
                  <span className="value-icon">🔄</span>
                  <span className="value-text">Apprentissage continu et curiosité technique</span>
                </li>
                <li>
                  <span className="value-icon">🤝</span>
                  <span className="value-text">Collaboration et communication transparente</span>
                </li>
                <li>
                  <span className="value-icon">🚀</span>
                  <span className="value-text">Innovation et recherche de solutions optimales</span>
                </li>
                <li>
                  <span className="value-icon">⚙️</span>
                  <span className="value-text">Automatisation et efficacité des processus</span>
                </li>
              </ul>
              
              <div className="about-cta">
                <button 
                  onClick={() => navigateTo('contact')}
                  className="cta-button"
                >
                  Me contacter
                </button>
                <button 
                  onClick={() => navigateTo('resume')}
                  className="cta-button secondary"
                >
                  Voir mon CV
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
