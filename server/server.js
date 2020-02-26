const express = require("express");
const http = require("http");
const app = express();
const port = 4050;
const ApiRename = require("./routes/api-rename");
const WebSocket = require("ws");
const cors = require("cors");
const helper = require("./helpers/helper.js");
const server = http.createServer(app);
const twitchIrcParser = require("./helpers/twitchIrcParser.js");
app.use(cors());

//TODO: Refactor Websocket stuff to own file/folder

const client = new WebSocket('wss://irc-ws.chat.twitch.tv:443', {
    perMessageDeflate: true
});

client.on('open', function open() {
    console.log("open");
    client.send("pass oauth:miuvyfz3bolyddzwdmxywjmqsw2na1");
    client.send("nick hicures");
    client.send("join #hicures");
    //client.send("join #loltyler1");
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
        //TODO: Function out all the ugly string parsing code, possibly into a
        //file that just spits back the correct JSON. This would also be a good
        //place to implement testing for all the different things grabbed from
        //data. ie Function to test getNameFromIrc()
        //TODO: Some things should be removed from chat.
        client.on('message', function incoming(data) {
            let sendData = twitchIrcParser(data);
            ws.send(JSON.stringify(sendData));

    });

})

app.use('/api/user', ApiRename);

app.listen(port, () => console.log("server"));
