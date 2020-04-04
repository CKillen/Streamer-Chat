import React, { Component } from "react";
import User from "../../api/User.js";
import "./chat.css";
const ws = new WebSocket('ws://localhost:8080');

class Chat extends Component {
    constructor(props) {
        super(props);
<<<<<<< HEAD
        //TODO Need to make it possible to add these to the program, possibly
        //store in local storage or on eventual CRM backend
        this.state = {
            messages: [],
            scrollable: true,
            noShow: [
                "Nightbot",
            ],
            noShowMessage: [
                "!give",
                "test",
                "wooooo",
            ],
=======
        this.state = {
            messages: [],
            scrollable: true,
>>>>>>> 2af8af657a41031cd27b9e5212e85b1953db85ea
        };

    }
    //TODO: Make Scroll button look nicer
    //TODO: Add Send Message

    scrollToBottom = () => {
        if(this.state.scrollable === true) {
            this.messageEnd.scrollIntoView( { behavior: "smooth" });
        }
    }

    scrollChange = () => {
        this.setState({
            scrollable: !this.state.scrollable
        })
    }

    componentDidMount() {
        ws.onopen = () => {
            ws.send("connected");
        }

        ws.onmessage = (message) => {
            message = JSON.parse(message.data);
            let parsedMessage = this.messageCreator(message);
            this.setState({
                messages: this.state.messages.concat(
                    parsedMessage
                )
            });
        }
    }

    componentDidUpdate () {
        this.scrollToBottom();
    }


    messageCreator = (messageObject) => {
        let name = messageObject.name;
<<<<<<< HEAD
        if(this.state.noShow.indexOf(name) > -1) {
            return;
        }
        let message = messageObject.msg;
        let showMessage = this.state.noShowMessage.some(string => message.includes(string));
        if(showMessage) {
            return;
        }
=======
        let message = messageObject.msg;
>>>>>>> 2af8af657a41031cd27b9e5212e85b1953db85ea
        let emoteObjectArray = messageObject.emoteData;
        let color = messageObject.color;
        let mod = messageObject.mod;

        let parsedMessage = this.parseMessage(message, emoteObjectArray);
        let modDiv = (messageObject.mod) ?
            <span>
                <img className="mod-badge" alt=""
                    src={"https://static-cdn.jtvnw.net/badges/v1/3267646d" +
                        "-33f0-4b17-b3df-f923a41db1d0/3"}/>
            </span>:"" ;
        return (
            <div className="chat-line" >
                {modDiv}
                <span style={{color:messageObject.color }}>
                    {messageObject.name}
                </span>
                : {parsedMessage}
            </div> )
    }

    parseMessage = (message, emoteObjectArray) => {
        if(emoteObjectArray.length === 0) {
            return message;
        }

        let parsedMessage = [];
        emoteObjectArray.sort((a, b) =>
            (parseInt(a.startPos) > parseInt(b.startPos)) ? 1 : -1)
        let currentPos = 0;
        for(let i = 0; i < emoteObjectArray.length; i++) {
            if(emoteObjectArray[i].startPos == currentPos) {
                parsedMessage.push(this.emoteDivMaker(emoteObjectArray[i].url));
                currentPos = parseInt(emoteObjectArray[i].endPos) + 1;
            } else {
                parsedMessage.push(message
                    .substring(currentPos, emoteObjectArray[i].startPos));
                parsedMessage.push(this.emoteDivMaker(emoteObjectArray[i].url));
                currentPos = parseInt(emoteObjectArray[i].endPos) + 1;
            }
            if(i == emoteObjectArray.length - 1
                && currentPos < message.length) {
                parsedMessage.push(message.substring(currentPos));
            }
        }

        return parsedMessage;
    }

    emoteDivMaker = (url) => {
        return (
            <span>
                <img src={url} alt="emote"/>
            </span>
        )
    }

    render() {
<<<<<<< HEAD
        let scrollClass;
        if(this.state.scrollable) {
            scrollClass = "";
        } else {
            scrollClass = "scrollable-button-clicked";
        }
        return (
            <div className="chat-box">

                <button className={"scrollable-button " + scrollClass}
                    onClick={this.scrollChange}>
                        Scroll
=======
        return (
            <div className="chat-box">
                <button className="scrollable-button"
                    onClick={this.scrollChange}>
                        Scrol
>>>>>>> 2af8af657a41031cd27b9e5212e85b1953db85ea
                </button>
                <div className="chat-line-section">
                    {this.state.messages}
                    <div style={{ float:"left", clear:"both" }}
                        ref={el => { this.messageEnd = el; }}>
                    </div>
                </div>
            </div>
            )
    }

}

export default Chat;
