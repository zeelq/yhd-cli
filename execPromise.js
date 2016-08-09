'use strict';
let exec = require('child_process').exec;
module.exports = (execStr)=> {
  return new Promise((resolve,reject)=> {
    exec(execStr,(err,stdout,stderr)=> {
      if(err){
        console.error(err);
        reject(err);
      }else{
        console.log(stdout||stderr);
        resolve(stdout||stderr);
      }
    });
  });
};