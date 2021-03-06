module.exports = {
  env: {
    commonjs: true,
    browser: true,
    es6: true,// for globals and syntax
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  globals: {
    process: 'readonly',
    __dirname: 'readonly'
  },
}
