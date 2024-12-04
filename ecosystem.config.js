module.exports = {
  apps: [
    {
      name: "i004-pawsome-back",
      script: "./dist/index.js",
      watch: process.env.NODE_ENV === "development",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
