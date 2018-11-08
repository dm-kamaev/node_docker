#!/bin/bash
node -v;
pm2 -v;
npm i --only=production --no-save
#node server.js;
pm2-runtime start ecosystem.json
