// Cache des projets pour éviter les requêtes inutiles
let cachedProjects = null;

export const fetchProjects = async () => {
  // Si déjà en cache, retourne immédiatement
  if (cachedProjects) {
    return Promise.resolve(cachedProjects);
  }
  
  // Simule un délai de chargement
  await new Promise((res) => setTimeout(res, 200));
  
  // Projets avec technologies utilisées
  cachedProjects = [
    {
      id: 1,
      title: "CI/CD Pipeline Kubernetes",
      description: "Mise en place d'une chaîne CI/CD automatisée avec GitHub Actions, Docker et déploiement sur Kubernetes (GKE).",
      image: "/img/devops-cicd.png",
      technologies: ["GitHub Actions", "Docker", "Kubernetes", "Google Cloud", "ArgoCD"]
    },
    {
      id: 2,
      title: "Plateforme SaaS Node.js/React",
      description: "Développement d'une plateforme SaaS scalable avec stack Node.js, React, MongoDB et intégration Stripe.",
      image: "/img/saas-project.png",
      technologies: ["React", "Node.js", "MongoDB", "Stripe API", "AWS", "Redux"]
    },
    {
      id: 3,
      title: "Infrastructure as Code (Terraform)",
      description: "Automatisation du provisioning cloud (AWS, GCP) avec Terraform et Ansible.",
      image: "/img/iac-terraform.png",
      technologies: ["Terraform", "Ansible", "AWS", "Google Cloud", "GitOps", "CI/CD"]
    },
    {
      id: 4,
      title: "Application Mobile React Native",
      description: "Développement d'une application mobile cross-platform avec React Native et Firebase, incluant authentification et notifications push.",
      image: "/img/react-native-app.png",
      technologies: ["React Native", "Firebase", "Redux", "Expo", "Jest", "TypeScript"]
    }
  ];
  
  return cachedProjects;
};