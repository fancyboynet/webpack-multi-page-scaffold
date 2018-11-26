const buildConfig = require('../config/build')
const shell = require('shelljs')
const chalk = require('chalk')
if (!buildConfig.reInstallOnPkgChange) {
  shell.exit(0)
}
if (!shell.which('git')) {
  console.log(chalk.red('Sorry, this script requires git.'))
  shell.exit(1)
}
const stdout = shell.exec('git diff-tree -r --name-only --no-commit-id ORIG_HEAD HEAD', { silent: true }).stdout
const currentBranch = shell.exec('git rev-parse --abbrev-ref HEAD', { silent: true }).stdout.replace(/\s$/, '')
const notReInstallOnPkgChangeFeatures = buildConfig.notReInstallOnPkgChangeFeatures
if (Array.isArray(notReInstallOnPkgChangeFeatures) && notReInstallOnPkgChangeFeatures.includes(currentBranch)) {
  console.log(chalk.green(`Current branch ${currentBranch} does not need check.`))
  shell.exit(0)
}
const targetFiles = ['package.json']
const noTargetChange = targetFiles.every((file) => {
  return stdout.indexOf(file) === -1
})
if (noTargetChange) {
  console.log(chalk.green('no target files changed.'))
  shell.exit(0)
}
console.log(chalk.green('package.json changed, re-install now.'))
shell.exec('npm i -d')
shell.exit(0)