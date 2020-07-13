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
    
    if(this.props.match.params.channelNo !== nextProps.match.params.channelNo){
      const currentChannelNo = nextProps.match.params.channelNo;
      localStorage.setItem("channelNo",currentChannelNo);
      
      this.callHistory(currentChannelNo);
    }
  }

  callHistory = async (channelNo) => {
    const history = await getChannelHist(channelNo);
    history.forEach(element => {
      element.author = element.userNo;  // 추후 서버에서 userNo으로 userName을 찾아서 같이 내려올예정 (몽고db에 같이넣을까 체크해바야함)
    });
    this.setState({ messages: [], channelNo: channelNo });  
    // 이전채널 메세지가 state에 남아있는 상태로 렌더링 하는 문제로 한번 비워주고 소켓도 끊고 렌더링한뒤 
    this.setState({ messages: history.reverse(), channelNo: channelNo });
    // 여기서 메세지갈고 소켓 재연결한뒤 한번더 렌더링 합니다.
    }

  componentDidMount() {
    
    this.callHistory(this.state.channelNo);
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
      console.log(e);
      
      return false;
    }
  }
  render() {  
    const wsSourceUrl = WebServerConstant.Server.API_HOST + "/chatting";

    return (
      <>
        <TalkBox style={{ width: "100%", height: "85vh" }}
          currentUserId={this.userId}
          currentUser={this.userName} messages={this.state.messages}
          onSendMessage={this.sendMessage} connected={this.state.clientConnected} />

        <SockJsClient url={ wsSourceUrl } topics={["/topic/public/"+this.state.channelNo]}
          subscribeHeaders={{userNo: this.userId, channelNo: this.channelNo}}
          onMessage={ this.onMessageReceive } ref={ (client) => { this.clientRef = client }}
          onConnect={ () => {this.setState({ clientConnected: true }) } }
          onDisconnect={ () => { this.setState({ clientConnected: false }) } }
          debug={ true } style={[{width:'100%', height:'100%'}]}/>
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