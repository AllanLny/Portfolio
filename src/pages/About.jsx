import Avatar from '../components/Avatar/Avatar';
import SocialLinks from '../components/SocialLinks/SocialLinks';
import { useNavigate } from 'react-router-dom';
import './About.scss';

export default function About() {
  const navigate = useNavigate();
  return (
    <main className="about-container">
      <section className="about-section liquid-glass">
        <div className="liquid-glass-specular"></div>
        <div className="about-content">
          <div className="about-profile">
            <div className="about-header">
            <h2 className="about-title">À propos de moi</h2>
            <p className="about-intro">
              Ingénieur DevOps & Développeur Full-Stack, spécialisé dans <strong>l'orchestration cloud avec Google Cloud Platform</strong> et le développement d'applications web modernes. Autonome et curieux, je valorise le travail en équipe, l'entraide et les échanges techniques.
            </p>
          </div>
          <div>
            <Avatar />
            <SocialLinks />
          </div>
          </div>
          <div className="about-main">
            <section className="about-info">
              <h3>Mon expertise</h3>
              <p>
                Architectures Cloud sur GCP avec Terraform, multi-environnements (dev/préprod/prod), intégration Pub/Sub, Cloud Storage, Cloud Run Functions (Python), BigQuery, IAM, monitoring.
              </p>
              <p>
                Pipelines serverless event-driven, ingestion/transformation de données, solutions SaaS multi-tenant (React, SCSS, FastAPI, PostgreSQL). Philosophie : optimisation et solutions élégantes pour des problèmes concrets.
              </p>
              <h3>Compétences techniques</h3>
              <div className="skills-grid">
                <div className="skill-item">
                <div className=" skill-category">
                  <h4>Cloud & DevOps</h4>
                  <ul>
                    <li>Terraform (IaC)</li>
                    <li>Google Cloud Platform</li>
                    <li>CI/CD (GitHub Actions)</li>
                    <li>Docker</li>
                    <li>GitOps</li>
                    <li>SonarQube</li>
                    <li>FinOps</li>
                    <li>GreenIt</li>
                  </ul>
                </div>
                </div>
                <div className="skill-item">
                <div className=" skill-category">
                  <h4>Développement</h4>
                  <ul>
                    <li>React, SCSS</li>
                    <li>Python</li>
                    <li>Java Spring Boot</li>
                    <li>FastAPI</li>
                    <li>Tests (Jest, JUnit, Cypress)</li>
                  </ul>
                </div>
                </div>
                <div className="skill-item">
                <div className=" skill-category">
                  <h4>Bases de données</h4>
                  <ul>
                    <li>PostgreSQL</li>
                    <li>MongoDB</li>
                    <li>BigQuery</li>
                  </ul>
                </div>
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
                  onClick={() => navigate('/contact')}
                  className="btn-glass"
                >
                  Me contacter
                </button>
                <a 
                  href="/files/Allan_Lannoy_CV_Ingénieur_DevOps_FullStack.pdf" 
                  download="Allan_Lannoy_CV_Ingénieur_DevOps_FullStack.pdf"
                  className="btn-glass"
                >
                  Télécharger mon CV
                </a>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}