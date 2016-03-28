#!/bin/bash
ssh -i ~/.ssh/deploy_rsa folk@123.56.197.51 bash -c "'
cd frontend
git pull origin master
source ~/.nvm/nvm.sh 
NODE_ENV=production bash update.sh
'"
