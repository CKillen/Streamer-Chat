const twitchIrcParser = (ircMessage) => {
    //TODO determine type of Message
    //Currently we are only checking for PING
    //others include JOIN, CLEARMSG, etc
    console.log(ircMessage);
    let tags = parseMessageTags(ircMessage);
    let messageType = parseMessageType(ircMessage);
    let message = parseMessage(ircMessage);
    console.log("tags: ", tags);
    if(typeof ircMessage == "string" && ircMessage.includes("PING :")) {
        client.send("PONG :tmi.twitch.tv");
    } else {
        //:NAME!NAME@NAME.tmi.twitch.tv PRIVMSG #CHANNEL :MESSAGE
        let color;
        let name = ircMessage.substring(
                ircMessage.indexOf("=", ircMessage.indexOf("display-name=")) + 1,
                ircMessage.indexOf(";", ircMessage.indexOf("display-name="))).trim();
        let msg = ircMessage.substring(
                ircMessage.indexOf(":", ircMessage.indexOf("PRIVMSG #")) + 1).trim();
        let channel = ircMessage.substring(
                ircMessage.indexOf("#", ircMessage.indexOf("PRIVMSG #")) + 1,
                ircMessage.indexOf(":", ircMessage.indexOf("PRIVMSG #") + 1)).trim();
        if(ircMessage[ircMessage.indexOf("=", ircMessage.indexOf("color=")) + 1] != ";") {
            color = ircMessage.substring(
                ircMessage.indexOf("#", ircMessage.indexOf("color=")),
                ircMessage.indexOf(";", ircMessage.indexOf("color="))).trim();
        } else {
            color = helper.get_color_for_user(name);
        }
        let mod = false;
        if(ircMessage[ircMessage.indexOf("=", ircMessage.indexOf("mod=")) + 1] == "1") {
            mod = true;
        }
        let emoteStart = ircMessage
            .indexOf("=", ircMessage.indexOf("emotes=")) + 1;
        let emoteEnd = ircMessage.indexOf("flags") - 1;
        let emoteString = ircMessage.substring(emoteStart, emoteEnd);
        let emoteArray = emoteString.split("/");
        let emoteData = [];
        //Would it be better to gather all ids and request ircMessagebase at once
        //or to grab the ***ndividually

        let emoteId = 0;
        if(emoteEnd > -1 &&  ircMessage[emoteEnd - 1] != "=") {
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

        return sendData;
    }

}

function parseMessageTags(ircMessage) {
    //@tag-name..... next part starts with :
    return ircMessage.substring(
        ircMessage.indexOf("@"),
        ircMessage.indexOf(":"));
}


function parseMessageType(ircMessage) {

}

function parseMessage(ircMessage) {

}

module.exports = twitchIrcParser;
