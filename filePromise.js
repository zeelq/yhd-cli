'use strict';
let fs = require('fs');
module.exports.writeFile = (pathname,data,options)=> {
  return new Promise((resolve,reject)=> {
    fs.writeFile(pathname,data,options,(err)=> {
      if(err){
        reject(err);
      }else{
        resolve();
      }
    });
  });
};
module.exports.readFile = (pathname)=> {
  return new Promise((resolve,reject)=> {
    fs.readFile(pathname,(err,data)=>{
      if(err){
        reject(err);
      }else{
        resolve(data);
      }
    });
  });
};