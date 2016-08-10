#!/usr/bin/env node
'use strict';
let exec = require('./execPromise');
let path = require('path');
let fs = require('fs');
let cfg = require('./config');
let write = require('./filePromise').writeFile;
let read = require('./filePromise').readFile;
/**
 * 处理命令行参数
 * @returns {*[]}
 */
const checkParams = ()=> {
  let action = process.argv[2];
  let projectName = process.argv[3];
  let projectType = (process.argv[4] || 'vue').replace(/^-+/, '');
  return [action, projectName, projectType];
};
/**
 * 创建项目
 * @param projectName
 * @param projectType
 */
const create = (projectName, projectType)=> {
  exec(`git clone ${ cfg[projectType] } ${ projectName }`)
    .then(stdout=> exec(`rm -rf ${ path.join(__dirname, projectName) }/.git`))
    .then(stdout=> reset(projectName));
};
/**
 * 移除项目
 * @param projectName
 */
const remove = (projectName)=> exec(`rm -rf ${ projectName }`);
/**
 * 替换模板
 * @param projectName
 */
const reset = (projectName)=> {
  let filePath = path.join(__dirname,projectName);
  let templates = ['package.json','index.html','h5cfg.txt'];
  const replaceTemplate = (filePath,projectName)=> {
    read(filePath)
      .then(data=> data.toString().replace(/\$\{\s*name\s*\}/g,projectName))
      .then(data=> write(filePath,data))
  };
  templates.forEach((template)=> replaceTemplate(`${ filePath }/${ template }`,projectName));
};
/**
 * 程序主入口
 * @param action
 * @param projectName
 * @param projectType
 */
const init = (action,projectName,projectType)=> {
  switch(action) {
    case 'create': create(projectName, projectType);
      break;
    case 'remove': remove(projectName);
      break;
    default:create(projectName,projectType);
  }
};
// init(...checkParams());
init(checkParams()[0],checkParams()[1],checkParams()[2]);
