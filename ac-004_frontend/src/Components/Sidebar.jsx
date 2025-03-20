import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
    return (<div className="sidebar">
        <div className="user-section">
            <div className="user-icon"></div>
            <p>User</p>
        </div>
        <div className="tasks-section">
            <p>Long-Term Tasks</p>
            {[...Array(4)].map((_, i) => (<div key={i} className="task">
                TIME | TASK {i + 1}
            </div>))}
            <div className="add-task">+ Add new</div>
        </div>
        <div className="date-section">
            <p>02</p>
            <p>JULY</p>
            <p>2021</p>
        </div>
        <div className="options-section">
            <p>SETTINGS</p>
            <p>LOG OUT</p>
        </div>
    </div>);
};

export default Sidebar;
