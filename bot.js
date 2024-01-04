require('dotenv').config()
const { twitterClient } = require('./twitterClient')

const tweet = async () => {
    try {
        await twitterClient.v2.tweet('Hello world')
    } catch (error) {
        console.error(error)
    }
}

tweet()