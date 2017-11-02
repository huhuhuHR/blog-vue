var chalk = require('chalk');
var semver = require('semver');
var packageConfig = require('../package.json');
var shell = require('shelljs');
function exec(cmd) {
  console.log('exec' + cmd);
  let result = require('child_process').execSync(cmd).toString().trim();
  console.log(chalk.blue(result));
  return result;
}

var versionRequirements = [
  {
    name: 'node',
    currentVersion: semver.clean(process.version),
    versionRequirement: packageConfig.engines.node
  },
];

console.log(chalk.blue('npm版本号：' + packageConfig.engines.npm));
if (shell.which('npm')) {
  versionRequirements.push({
    name: 'npm',
    currentVersion: exec('npm --version'),
    versionRequirement: packageConfig.engines.npm
  })
}

module.exports = function () {
  var warnings = [];
  for (var i = 0; i < versionRequirements.length; i++) {
    var mod = versionRequirements[i];
    let flag = semver.satisfies(mod.currentVersion, mod.versionRequirement);
    console.log(chalk.blue('checkResult：' + flag));
    if (!flag) {
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
      )
    }
  }

  if (warnings.length) {
    console.log('');
    console.log(chalk.yellow('To use this template, you must update following to modules:'));
    console.log();
    for (var i = 0; i < warnings.length; i++) {
      var warning = warnings[i];
      console.log('  ' + warning)
    }
    console.log();
    process.exit(1)
  }
};
