/* eslint-env node */
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
  ],
  rules: {
    semi: 'error',
    'prefer-const': 'error',
    eqeqeq: 'error',
    'no-unused-vars': 'off',
    'no-console': 'warn',
    'no-debugger': 'warn',
    'prefer-spread': 'error',
    'prefer-object-spread': 'error',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/jsx-key': 'error',
    'react/jsx-no-undef': 'error',
    'react/jsx-pascal-case': 'error',
    'react/jsx-no-target-blank': 'error',
    'react/jsx-no-duplicate-props': 'error',
    'react/jsx-curly-brace-presence': [
      'error',
      { props: 'never', children: 'never' },
    ],
    'react/jsx-equals-spacing': ['error', 'never'],
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
    'react/jsx-no-comment-textnodes': 'error',
    '@typescript-eslint/no-unused-vars': ['error'],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
