// Remplacer par la configuration ci-dessous

import js from '@eslint/js';
import { defineFlatConfig } from 'eslint-define-config';

export default defineFlatConfig([
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        React: true,
        JSX: true,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      // Vos plugins ici
    },
    rules: {
      // Vos règles personnalisées ici
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
    },
  },
]);