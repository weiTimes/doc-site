const shell = require('shelljs');
const Rsync = require('rsync');
const path = require('path');
const colors = require('colors');
const argv = require('yargs').argv;

const [targetName] = argv._;

const hostMap = {
  my: 'root@116.62.43.152:/root/project/doc',
};

function sendNoticon(message) {
  shell.exec(`curl 'https://oapi.dingtalk.com/robot/send?access_token=1d2f8a6bb7cf9b9d86789ab927409351fa252d6d9f191c66a3a2328370eeb04c' \
  -H 'Content-Type: application/json' \
  -d '{"msgtype": "text","text": {"content": "${message}"}}'`);
}

if(!hostMap[targetName]) {
  shell.echo(colors.red('目标主机不存在'));
  shell.exit(1);
}

// 1. 通知 开始构建
sendNoticon('我要开始部署啦');
console.log(colors.yellow('开始构建'));

// 2. 安装依赖
console.log(colors.yellow('安装依赖'));

if (shell.exec('yarn').code !== 0) {
  shell.echo('Error: 安装依赖失败');
  shell.exit(1);
}

// 3. 测试

// 4. 打包
console.log(colors.yellow('开始打包'));

if (shell.exec('yarn run build').code !== 0) {
  shell.echo('Error: 打包未成功');
  shell.exit(1);
}
// 5. 部署，将文件上传至服务器
console.log(colors.yellow('正在上传服务器'));

const rsync = new Rsync()
  .shell('ssh')
  .flags('az')
  .source(path.join(__dirname, '../', '.vuepress/dist/*'))
  .destination(hostMap[targetName]);

rsync.execute(function (error, code, cmd) {
  // we're done
  console.log(colors.yellow('部署完成~'));
  sendNoticon('我已经部署完成啦~');

  console.log(error, code, cmd);
});
