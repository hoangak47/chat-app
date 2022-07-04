import React from 'react';

import './header.scss';

function Header({ context }) {
    return (
        <div className="chat-room-content-header">
            <div className="avatar">
                <img src={context.avatarRoom} alt="user" />
                <span>{context.nameRoom}</span>
            </div>
            <div className="header-right">
                <i className="bi ic-user-add bi-person-plus"></i>
                <ul className="user-list">
                    {/* {context.listRoom[context.indexRoom - 1].users.slice(0, 2).map((room, index) => {
                        return (
                            <li key={index}>
                                <div className="user-list-item">
                                    <img src={room.avatar} alt="user" />
                                </div>
                            </li>
                        );
                    })}
                    {context.listRoom[context.indexRoom - 1].users.length > 2 && (
                        <li>
                            <div className="user-list-item more">
                                <span>+{context.listRoom[context.indexRoom - 1].users.length - 2}</span>
                                <ul className="more-users">
                                    {context.listRoom[context.indexRoom - 1].users.slice(2).map((room, index) => {
                                        return (
                                            <li key={index}>
                                                <div className="user-list-item">
                                                    <img src={room.avatar} alt="user" />
                                                    <span>{room.name}</span>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </li>
                    )} */}
                </ul>
            </div>
        </div>
    );
}

export default Header;
