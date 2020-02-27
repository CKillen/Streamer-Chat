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
