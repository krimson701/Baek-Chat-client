import React, { useState, Component } from "react"

import SideMenu from './SideMenu';

class SideBar extends Component {
    render() {
        return (

            <div className="SideBar">
                <p>SideBar</p>
                <SideMenu />
                <SideMenu />
                <SideMenu />
            </div>
        );
    }
}

export default SideBar