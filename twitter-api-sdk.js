const { Client, auth } = require('twitter-api-sdk')
const express = require('express')

require('dotenv').config();

const app = express();

const OAuth2Scopes = ["tweet.read" , "tweet.write" , "tweet.moderate.write" , "users.read" , "follows.read" , "follows.write" , "offline.access" , "space.read" , "mute.read" , "mute.write" , "like.read" , "like.write" , "list.read" , "list.write" , "block.read" , "block.write" , "bookmark.read" , "bookmark.write"]

const authClient = new auth.OAuth2User({
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  callback: "http://127.0.0.1:3000/callback",
  scopes: OAuth2Scopes,
});

const client = new Client(authClient);

const STATE = "my-state";

app.get("/callback", async function (req, res) {
  try {
    const { code, state } = req.query;
    if (state !== STATE) return res.status(500).send("State isn't matching");
    await authClient.requestAccessToken(code);
    res.redirect("/tweets");
  } catch (error) {
    console.log(error);
  }
});

app.get("/login", async function (req, res) {
  const authUrl = authClient.generateAuthURL({
    state: STATE,
    code_challenge_method: "s256",
  });
  res.redirect(authUrl);
});

app.get("/tweets", async function (req, res) {
  try {
    // const tweets = await client.tweets.createTweet({ text: "Hello world" });
    const tweets = await client.users.findUserByUsername("TwitterDev")
    res.send(tweets.data);
  } catch (error) {
    console.error("Error fetching tweets:", error);
    if (error.error) {
      console.error("Twitter API Error:", error.error);
    }

    res.status(500).send("Error fetching tweets");
  }
});

app.get("/revoke", async function (req, res) {
  try {
    const response = await authClient.revokeAccessToken();
    res.send(response);
  } catch (error) {
    console.log(error);
  }
});



app.listen(3000, () => {
  console.log(`Go here to login: http://127.0.0.1:3000/login`);
});