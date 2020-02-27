const helper = require("./helper.js");

const twitchIrcParser = (ircData) => {
    if(!ircData.includes("PRIVMSG")) {
       return;
    }
    let tags = parseMessageTags(ircData);
    let color = messageColor(tags);
    let name = tags.substring(
            tags.indexOf("=", tags.indexOf("display-name=")) + 1,
            tags.indexOf(";", tags.indexOf("display-name="))).trim();
    let msg = ircData.substring(
            ircData.indexOf(":", ircData.indexOf("PRIVMSG #")) + 1).trim();
    let channel = ircData.substring(
            ircData.indexOf("#", ircData.indexOf("PRIVMSG #")) + 1,
            ircData.indexOf(":", ircData.indexOf("PRIVMSG #") + 1)).trim();
    let mod = isMod(tags);
    let emoteStart = ircData
        .indexOf("=", ircData.indexOf("emotes=")) + 1;
    let emoteEnd = ircData.indexOf("flags") - 1;
    let emoteString = ircData.substring(emoteStart, emoteEnd);
    let emoteArray = emoteString.split("/");
    let emoteData = [];
    let emoteId = 0;
    if(emoteEnd > -1 &&  ircData[emoteEnd - 1] != "=") {
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
            }
        }
    }
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

function isMod(tags) {
    let mod = false;
    if(tags[tags.indexOf("=", tags.indexOf("mod=")) + 1] == "1") {
        mod = true;
    }

    return mod;
}

function parseMessageTags(ircData) {
    //@tag-name..... next part starts with :
    return ircData.substring(
        ircData.indexOf("@"),
        ircData.indexOf(";user-type="));
}

function messageColor(tags) {
    if(tags[tags.indexOf("=", tags.indexOf("color=")) + 1] != ";") {
        color = tags.substring(
            tags.indexOf("#", tags.indexOf("color=")),
            tags.indexOf(";", tags.indexOf("color="))).trim();
    } else {
        color = helper.get_color_for_user(name);
    }

    return color;
}

module.exports = twitchIrcParser;
