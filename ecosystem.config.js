module.exports = {
  apps: [
    {
      name: 'pr-mebel-next',
      script: 'node_modules/.bin/next',
      args: 'start',
      exec_interpreter: '/home/web/.nvm/versions/node/v22.14.0/bin/node',
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
