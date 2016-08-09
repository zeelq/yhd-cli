#!/usr/bin/env node
'use strict';
let exec = require('./execPromise');
let path = require('path');
let fs = require('fs');
let cfg = require('./config');

const checkParams = ()=> {
  let action = process.argv[2];
  let projectName = process.argv[3];
  let projectType = (process.argv[4] || 'vue').replace(/-+/g, '');
  return [action, projectName, projectType];
};

const create = (projectName, projectType)=> {
  exec(`git clone ${ cfg[projectType] } ${ projectName }`)
    .then(stdout=> exec(`rm -rf ${ path.join(__dirname, projectName) }/.git`))
};
const remove = (projectName)=> exec(`rm -rf ${ projectName }`);

const init = (action,projectName,projectType)=> {
  switch(action) {
    case 'create': create(projectName, projectType);
      break;
    case 'remove': remove(projectName);
      break;
    default:create(projectName,projectType);
  }
};
init(...checkParams());
