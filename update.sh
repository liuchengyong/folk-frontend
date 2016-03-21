#!/bin/bash
git pull origin master 
cnpm install 
rm -rf ./dist/assets/*
if ["$NODE_ENV" = "production"]
then 
  npm run dist
else 
  npm run test
fi
npm run cnd
