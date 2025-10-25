const { Redis } = require("ioredis");

const connection = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
    maxRetriesPerRequest: null, // ✅ required for BullMQ
  // plain TCP port, no TLS needed
});

connection.on("connect", () => console.log("✅ Redis connected"));
connection.on("error", (err) => console.error("❌ Redis error:", err));

module.exports = { connection };
