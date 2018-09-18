const buildConfig = require('../config/build')
const shell = require('shelljs')
if (!buildConfig.reInstallOnPkgChange) {
  shell.exit(0)
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
  shell.exit(0)
}
shell.echo('package.json changed, re-install now.')
shell.exec('npm i -d')
shell.exit(0)