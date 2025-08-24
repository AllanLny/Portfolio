# Portfolio – Allan Lannoy

[![Website](https://img.shields.io/website?down_color=red&down_message=offline&up_color=green&up_message=online&url=https%3A%2F%2Fallan-lannoy-portfolio.vercel.app)](https://allan-lannoy-portfolio.vercel.app)
[![Stars](https://img.shields.io/github/stars/AllanLny/Portfolio?style=social)](https://github.com/AllanLny/Portfolio/stargazers)
[![Forks](https://img.shields.io/github/forks/AllanLny/Portfolio?style=social)](https://github.com/AllanLny/Portfolio/network/members)
[![Pull Requests](https://img.shields.io/github/issues-pr/AllanLny/Portfolio)](https://github.com/AllanLny/Portfolio/pulls)
[![Issues](https://img.shields.io/github/issues/AllanLny/Portfolio)](https://github.com/AllanLny/Portfolio/issues)
[![Contributors](https://img.shields.io/github/contributors/AllanLny/Portfolio)](https://github.com/AllanLny/Portfolio/graphs/contributors)
[![License](https://img.shields.io/github/license/AllanLny/Portfolio)](https://github.com/AllanLny/Portfolio/blob/master/LICENSE)

[![Docker Build & Push](https://github.com/AllanLny/Portfolio/actions/workflows/docker-build.yml/badge.svg)](https://github.com/AllanLny/Portfolio/actions/workflows/docker-build.yml)
[![Lint](https://github.com/AllanLny/Portfolio/actions/workflows/verify-linter.yaml/badge.svg)](https://github.com/AllanLny/Portfolio/actions/workflows/verify-linter.yaml)

Bienvenue sur mon portfolio DevOps & FullStack !  
Ce projet met en avant mes compétences en développement web moderne, CI/CD, conteneurisation, cloud et automatisation.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=fff)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=fff)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=fff)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=fff)
![Vercel](https://img.shields.io/badge/Vercel-000?style=for-the-badge&logo=vercel&logoColor=fff)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=fff)
![EmailJS](https://img.shields.io/badge/EmailJS-4A90E2?style=for-the-badge&logo=email&logoColor=fff)
[![Docker Image Version](https://img.shields.io/badge/GitHub%20Container%20Registry-latest-blue?logo=docker)](https://github.com/AllanLny/Portfolio/pkgs/container/portfolio)


---

##  Aperçu

- **Stack Frontend** : React 18, Vite, SCSS, TanStack Query
- **CI/CD** : GitHub Actions (lint, build, déploiement Docker & Vercel)
- **Conteneurisation** : Docker multi-stage, Nginx
- **Déploiement** : Vercel (prod), GitHub Container Registry (image Docker)
- **Qualité** : ESLint, tests automatisés (à venir)
- **Effets UI** : Liquid glass, animations, responsive design

---

##  Installation & développement

```bash
git clone https://github.com/AllanLny/Portfolio.git
cd Portfolio
cp .env.example .env 
npm install
npm run dev
```

Accédez à [http://localhost:8080](http://localhost:8080)

---

##  Variables d'environnement

Créez un fichier `.env` à la racine :

```
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
VITE_EMAILJS_PUBLIC_KEY=...
```

---

##  Build & exécution Docker

**Build de l'image :**
```bash
docker build -t allan-portfolio .
```

**Lancer le conteneur :**
```bash
docker run -p 8080:80 allan-portfolio
```

---

##  Stack DevOps

- **CI/CD** : Automatisation via [GitHub Actions](.github/workflows/docker-build.yml) et [déploiement Vercel](.github/workflows/deploy-frontend.yml)
- **Docker** : Build multi-stage, image optimisée, Nginx custom ([Dockerfile](Dockerfile), [nginx.conf](nginx.conf))
- **Monitoring** : Vercel Analytics
- **Sécurité** : Headers HTTP, gestion des secrets via GitHub Actions, .env non versionné

---

## Architecture CI/CD

<img src="docs/cicd-architecture.png" alt="Architecture CI/CD" width="150"/>

##  Structure du projet

```
.
├── public/           # Fichiers statiques (robots.txt, sitemap.xml, images, CV)
├── src/              # Code source React
│   ├── components/   # Composants UI
│   ├── pages/        # Pages principales
│   ├── api/          # Appels API (mock)
│   ├── data/         # Données statiques (projets, recommandations)
│   └── styles/       # Styles globaux SCSS
├── .github/workflows # Workflows CI/CD
├── Dockerfile        # Build et exécution Docker
├── nginx.conf        # Configuration Nginx custom
├── vite.config.ts    # Config Vite
└── README.md
```

---

## Déploiement

- **Production** : [allan-lannoy-portfolio.vercel.app](https://allan-lannoy-portfolio.vercel.app)
- **Docker** : Image publiée sur GitHub Container Registry

---

## Monitoring & observabilité

- **Vercel Analytics** : Pour le trafic et la performance

---

## SEO & Accessibilité

- Sitemap et robots.txt générés ([public/sitemap.xml](public/sitemap.xml), [public/robots.txt](public/robots.txt))
- Métadonnées SEO, Open Graph, Twitter Card
- Responsive design

---

## Auteur

**Allan Lannoy**  
[LinkedIn](https://www.linkedin.com/in/allanlannoy/) • [GitHub](https://github.com/AllanLny)

---

## Licence

Ce projet est open source sous licence MIT.
