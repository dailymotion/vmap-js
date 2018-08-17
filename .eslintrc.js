module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jasmine: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  globals: {
    readFixtures: false,
  },
  plugins: ['import', 'no-for-of-loops'],
  settings: {
    'import/extensions': ['.js'],
  },
  root: true,
  rules: {
    'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
    'import/named': ['error'],
    'import/no-unresolved': [
      'error',
      {
        commonjs: true,
        amd: true,
      },
    ],
    'import/newline-after-import': ['warn'],
    'linebreak-style': ['warn', 'unix'],
    'eol-last': ['warn', 'always'],
    'no-console': ['error'],
    'no-else-return': ['error'],
    'no-multi-spaces': [
      'warn',
      {
        exceptions: { VariableDeclarator: true, ImportDeclaration: true },
      },
    ],
    'no-trailing-spaces': ['warn'],
    'no-var': ['error'],
    'no-undef': ['error'],
    'no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', ignoreRestSiblings: true, args: 'after-used' },
    ],
    'no-for-of-loops/no-for-of-loops': ['error'],
    'object-shorthand': ['warn'],
    'prefer-template': ['warn'],
    'prefer-const': ['warn'],
    'prefer-rest-params': ['error'],
    'prefer-spread': ['warn'],
    'space-before-function-paren': ['warn', 'never'],
  },
}
