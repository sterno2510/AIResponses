module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true, // Add Jest environment
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
    'import', // This line is fine
    'jest', // Add jest plugin
  ],
  rules: {
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: [
        '**/*.test.js', // Adjust according to your test file patterns
        '**/test/**', // Adjust according to your test directory patterns
      ],
      optionalDependencies: false,
      peerDependencies: false,
    }],
    'react/function-component-definition': [2, {
      namedComponents: 'arrow-function',
      unnamedComponents: 'arrow-function',
    }],
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src'],
      },
    },
  },
};
