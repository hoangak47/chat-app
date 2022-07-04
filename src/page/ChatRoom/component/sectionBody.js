/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { AppContext } from '~/context/appProvider';
import firebase, { auth, db } from '~/firebase/config';
import useFirestore from '~/hooks/useFirestore';

function SectionBody({ context, navigate, setModal }) {
    const rooms = useContext(AppContext);

    return (
        <div className="chat-room-section-body">
            <div className="chat-room-search-content">
                <div className="chat-room-search">
                    <i className="bi ic-search bi-search"></i>
                    <input type="text" placeholder="Search" />
                </div>
            </div>
            <ul className="chat-room-list">
                {rooms?.map((room, index) => {
                    return (
                        <li
                            key={room.id}
                            className={
                                index === context.indexRoom ? 'chat-room-list-item active' : 'chat-room-list-item'
                            }
                            onClick={() => {
                                context.setRoom(index);
                                context.setNameRoom(room.name);
                                context.setAvatarRoom(room.avatarRoom);
                                context.setDescribeRoom(room.describe);
                            }}
                        >
                            <img className="chat-room-list-item-avatar" src={room.avatarRoom} alt="user" />
                            <span className="chat-room-list-item-name ">{room.name}</span>
                        </li>
                    );
                })}
            </ul>
            <button className="add-new-room" onClick={() => setModal(true)}>
                <i className="bi bi-plus-circle"></i>
                <span>Add new room</span>
            </button>
            <button
                className="log-out"
                onClick={() => {
                    auth.signOut();
                }}
            >
                LogOut
            </button>
        </div>
    );
}

export default SectionBody;
