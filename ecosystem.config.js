module.exports = {
  apps: [
    {
      name: "i004-pawsome-back",
      script: "/dist/index.js",
      watch: true,
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
