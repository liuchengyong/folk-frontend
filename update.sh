#!/bin/bash
git pull origin master 
cnpm install 
npm run dist
npm run cnd
