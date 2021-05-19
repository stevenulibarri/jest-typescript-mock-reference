module.exports = {
  plugins: [
    'jest',
  ],
  extends: [
    'plugin:jest/recommended',
  ],
  rules: {
    '@typescript-eslint/unbound-method': 'off'
  }
};
