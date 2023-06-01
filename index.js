#!/usr/bin/env node

const { program } = require('commander');
const fs = require('fs-extra');
const path = require('path');
const { exec } = require('child_process');

const TEMPLATE_REPO = 'https://github.com/haikelei/leo-template.git'; // 将此替换为你的 leo-template 仓库地址

program
    .command('init <projectName>')
    .description('创建一个新的项目')
    .action(async (projectName) => {
        const projectPath = path.resolve(process.cwd(), projectName);
        const gitCloneCommand = `git clone ${TEMPLATE_REPO} ${projectPath}`;

        // 克隆模板仓库到指定目录
        exec(gitCloneCommand, async (error, stdout, stderr) => {
            if (error) {
                console.error(`克隆模板仓库失败: \n${error.message}`);
                return;
            }
            console.log(`已成功克隆模板仓库至：${projectPath}`);

            // 删除 .git 文件夹
            await fs.remove(path.join(projectPath, '.git'));

            // 在这里添加其他项目初始化逻辑，例如安装依赖等。
        });
    });

program.parse(process.argv);
