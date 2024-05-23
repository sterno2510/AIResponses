module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    'import', // Add this line
  ],
  rules: {
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: [
        '**/test.js', // Adjust according to your test file patterns
        '**/test/**', // Adjust according to your test directory patterns
      ],
      optionalDependencies: false,
      peerDependencies: false,
    }],
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src'],
      },
    },
  },
};
