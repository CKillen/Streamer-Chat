const helper = require("./helper.js");

const twitchIrcParser = (ircData) => {
    if(!ircData.includes("PRIVMSG")) {
       return;
    }
    let tags = parseTags(ircData);
    let msg = parseMessage(ircData)
    let channel = parseChannel(ircData)
    let name = parseName(tags);
    let color = parseColor(tags, name);
    let mod = parseModStatus(tags);
    let emoteData = createEmoteArray(tags);

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

function createEmoteArray(tags) {
    let emoteStart = tags
        .indexOf("=", tags.indexOf("emotes=")) + 1;
    let emoteEnd = tags.indexOf("flags") - 1;
    let emoteString = tags.substring(emoteStart, emoteEnd);
    let emoteArray = emoteString.split("/");
    let emoteData = [];
    if(emoteEnd <= -1 || tags[emoteEnd - 1] === "=") {
        return emoteData;
    }

    for(let i = 0; i < emoteArray.length; i++) {
        let emoteParts = emoteArray[i].split(":");
        let childEmotes = emoteParts[1].split(",");

        for(let j = 0; j < childEmotes.length; j++) {
            emoteData.push(
                createEmoteObject(emoteParts[0], childEmotes[j])
            );
        }
    }

    return emoteData;
}

function createEmoteObject(parentEmoteId, childEmote) {
    let emote = {};
    emotePosition = childEmote.split("-");
    emote.startPos = emotePosition[0];
    emote.endPos = emotePosition[1];
    emote.url = `https://static-cdn.jtvnw.net/emoticons/` +
        `v1/${parentEmoteId}/1.0`;
    return emote;
}

function parseMessage(ircData) {
    return ircData.substring(
            ircData.indexOf(":", ircData.indexOf("PRIVMSG #")) + 1).trim();

}

function parseChannel(ircData) {
    return ircData.substring(
            ircData.indexOf("#", ircData.indexOf("PRIVMSG #")) + 1,
            ircData.indexOf(":", ircData.indexOf("PRIVMSG #") + 1)).trim();

}

function parseName(tags) {
    return tags.substring(
        tags.indexOf("=", tags.indexOf("display-name=")) + 1,
        tags.indexOf(";", tags.indexOf("display-name="))).trim();
}

function parseModStatus(tags) {
    let mod = false;
    if(tags[tags.indexOf("=", tags.indexOf("mod=")) + 1] == "1") {
        mod = true;
    }

    return mod;
}

function parseTags(ircData) {
    //@tag-name..... next part starts with :
    return ircData.substring(
        ircData.indexOf("@"),
        ircData.indexOf(";user-type="));
}

function parseColor(tags, name) {
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
