var settingsConfig = require('./app/config/settings/settings-config');

var dbCreator = require('./app/db-creator');

dbCreator.createIfNotExist();

if(settingsConfig.settings.clusterEnabled === 1) {
  require('cluster-service').start({ workers: './app/config/worker-config.js',
    accessKey: settingsConfig.settings.clusterAccessKey,
    host: settingsConfig.settings.hostName,
    port: settingsConfig.settings.masterPort });
}
else {
  require('./app/config/worker-config.js');
}
