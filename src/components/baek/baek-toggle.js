import React from 'react';
import styled from 'styled-components';

class BaekToggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isToggleOn: true };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(state => ({
            isToggleOn: !state.isToggleOn
        }));
        if(this.state.isToggleOn){  
            this.props.handleToggleOn();
        } else {
            this.props.handleToggleOff();
        }
    }

    render() {
        return (
            <Button onClick={this.handleClick}>
                {this.props.text}
            </Button>
        );
    }
}

const Button = styled.button`
  border: 0;
  width: 100%;
  height: 50px;
  text-decoration: none;
  font-weight: bold;
  padding: 6px 8px;
  font-size: 14px;
  color: white;
  background-color: #00567f;
  border-radius: 4px;
  margin: 4px;
  cursor: pointer;
  &:hover {
    background-color: #316b88;
  }
  &:selected {
    background-color: #82FA58;
  }
`;

export default BaekToggle;
