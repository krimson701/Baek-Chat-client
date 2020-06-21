import React, { useState, useEffect } from 'react';
import '../Sidebar.css';

function Sidebar({
    
}) {
    
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);


    const sidebarExpanded = () => (

        <div id="nav-content" >
            <ul>
                <li><a >Home</a></li>
                <li><a >Services</a></li>
                <li><a >Blog</a></li>
                <li><a >About</a></li>
                <li><a >Contact</a></li>
                <li className="small"><a>링크 비워둠</a><a>채워야함</a></li>
            </ul>
        </div>

    );

    const sidebarCollapsed = () => (
            <div className="button"
                onClick={() => setIsSidebarExpanded(true)}>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
            </div>
    );
    return (
        <div style={{ position: 'absolute', right: '10px' }}>
            {sidebarExpanded()}
            {/* {isSidebarExpanded && sidebarExpanded()}
            {isSidebarExpanded || sidebarCollapsed()} */}
        </div>
    )
}

export default Sidebar;
