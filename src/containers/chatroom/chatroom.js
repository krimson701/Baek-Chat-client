import React from 'react';
import SockJsClient from "react-stomp";
import { TalkBox } from "react-talk";
import axios from 'axios';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { WebServerConstant } from '../../constants';

class Chatroom extends React.Component {
 
  constructor(props) {
    console.log("생성자 발동");
    
    super(props);
    // randomUserId is used to emulate a unique user id for this demo usage
    this.userName = this.props.userInfo.email;
    this.userId = parseInt(this.props.userInfo.id);
    this.channelNo = this.props.match.params.channelNo;
    this.sendURL = "/message";
    this.state = {
      clientConnected : false,
      messages : []
    };
  }

  onMessageReceive = (msg, topic) => {
    msg.author = msg.userNo;
    
    //alert(JSON.stringify(msg) + " @ " +  JSON.stringify(this.state.messages)+" @ " + JSON.stringify(topic));
    this.setState(prevState => ({
      messages: [...prevState.messages, msg]
    }));
  }

  sendMessage = (msg, selfMsg) => {
    try {
      var send_message = {
        "userNo": this.userId,
        "userEmail": this.userEmail,
        "message": selfMsg.message,
        "channelNo": this.channelNo
      }
      this.clientRef.sendMessage("/app/message", JSON.stringify(send_message));
      return true;
    } catch (e) {
      return false;
    }
  }

  componentDidMount() {
    console.log("param check");
    console.log(this.channelNo);
    console.log("call history");
    const token = localStorage.getItem("Authorization")
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': token
    }
    
    axios.get(
      WebServerConstant.Server.API_HOST + "/messenger/history/" + this.channelNo, {
      headers: headers
    }).then((response) => {
      console.log(response);
      
      response.data.forEach(element => {
        element.author = element.userNo;  // 추후 서버에서 userNo으로 userName을 찾아서 같이 내려올예정 (몽고db에 같이넣을까 체크해바야함)
      });
      this.setState({ messages: response.data.reverse() });
    });
  }

  render() {
    const wsSourceUrl = WebServerConstant.Server.API_HOST + "/chatting";
    return (
      <>
        <TalkBox style={{width: "100%", height: "100%"}} 
          topic={"/topic/public/"+this.channelNo} currentUserId={ this.userId }
          currentUser={ this.userName } messages={ this.state.messages }
          onSendMessage={ this.sendMessage } connected={ this.state.clientConnected }/>
        
        <SockJsClient url={ wsSourceUrl } topics={["/topic/public/"+this.channelNo]}
          onMessage={ this.onMessageReceive } ref={ (client) => { this.clientRef = client }}
          onConnect={ () => {this.setState({ clientConnected: true }) } }
          onDisconnect={ () => { this.setState({ clientConnected: false }) } }
          debug={ false } style={[{width:'100%', height:'100%'}]}/>
      </>
    );
  }
}

const mapStateToProp = (state) => {
  return {
    userInfo: state.userReducer.userInfo
  };
}

export default connect(mapStateToProp)(Chatroom);