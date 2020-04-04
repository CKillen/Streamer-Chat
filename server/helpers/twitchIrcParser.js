const helper = require('./helper.js');

const twitchIrcParser = (ircData) => {
    let sendData = null;
    if (ircData.includes('PRIVMSG')) {
        const tags = parseTags(ircData);
        const msg = parseMessage(ircData);
        const channel = parseChannel(ircData);
        const name = parseName(tags);
        const color = parseColor(tags, name);
        const mod = parseModStatus(tags);
        const emoteData = createEmoteArray(tags);

        sendData = {
            name,
            msg,
            emoteData,
            channel,
            color,
            mod,
        };
    }

    return sendData;
};

function createEmoteArray(tags) {
    const emoteStart = tags
        .indexOf('=', tags.indexOf('emotes=')) + 1;
    const emoteEnd = tags.indexOf('flags') - 1;
    const emoteString = tags.substring(emoteStart, emoteEnd);
    const emoteArray = emoteString.split('/');
    const emoteData = [];
    if (emoteEnd <= -1 || tags[emoteEnd - 1] === '=') {
        return emoteData;
    }

    for (let i = 0; i < emoteArray.length; i++) {
        const emoteParts = emoteArray[i].split(':');
        const childEmotes = emoteParts[1].split(',');

        for (let j = 0; j < childEmotes.length; j++) {
            emoteData.push(
                createEmoteObject(emoteParts[0], childEmotes[j]),
            );
        }
    }

    return emoteData;
}

function createEmoteObject(parentEmoteId, childEmote) {
    const emote = {};
    // #-# is how it determines the pos
    const emotePosition = childEmote.split('-');
    [emote.startPos, emote.endPos] = emotePosition;
    emote.url = `https://static-cdn.jtvnw.net/emoticons/`
         + `v1/${parentEmoteId}/1.0`;
    return emote;
}

function parseMessage(ircData) {
    return ircData.substring(
        ircData.indexOf(':', ircData.indexOf('PRIVMSG #')) + 1,
    ).trim();
}

function parseChannel(ircData) {
    return ircData.substring(
        ircData.indexOf('#', ircData.indexOf('PRIVMSG #')) + 1,
        ircData.indexOf(':', ircData.indexOf('PRIVMSG #') + 1),
    ).trim();
}

function parseName(tags) {
    return tags.substring(
        tags.indexOf('=', tags.indexOf('display-name=')) + 1,
        tags.indexOf(';', tags.indexOf('display-name=')),
    ).trim();
}

function parseModStatus(tags) {
    let mod = false;
    if (tags[tags.indexOf('=', tags.indexOf('mod=')) + 1] === '1') {
        mod = true;
    }

    return mod;
}

function parseTags(ircData) {
    // @tag-name..... next part starts with :
    return ircData.substring(
        ircData.indexOf('@'),
        ircData.indexOf(';user-type='),
    );
}

function parseColor(tags, name) {
    let color;
    if (tags[tags.indexOf('=', tags.indexOf('color=')) + 1] !== ';') {
        color = tags.substring(
            tags.indexOf('#', tags.indexOf('color=')),
            tags.indexOf(';', tags.indexOf('color=')),
        ).trim();
    } else {
        color = helper.get_color_for_user(name);
    }

    return color;
}

module.exports = twitchIrcParser;
