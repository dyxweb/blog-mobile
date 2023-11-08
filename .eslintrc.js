module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/ban-types': 'warn',
    'react/jsx-key': 'warn'
  },
  ignorePatterns: [
    'config/*.js', 
    'src/assets/iconfont/iconfont.js',
    'babel.config.js',
    'postcss.config.js',
    '.browserslistrc'
  ]
};
