'use strict';

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-prompt');
  // Load the plugin that provides the "deployment" task.
  grunt.loadNpmTasks('grunt-ssh');

  grunt.initConfig({
    credential: {
      host: "192.168.0.2",
      username: "media",
      password: ""
    },
    prompt: {
      username: {
        options: {
          questions: [
            {
              config: 'credential.username',
              type: 'input',
              message: 'username?',
              default: '<%= credential.username %>'
            }
          ]
        }
      },
      password: {
        options: {
          questions: [
            {
              config: 'credential.password',
              type: 'password',
              message: 'password?'
            }
          ]
        }
      }
    },
    sftp: {
      copy_webapi: {
        files: {
          "./": ["server/app/**", "server/server.js", "server/package.json"]
        },
        options: {
          path: '/opt/sites/rewards/webapi',
          srcBasePath: "server/",
          host: '<%= credential.host %>',
          username: '<%= credential.username %>',
          password: '<%= credential.password %>',
          createDirectories : true,
          showProgress: true
        }
      },
      copy_website: {
        files: {
          "./": "client/dist/**"
        },
        options: {
          path: '/opt/sites/rewards/web',
          srcBasePath: "client/dist/",
          host: '<%= credential.host %>',
          username: '<%= credential.username %>',
          password: '<%= credential.password %>',
          createDirectories : true,
          showProgress: true
        }
      }
    },
    sshexec: {
      reload_site: {
        command: `pm2 reload all`,
        options: {
          host: '<%= credential.host %>',
          username: '<%= credential.username %>',
          password: '<%= credential.password %>'
        }
      },
      remove_site: {
        command: `if [ -d "/opt/sites/rewards" ]; then 
                    rm -R /opt/sites/rewards
                  fi`,
        options: {
          host: '<%= credential.host %>',
          username: '<%= credential.username %>',
          password: '<%= credential.password %>'
        }
      }
    }
  });

  grunt.registerTask('grunt:build_site', function () {
    var done = this.async();
    grunt.util.spawn({
      grunt: true,
      args: ['build'],
      opts: {
        cwd: './client'
      }
    }, function (err, result, code) {
      console.log(result.stdout);
      done();
    });
  });

  grunt.registerTask('uninstall', 
  [
    'prompt:username',
    'prompt:password',
    'stop_site',
    'sshexec:remove_site'
  ]);

  // Default task(s).
  grunt.registerTask('deploy', [
    'prompt:username',
    'prompt:password',
    'grunt:build_site',
    'sshexec:remove_site',
    'sftp:copy_webapi',
    'sftp:copy_website',
    'sshexec:reload_site'
  ]);


};