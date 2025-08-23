import './About.scss';
import { useNavigate } from 'react-router-dom';

export default function About() {
  const navigate = useNavigate();
  
  const navigateTo = (path) => {
    navigate(`/${path}`);
  };
  
  return (
    <section className="about-section">
      <div className="liquid-glass about-container">
        <h2>À propos de moi</h2>
        
        <div className="about-content">
          <div className="about-image-container">
            <picture>
              <source srcSet="/img/avatar.webp" type="image/webp" />
              <source srcSet="/img/avatar.avif" type="image/avif" />
              <img 
                src="/img/avatar.png" 
                alt="Allan Lannoy" 
                className="about-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/img/avatar-placeholder.svg';
                }}
              />
            </picture>
            <div className="image-decoration"></div>
          </div>
          
          <div className="about-text">
            <p className="about-intro">
              Ingénieur DevOps & Développeur Full-Stack, je suis spécialisé dans <strong>l'orchestration cloud avec Google Cloud Platform</strong> et le développement d'applications web modernes. Autonome et curieux, je valorise le travail en équipe, l'entraide et les échanges techniques.
            </p>
            
            <div className="about-info">
              <h3>Mon expertise</h3>
              <p>
                Je conçois et déploie des architectures Cloud complètes sur GCP avec Terraform, couvrant plusieurs environnements (dev/préprod/prod). Mon expérience inclut l'intégration de services comme Pub/Sub, Cloud Storage, Cloud Run Functions avec Python, BigQuery, IAM, et les systèmes de monitoring.
              </p>
              <p>
                J'ai orchestré des pipelines serverless event-driven pour l'ingestion et la transformation de données, et développé des solutions SaaS multi-tenant avec React, SCSS, FastAPI et PostgreSQL. Ma philosophie est centrée sur l'optimisation des processus et la création de solutions élégantes qui résolvent des problèmes concrets.
              </p>
              
              <h3>Compétences techniques</h3>
              <div className="skills-grid">
                <div className="skill-category">
                  <h4>Cloud & DevOps</h4>
                  <ul>
                    <li>Terraform (IaC)</li>
                    <li>Google Cloud Platform</li>
                    <li>CI/CD (GitHub Actions)</li>
                    <li>Docker</li>
                    <li>GitOps</li>
                    <li>SonarQube</li>
                  </ul>
                </div>
                <div className="skill-category">
                  <h4>Développement</h4>
                  <ul>
                    <li>React, SCSS</li>
                    <li>Python</li>
                    <li>Java Spring Boot</li>
                    <li>FastAPI</li>
                    <li>Tests (Jest, JUnit, Cypress)</li>
                  </ul>
                </div>
                <div className="skill-category">
                  <h4>Bases de données</h4>
                  <ul>
                    <li>PostgreSQL</li>
                    <li>MongoDB</li>
                    <li>BigQuery</li>
                  </ul>
                </div>
              </div>
              
              <h3>Mes valeurs</h3>
              <ul className="values-list">
                <li>
                  <span className="value-text">Curiosité technologique et apprentissage continu</span>
                </li>
                <li>
                  <span className="value-text">Collaboration et communication transparente</span>
                </li>
                <li>
                  <span className="value-text">Architecture modulaire et réutilisable</span>
                </li>
                <li>
                  <span className="value-text">Mise en production sécurisée et contrôlée</span>
                </li>
              </ul>
              
              <div className="about-cta">
                <button 
                  onClick={() => navigateTo('contact')}
                  className="cta-button"
                >
                  Me contacter
                </button>
                <a 
                  href="/files/Allan_Lannoy_CV_Ingénieur_DevOps_FullStack.pdf" 
                  download="Allan_Lannoy_CV_Ingénieur_DevOps_FullStack.pdf"
                  className="cta-button secondary"
                >
                  Télécharger mon CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}