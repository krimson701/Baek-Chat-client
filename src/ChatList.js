import React, { useState, Component } from "react"

import ChatMenu from './ChatMenu';
import ChatRoom from './ChatRoom';

class ChatList extends Component {
    render() {
        return (
            <div className="ChatList">
                <h2>ChatList</h2>
                <ChatMenu />
                <ChatRoom />
                <ChatRoom />
                <ChatRoom />
            </div>

        );
    }
}

export default ChatList