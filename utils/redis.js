const redis = require('redis');

class RedisClient {
    constructor() {
        this.client = redis.createClient(); // Create a new Redis client
        
        // Handle errors
        this.client.on('error', (err) => {
            console.error('Redis error:', err);
        });

        // Ensure the client connects properly
        this.client.on('connect', () => {
            console.log('Connected to Redis');
        });
    }

    // Check if Redis is alive
    isAlive() {
        // Check connection status (a simple way to check if the client is alive)
        return this.client.connected;
    }

    // Asynchronous method to get a value by key
    async get(key) {
        return new Promise((resolve, reject) => {
            this.client.get(key, (err, reply) => {
                if (err) return reject(err);
                resolve(reply);
            });
        });
    }

    // Asynchronous method to set a value with expiration
    async set(key, value, duration) {
        return new Promise((resolve, reject) => {
            this.client.setex(key, duration, value, (err, reply) => {
                if (err) return reject(err);
                resolve(reply);
            });
        });
    }

    // Asynchronous method to delete a value by key
    async del(key) {
        return new Promise((resolve, reject) => {
            this.client.del(key, (err, reply) => {
                if (err) return reject(err);
                resolve(reply);
            });
        });
    }
}

// Create and export an instance of RedisClient
const redisClient = new RedisClient();
module.exports = { redisClient };

