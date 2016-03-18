#!/bin/bash
git pull origin master 
cnpm install 
rm -rf ./dist/assets/*
npm run dist
npm run cnd
