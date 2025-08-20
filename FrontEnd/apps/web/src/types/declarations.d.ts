// Ceci est un fichier pour résoudre les problèmes de types avec les imports de modules .jsx dans TypeScript
// Il déclare explicitement les types pour les fichiers .jsx pour éviter les erreurs de compilation TypeScript

// Déclaration pour les fichiers .jsx
declare module "*.jsx" {
  import * as React from "react";
  const component: React.ComponentType<any>;
  export default component;
}

// Déclaration pour différents types de fichiers statiques
declare module "*.jpg";
declare module "*.png";
declare module "*.svg" {
  import * as React from "react";
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
