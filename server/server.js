<<<<<<< HEAD
const express = require('express');
const WebSocket = require('ws');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const Passport = require('passport');
const TwitchStrategy = require('passport-twitch').Strategy;

const ApiRename = require('./routes/api-rename');
const twitchIrcParser = require('./helpers/twitchIrcParser.js');
const config = require('./config/config.js');
const initDb = require('./db.js').initDb;
const getDb = require('./db.js').getDb;

const app = express();
const port = 4050;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cookieSession({ secret: 'secretToken' }));
app.use(Passport.initialize());
app.use(cors());
// TODO: Refactor Websocket stuff to own file/folder

const client = new WebSocket('wss://irc-ws.chat.twitch.tv:443', {
    perMessageDeflate: false,
});

client.on('open', () => {
    client.send(`pass ${config.oauth}`);
    client.send(`nick ${config.nick}`);
    client.send('join #hicures');
    client.send('join #jericho');
    client.send('CAP REQ :twitch.tv/tags twitch.tv/commands');
    client.send('CAP REQ :twitch.tv/membership');
    console.log('Client Connected');
});

const webSocketServer = new WebSocket.Server({
    port: 8080,
}, () => {
    console.log('WebSocket up');
});

webSocketServer.on('connection', (ws) => {
    // Note can use req in callback to grab info about client
    console.log('A user has connected');
    client.on('message', (data) => {
        if (data.includes('PING :tmi.twitch.tv')) {
            client.send('PONG :tmi.twitch.tv');
        } else {
            const sendData = twitchIrcParser(data);
            if (sendData !== null) {
                ws.send(JSON.stringify(sendData));
            }
        }
    });
});

Passport.use(new TwitchStrategy({
    clientID: 'homft7q8esdo8j1q6owxy142r4loyyy',
    clientSecret: '3n9dund7aovss26cgkttqj72t9jqac',
    callbackURL: 'http://localhost:3000/signup',
    scope: 'user_read',
}, (accessToken, refreshToken, profile, done) => {

}));

app.use('/api/user', ApiRename);
initDb((err) => {
    app.listen(port, () => {
        if (err) throw err;
        console.log('server')
        const db = getDb();
        db.collection('Streamers').insertOne({ name: 'Chris' });
    });
});
=======
const express = require("express");
const http = require("http");
const app = express();
const port = 4050;
const ApiRename = require("./routes/api-rename");
const WebSocket = require("ws");
const cors = require("cors");
const server = http.createServer(app);
const twitchIrcParser = require("./helpers/twitchIrcParser.js");
const config = require("./config/config.js");
app.use(cors());

//TODO: Refactor Websocket stuff to own file/folder

const client = new WebSocket('wss://irc-ws.chat.twitch.tv:443', {
    perMessageDeflate: false
});

client.on('open', function open() {
    client.send(`pass ${config.oauth}`);
    client.send(`nick ${config.nick}`);
    client.send("join #hicures");
    client.send("join #loltyler1");
    client.send("CAP REQ :twitch.tv/tags twitch.tv/commands");
    client.send("CAP REQ :twitch.tv/membership");
    console.log("Client Connected");
});

const webSocketServer = new WebSocket.Server({
    port: 8080
}, function(ws) {
    console.log("WebSocket up");
});

webSocketServer.on("connection", function connection(ws, req) {
    console.log("A user has connected");
    client.on('message', function incoming(data) {

        if(data.includes("PING :tmi.twitch.tv")) {
            client.send("PONG :tmi.twitch.tv");
        } else {
            console.log(data);
            let sendData = twitchIrcParser(data);
            ws.send(JSON.stringify(sendData));
        }
    })
});


app.use('/api/user', ApiRename);

app.listen(port, () => console.log("server"));
>>>>>>> 2af8af657a41031cd27b9e5212e85b1953db85ea
