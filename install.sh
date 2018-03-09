#!/bin/sh
sudo mkdir /var/lib/rewards
sudo chown media:media /var/lib/rewards

# install dependencies
sudo apt-get install nodejs
sudo npm install pm2 -g
sudo npm install http-server -g

# configure pm2 + start
pm2 start /opt/sites/rewards/webapi/server.js --name="RewardsWebApi" -- 0 prod 0.0.0.0
pm2 start /usr/local/bin/http-server --name="RewardHttpServer" -- /opt/sites/rewards/web -p 9001 -d false

# generate boot files
pm2 startup upstart -u media --hp /home/media
pm2 save

# unistall
#pm2 delete RewardHttpServer
#pm2 delete RewardsWebApi
