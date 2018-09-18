const buildConfig = require('../config/build')
const shell = require('shelljs')
if (!buildConfig.reInstallOnPkgChange) {
  shell.exit(1)
}
if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git')
  shell.exit(1)
}
const {stdout} = shell.exec('git diff-tree -r --name-only --no-commit-id ORIG_HEAD HEAD', { silent: true })
const targetFiles = ['package.json']
const noTargetChange = targetFiles.every((file) => {
  return stdout.indexOf(file) === -1
})
if (noTargetChange) {
  shell.exit(1)
}
shell.exec('npm i')