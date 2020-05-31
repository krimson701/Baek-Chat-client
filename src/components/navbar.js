import React, { FC, useState, MouseEvent, PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {
    getChannelList
} from '../apis/chatting';
import { WebServerConstant } from '../constants';

const MenuItems = ({ items, kind }) => {

    if (!kind) return <></>;

    return (
        <>
            {items.content.map(item => {
                if (item.visible) {
                    return (<NavItem key={item.to} to={`/channel/${item.to}`}>{item.text}</NavItem>);
                }
            })
            }
        </>
    );
};

class NavBar extends PureComponent {
    constructor(props) {
        super(props);
        this.channelList = [];
        this.navItems = {
            class: {
                open: true,
                content:
                    [{ to: "temp", text: "추후에 추가할 것이므로 임시로 비워놨습니다.", visible: true }]
            },
            private: {
                open: true,
                content:
                    [{ to: "electron", text: "데스크탑 앱 관리", visible: true }]
            }
        };
        this.openClass = true;
        this.openPrivate = true;
    }

    componentDidMount() {
        
        this.getChannelList();
      }
    
    getChannelList = async () => {
        try {
            const list = await getChannelList();
            console.log("채널리스트");
            console.log(list);
            
        } catch (e) {
            console.log(e);
        }
    }

    handleToggle = (e) => {
        const id = e.target.id;

        if (id === "class") {
            this.setOpenClass(!this.openClass);
        } else if (id === "private") {
            this.setOpenPrivate(!this.openPrivate);
        }
    };
    render(){
        return (
            <NavContainer>
                <Navigation>
                    <div>
                        <ToggleButton id="class" onClick={this.handleToggle}>강의방</ToggleButton>
                        <MenuItems key="class" items={this.navItems.class} kind={this.openClass} />

                        <ToggleButton id="private" onClick={this.handleToggle}>사설방</ToggleButton>
                        <MenuItems key="private" items={this.navItems.private} kind={this.openPrivate} />
                    </div>
                </Navigation>
            </NavContainer>
        );
    }
};

const mapStateToProps = ({ user }) => {
    return {
        user,
    };
};

export default connect(mapStateToProps)(NavBar);

const NavContainer = styled.nav`
  position: relative;
  width: 200px;
  flex: 0 1 300px;
  align-self: stretch;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    90deg,
    rgba(233, 233, 233, 1) 0%,
    rgba(233, 233, 233, 1) 92%,
    rgba(232, 232, 232, 1) 95%,
    rgba(210, 210, 210, 1) 100%
  );
`;

const Navigation = styled.div`
  margin-top: 60px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 0 20px 8px;
  height: 100vh;
  overflow-x: hidden;
  ::placeholder {
    color: #b1b1b1;
  }
  ::-webkit-scrollbar {
    width: 1px;
  }
  ::-webkit-scrollbar-track {
    box-shadow: none;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: rgba(225, 225, 225, 0.7);
  }
`;

const NavItem = styled(NavLink)`
  display: block;
  font-size: 16px;
  line-height: 2;
  color: #343434;
  text-decoration: none;
  list-style: none;
  padding: 0 8px;
  &:hover {
    border-left: 3px solid #ccc;
    color: black;
    background-color: #fafafa;
  }
  &.active {
    border-left: 3px solid #888;
    background-color: #fafafa;
    box-shadow: 0px 4px 5px #9999;
    color: #000;
    font-weight: bold;
  }
`;

const ToggleButton = styled(NavContainer.withComponent("button"))`
  font-weight: bold;
  font-size: 16px;
  text-align: left;
  height: 32px;
  cursor: pointer;
  border-width: 3px;
`;
