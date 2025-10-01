import Avatar from '../components/Avatar/Avatar';
import SocialLinks from '../components/SocialLinks/SocialLinks';
import { useNavigate } from 'react-router-dom';
import './About.scss';
import SkillCard from '../components/SkillCard/SkillCard';

export default function About() {
  const navigate = useNavigate();
  return (
    <main className="about-container" aria-label="À propos de Allan Lannoy Freelance DevOps & FullStack">
      <section className="about-section liquid-glass" aria-label="Présentation et compétences">
        <div className="liquid-glass-specular"></div>
        <div className="about-content">
          <div className="about-profile">
            <div className="about-header">
              <h1 className="about-title">À propos de moi</h1>
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
            <section className="about-info" aria-label="Expertise et valeurs">
              <h3>Mon expertise</h3>
              <p>
                Architectures Cloud sur GCP avec Terraform, multi-environnements (dev/préprod/prod), intégration Pub/Sub, Cloud Storage, Cloud Run Functions (Python), BigQuery, IAM, monitoring.
              </p>
              <p>
                Pipelines serverless event-driven, ingestion/transformation de données, solutions SaaS multi-tenant (React, SCSS, FastAPI, PostgreSQL). Philosophie : optimisation et solutions élégantes pour des problèmes concrets.
              </p>
              <h3>Compétences techniques</h3>
              <div className="projects-grid">
                <SkillCard
                  title="Cloud & DevOps"
                  skills={["Terraform (IaC)", "Google Cloud Platform", "CI/CD (GitHub Actions)", "Docker", "GitOps", "SonarQube", "FinOps", "GreenIt"]}
                />
                <SkillCard
                  title="Développement"
                  skills={["React, SCSS", "Python", "Java Spring Boot", "FastAPI", "Tests (Jest, JUnit, Cypress)"]}
                />
                <SkillCard
                  title="Bases de données"
                  skills={["PostgreSQL", "MongoDB", "BigQuery"]}
                />
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