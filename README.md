# Synergy Font Tool

## Overview
The Synergy Font Tool is a new and improved replacement for the old font tool. It offers enhanced functionality and a more user-friendly interface for managing fonts in your projects.

## Features
- Streamlined font management
- Improved performance
- Support for a wider range of font formats
- Easy integration with existing workflows

## Getting Started

### Prerequisites
- Node.js and npm (Node Package Manager)
- Git

### Installation

1. Install Yarn globally:
   - Using npm:
     ```
     npm install -g yarn
     ```
   - Using Homebrew (macOS):
     ```
     brew install yarn
     ```

2. Clone the repository:
   ```
   git clone git@github.com:lnw-studios/synergy-font-tool.git
   ```

3. Navigate to the project folder:
   ```
   cd synergy-font-tool
   ```

4. Install dependencies:
   ```
   yarn
   ```

5. Start the development server:
   ```
   yarn dev
   ```

### Prettier

Add the Prettier VS Code extension:
- Install from [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

Now, every time you save a file, Prettier will format it based on the rules defined in the Prettier configuration file.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
