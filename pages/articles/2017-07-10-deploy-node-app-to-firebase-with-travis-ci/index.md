---
title: Deploy a Node App To Firebase with Travis CI
date: "2017-07-11T00:40:50+0000"
layout: post
path: "deploy-node-app-to-firebase-with-travis-ci"
category: "Continuous Integration"
cover: "travis.png"
---
1. Enable Travis CI for your repository
2. Create a .travis.yml file in the root of your project
```yaml
language: node_js
node_js:
- "8"
- "6"
script: yarn build // replace with your app's build script
deploy:
  provider: firebase
  skip_cleanup: true
```
3. Install the firebase-cli tools
```sh
yarn global add firebase-tools
```
4. Generate a Firebase login token
```sh
firebase login:ci
```
5. Encrypt and add your firebase token to .travis.yml
```sh
travis encrypt "YOUR_TOKEN_HERE" --add deploy.token
```
6. Commit and push.travis.yml to your repo
