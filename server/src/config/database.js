require('dotenv').config()

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_CONNECTION,
    timezone: process.env.DB_TIMEZONE,
  },
  staging: {
    username: process.env.STAGING_DB_USERNAME,
    password: process.env.STAGING_DB_PASSWORD,
    database: process.env.TUNNEL_DATABASE,
    dialect: process.env.STAGING_DB_CONNECTION,
    timezone: process.env.STAGING_DB_TIMEZONE,
    port: process.env.STAGING_DB_PORT,
    tunnel: process.env.STAGING_DB_TUNNEL,
    host: process.env.STAGING_DB_HOST,
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_DATABASE,
    host: process.env.PROD_DB_HOST,
    dialect: process.env.PROD_DB_CONNECTION,
    timezone: process.env.PROD_DB_TIMEZONE,
  },
  tunnel: {
    username: process.env.TUNNEL_USERNAME,
    password: process.env.TUNNEL_PASSWORD,
    host: process.env.TUNNEL_HOST,
    port: process.env.TUNNEL_PORT,
    dstHost: process.env.TUNNEL_DST_HOST,
    dstPort: process.env.TUNNEL_DST_PORT,
    localHost: process.env.TUNNEL_LOCAL_HOST,
    localPort: process.env.TUNNEL_LOCAL_PORT,
    passphrase: process.env.TUNNEL_PASSPHRASE,
    keepAlive: process.env.TUNNEL_ALIVE,
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_CONNECTION,
    timezone: process.env.DB_TIMEZONE,
  },
}