// @ts-check
require('dotenv').config();

const { MongoClient, ServerApiVersion } = require('mongodb');

const client = new MongoClient(process.env.DB_LOCAL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

module.exports = client;
