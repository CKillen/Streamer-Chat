const express = require("express");
const http = require("http");
const app = express();
const port = 4050;
const ApiRename = require("./routes/api-rename");
const WebSocket = require("ws");
const cors = require("cors");
const helper = require("./helpers/helper.js");
const server = http.createServer(app);
app.use(cors());

//TODO: Refactor Websocket stuff to own file/folder

const client = new WebSocket('wss://irc-ws.chat.twitch.tv:443');
const webSocketServer = new WebSocket.Server({
    port: 8080
}, function(ws) {
    console.log("WebSocket up");
    client.on('open', function open() {
        client.send("pass oauth:miuvyfz3bolyddzwdmxywjmqsw2na1");
        client.send("nick hicures");
        client.send("join #tfblade");
        //client.send("join #giraffecca8");
        //client.send("join #loltyler1");
        client.send("CAP REQ :twitch.tv/tags twitch.tv/commands");
        client.send("CAP REQ :twitch.tv/membership");
    });
});

webSocketServer.on("connection", function connection(ws, req) {
    console.log("A user has connected");
        //TODO: Function out all the ugly string parsing code, possibly into a
        //file that just spits back the correct JSON. This would also be a good
        //place to implement testing for all the different things grabbed from
        //data. ie Function to test getNameFromIrc()
        //TODO: Some things should be removed from chat.
        client.on('message', function incoming(data) {
            if(typeof data == "string" && data.includes("PING :")) {
                client.send("PONG :tmi.twitch.tv");
            } else {
                //:NAME!NAME@NAME.tmi.twitch.tv PRIVMSG #CHANNEL :MESSAGE
                let color;
                let name = data.substring(
                        data.indexOf("=", data.indexOf("display-name=")) + 1,
                        data.indexOf(";", data.indexOf("display-name="))).trim();
                let msg = data.substring(
                        data.indexOf(":", data.indexOf("PRIVMSG #")) + 1).trim();
                let channel = data.substring(
                        data.indexOf("#", data.indexOf("PRIVMSG #")) + 1,
                        data.indexOf(":", data.indexOf("PRIVMSG #") + 1)).trim();
                if(data[data.indexOf("=", data.indexOf("color=")) + 1] != ";") {
                    color = data.substring(
                        data.indexOf("#", data.indexOf("color=")),
                        data.indexOf(";", data.indexOf("color="))).trim();
                } else {
                    color = helper.get_color_for_user(name);
                }
                let mod = false;
                if(data[data.indexOf("=", data.indexOf("mod=")) + 1] == "1") {
                    mod = true;
                }
                console.log(data);
                let emoteStart = data
                    .indexOf("=", data.indexOf("emotes=")) + 1;
                let emoteEnd = data.indexOf("flags") - 1;
                let emoteString = data.substring(emoteStart, emoteEnd);
                let emoteArray = emoteString.split("/");
                let emoteData = [];
                //Would it be better to gather all ids and request database at once
                //or to grab the ***ndividually
                console.log(emoteArray);
                console.log(emoteEnd);
                let emoteId = 0;
                if(emoteEnd > -1 &&  data[emoteEnd - 1] != "=") {
                    for(let i = 0; i < emoteArray.length; i++) {
                        let emoteParts = emoteArray[i].split(":");
                        let allEmotePositions = emoteParts[1].split(",");

                        for(let j = 0; j < allEmotePositions.length; j++) {
                            let emote = {};
                            emote.id = emoteId;
                            emoteId++;
                            emote.emoteId = emoteParts[0];
                            emotePosition = allEmotePositions[j].split("-");
                            emote.startPos = emotePosition[0];
                            emote.endPos = emotePosition[1];
                            emote.url = `https://static-cdn.jtvnw.net/emoticons/v1/${emote.emoteId}/1.0`;
                            emoteData.push(emote);
                            //we still need name and url
                        }
                    }
                }
                console.log(emoteData);
                //@badge-info=;badges=;color=#008000;display-name=iamaneagle22;
                //emotes=;flags=;id=fc10ac94-dc79-41fa-ad16-ff965fa9130a;mod=0;
                //room-id=51496027;subscriber=0;tmi-sent-ts=1582046450824;
                //turbo=0;user-id=158195006;user-type=
                // :iamaneagle22!iamaneagle22@iamaneagle22.tmi.twitch.tv
                // PRIVMSG #loltyler1 :KEKW
                let sendData = {
                    name,
                    msg,
                    emoteData,
                    channel,
                    color,
                    mod,
                }
                //console.log(sendData);
                ws.send(JSON.stringify(sendData));
            }
        });

})

app.use('/api/user', ApiRename);

app.listen(port, () => console.log("server"));
