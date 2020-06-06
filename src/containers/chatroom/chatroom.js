import React from 'react';
import SockJsClient from "react-stomp";
import { TalkBox } from "react-talk";
import { connect } from 'react-redux';
import { WebServerConstant } from '../../constants';

import {
  getChannelHist
} from '../../apis/chatting';

/**
 * 채팅방 컴포넌트
 * 
 */
class Chatroom extends React.Component {
 
  constructor(props) {
    super(props);
    // randomUserId is used to emulate a unique user id for this demo usage
    this.userName = this.props.userInfo.email;
    this.userId = parseInt(this.props.userInfo.id);
    this.sendURL = "/message";
    this.state = {
      channelNo : this.props.match.params.channelNo,
      clientConnected : false,
      messages : []
    };
  }

  componentWillReceiveProps(nextProps){
    
    console.log("componentWillReceiveProps");
    if(this.props.match.params.channelNo !== nextProps.match.params.channelNo){
      const currentChannelNo = nextProps.match.params.channelNo;
      localStorage.setItem("channelNo",currentChannelNo);
      this.setState({ channelNo: currentChannelNo },
        () => this.callHistory()) ;
    }
  }

  callHistory = async () => {
    const history = await getChannelHist(this.state.channelNo);
    history.forEach(element => {
      element.author = element.userNo;  // 추후 서버에서 userNo으로 userName을 찾아서 같이 내려올예정 (몽고db에 같이넣을까 체크해바야함)
    });
    this.setState({ messages: history.reverse() });
  }

  componentDidMount() {
    this.callHistory();
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
        "channelNo": this.state.channelNo
      }
      this.clientRef.sendMessage("/app/message", JSON.stringify(send_message));
      return true;
    } catch (e) {
      return false;
    }
  }


  render() {  
    const wsSourceUrl = WebServerConstant.Server.API_HOST + "/chatting";
    return (
      <>
        <TalkBox style={{ width: "100%", height: "100%" }}
          currentUserId={this.userId}
          currentUser={this.userName} messages={this.state.messages}
          onSendMessage={this.sendMessage} connected={this.state.clientConnected} />

        <SockJsClient url={ wsSourceUrl } topics={["/topic/public/"+this.state.channelNo]}
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