'use strict';
const qiniu = require('qiniu');
//todo need to get command from argv
const command = process.argv.slice(2);
const config = require('./qiniu.json');
const fs = require('fs');
const replace = require('replace');
const recursive = require('recursive-readdir');

qiniu.conf.ACCESS_KEY = config.accessKey;
qiniu.conf.SECRET_KEY = config.secretKey;

const client = new qiniu.rs.Client();
const bucket = config.bucket;
const uploadFiles = config.uploadFiles.split(',');
const replaceFiles = config.replaceFiles.split(',');

const generateToken = (bucket, file) => {
  let match = /([\w|-]+)\.(\w+)$/.exec(file);
  if (match) {
    let key = match[0];
    let putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key);
    return [putPolicy.token(), key, file];
  } else {
    console.log('filename does not match ', file);
    return null;
  }
};

const uploadFile = (uptoken, key, localFile) => {
  let extra = new qiniu.io.PutExtra();
  qiniu.io.putFile(uptoken, key, localFile, extra, (err, ret) => {
    if (!err) {
      console.log(`${localFile} upload!`);
    } else {
      console.log(err);
      return null;
    }
  });
};

uploadFiles.forEach(file => {
  fs.stat(file, (err, stats) => {
    if (err) {
      console.log(err);
    } else {
      if (stats.nlink > 1) {
        recursive(file, (err, files) => {
          if (err) {
            console.log(err);
          } else {
            files
              .map(file => generateToken(bucket, file))
              .forEach(token => {
                if (Array.isArray(token)) {
                  uploadFile.apply(this, token);
                }
              });
          }
        });
      } else {
        let token = generateToken(bucket, file);
        if (Array.isArray(token)) {
          uploadFile.apply(this, token);
        }
      }
    }
  });
});

//replace assets to cloud url
replace({
  regex: config.regexp,
  replacement: config.baseUrl,
  paths: config.replaceFiles.split(','),
  recursive: true
});

//获取文件信息
//client.stat(bucket, "test.png", function(err, ret) {
//  if (!err) {
//    console.log(ret.hash, ret.fsize, ret.putTime, ret.mimeType);
//  } else {
//    console.log(err);
//  }
//});

