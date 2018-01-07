// 命令行字体颜色美化
var chalk = require('chalk');
// 版本解析插件
var semver = require('semver');
var packageConfig = require('../package.json');
// node 中使用 shell 命令
var shell = require('shelljs');

function exec(cmd) {
  console.log('exec' + cmd);
  // child_process 开启子进程，并执行 cmd 命令 然后返回结果
  let result = require('child_process').execSync(cmd).toString().trim();
  console.log(chalk.blue(result));
  return result;
}

console.log(chalk.blue('当前node实例版本号：' + process.version));
console.log(chalk.blue('当前node实例版本号处理后：' + semver.clean(process.version)));

var versionRequirements = [
  {
    name: 'node',
    // process.version：包含当前node实例的版本号；v6.3.1
    // semver.clean 去v semver.clean(process.version)
    currentVersion: semver.clean(process.version),
    versionRequirement: packageConfig.engines.node
  },
];

console.log(chalk.blue('npm版本号：' + packageConfig.engines.npm));
// shell.which('命令')在系统的路径搜索命令, 如果用的是 npm 就检查 npm 版本
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
    /*
        semver.satisfies('当前版本'，'版本范围')
        用于判断版本是否符合需求，不符合要求则加入警告
    */
    console.log(chalk.blue('checkResult：' + flag));
    if (!flag) {
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
      )
    }
  }
  // 警告输出
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
