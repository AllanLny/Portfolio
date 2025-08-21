module.exports = {
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: '2022',
    sourceType: 'module',
    requireConfigFile: false,
    babelOptions: {
      presets: ['@babel/preset-react']
    },
    ecmaFeatures: {
      jsx: true
    }
  },
  ignorePatterns: ['dist/**', 'build/**'],
  env: {
    browser: true,
    es2020: true,
    node: true
  },
  plugins: ['react'],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/no-unescaped-entities': 'off'
  }
};