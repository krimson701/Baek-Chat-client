import React from 'react';
import './App.css';
import SockJsClient from "react-stomp";
import UsernameGenerator from "username-generator";
import Fetch from "json-fetch";
import { TalkBox } from "react-talk";
import randomstring from"randomstring";

// 뭐좀 돼봐라

class App extends React.Component {
 
  constructor(props) {
    super(props);
    // randomUserId is used to emulate a unique user id for this demo usage
    this.randomUserName = UsernameGenerator.generateUsername("-");
    this.randomUserId = randomstring.generate();
    this.channelNo = 1;
    this.sendURL = "/message";
    this.state = {
      clientConnected : false,
      messages : []
    };
    
  }

  onMessageReceive = (msg, topic) => {
    //alert(JSON.stringify(msg) + " @ " +  JSON.stringify(this.state.messages)+" @ " + JSON.stringify(topic));
    this.setState(prevState => ({
      messages: [...prevState.messages, msg]
    }));
  }

  sendMessage = (msg, selfMsg) => {
    try {
      var send_message = {
        "user" : selfMsg.author,
        "message" : selfMsg.message,
        "channelNo" : this.channelNo
      }
      this.clientRef.sendMessage("/app/message", JSON.stringify(send_message));
      return true;
    } catch(e) {
      return false;
    }
  }
  
  componentWillMount() {
    console.log("call history");
    Fetch("http://ec2-18-213-155-163.compute-1.amazonaws.com:9090/history/"+this.channelNo , {
      method: "GET"
    }).then((response) => {
      response.body.forEach(element => {
        element.author=element.userNo;  // 추후 서버에서 userNo으로 userName을 찾아서 같이 내려올예정 (몽고db에 같이넣을까 체크해바야함)
      });
      this.setState({ messages: response.body.reverse() });
      console.log(response.body)
      
    });
  }

  render() {
    const wsSourceUrl = "http://ec2-18-213-155-163.compute-1.amazonaws.com:9090/chatting";
    return (
      <div>
        <TalkBox topic={"/topic/public/"+this.channelNo} currentUserId={ this.randomUserId }
          currentUser={ this.randomUserName } messages={ this.state.messages }
          onSendMessage={ this.sendMessage } connected={ this.state.clientConnected }/>
        
        <SockJsClient url={ wsSourceUrl } topics={["/topic/public/"+this.channelNo]}
          onMessage={ this.onMessageReceive } ref={ (client) => { this.clientRef = client }}
          onConnect={ () => {this.setState({ clientConnected: true }) } }
          onDisconnect={ () => { this.setState({ clientConnected: false }) } }
          debug={ false } style={[{width:'100%', height:'100%'}]}/>
      </div>
    );
  }
}

export default App;