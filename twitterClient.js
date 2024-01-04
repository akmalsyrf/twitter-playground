require('dotenv').config()
const { TwitterApi } = require('twitter-api-v2')

const { API_KEY, API_KEY_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET, BEARER_TOKEN } = process.env

const client = new TwitterApi({
    appKey: API_KEY,
    appSecret: API_KEY_SECRET,
    accessToken: ACCESS_TOKEN,
    accessSecret: ACCESS_TOKEN_SECRET
})
const bearer = new TwitterApi(BEARER_TOKEN)

const twitterClient = client.readWrite
const twitterBearer = bearer.readOnly

module.exports = { twitterClient, twitterBearer }