const Redis = require('ioredis');
const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
});

const connect = () => {
    redis.on('connect', () => {
        console.log('Redis server running on: http://locahost:6379')
    })
    redis.on('error', (err)=>{
        console.log('Redis error: '+ err)
        throw err
    })
}
module.exports = {redis, connect}