// index.js == server.js

const Twit = require('twit');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use('/source', express.static(__dirname + '/client/source/'));

// Identifiants Twitter
let Tweet = new Twit({
    consumer_key: '[VOTRE CLE TWITTER API]',
    consumer_secret: '[VOTRE CLE TWITTER API]',
    access_token: '[VOTRE CLE TWITTER API]',
    access_token_secret: '[VOTRE CLE TWITTER API]'
});

//- Paramètres de recherche : "javascript" et "iot"
let stream = Tweet.stream('statuses/filter', {
    track: ['#javascript, #iot']
});

//- Ecoute le stream socket.io
stream.on('tweet', (tweet) => {
    io.emit('tweet', {
        'tweet': tweet
    });
});

//- Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/client/index.html");
});

app.get('/tweets', (req, res) => {
    res.sendFile(__dirname + "/client/tweets.html");
});

//- Serveur :
server.listen(3000, () => {
    console.log("C'est prêt ici : -> http://localhost:3000")
});
