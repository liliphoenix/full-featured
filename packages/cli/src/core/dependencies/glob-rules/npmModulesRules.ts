const npmModulesGlobRules = [
  'node_modules/*/package.json',
  'node_modules/@*/*/package.json',
  'node_modules/**/node_modules/*/package.json',
  'node_modules/**/node_modules/@*/*/package.json'
]
export { npmModulesGlobRules }
