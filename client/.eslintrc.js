/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier', '@vue/eslint-config-typescript'],
  rules: {
    'vue/no-unused-vars': 'error'
  },
}
