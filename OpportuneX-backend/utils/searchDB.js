const {Client}= require("@elastic/elasticsearch");

const searchDBClient =  new Client({
  node: process.env.ELASTICSEARCH_URL || "http://localhost:9200",
  auth: {
    username: process.env.ES_USER || "elastic",
    password: process.env.ES_PASS || "changeme",
  },
});


module.exports = searchDBClient