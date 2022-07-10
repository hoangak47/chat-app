/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { message } from 'antd';
import React, { useContext, useState } from 'react';
import { AppContext } from '~/context/appProvider';
import { auth, db } from '~/firebase/config';
import { addDoc } from '~/firebase/services';

import _ from 'lodash';

import './nav.scss';

function SectionBody({ context, setModal }) {
    const appContext = useContext(AppContext);

    const tab = ['Chats', 'Friends'];
    const [tabActive, setTabActive] = useState(0);

    return (
        <div className="chat-room-section-body">
            <div className="chat-room-search-content">
                <div className="chat-room-search">
                    <i className="bi ic-search bi-search"></i>
                    <input type="text" placeholder="Search" />
                </div>
            </div>
            <div className="tab">
                {tab.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className={`tab-item ${tabActive === index ? 'active' : ''}`}
                            onClick={() => {
                                setTabActive(index);
                            }}
                        >
                            {item}
                        </div>
                    );
                })}
            </div>
            <ul className="chat-room-list">
                {tabActive === 0 ? (
                    <>
                        {appContext.rooms.length !== 0 ? (
                            appContext.rooms.map((room, index) => {
                                return (
                                    <li
                                        key={room.id}
                                        className={
                                            index === context.indexRoom
                                                ? 'chat-room-list-item active'
                                                : 'chat-room-list-item'
                                        }
                                        onClick={() => {
                                            context.setRoom(index);
                                        }}
                                    >
                                        <img
                                            className="chat-room-list-item-avatar"
                                            src={
                                                room.type === 'friend'
                                                    ? room.nameCreate === context.user.displayName
                                                        ? room.avatarRoom
                                                        : room.avatarRoomCreate
                                                    : room.avatarRoom
                                            }
                                            alt="user"
                                        />
                                        <span className="chat-room-list-item-name ">
                                            {room.type === 'friend'
                                                ? room.nameCreate === context.user.displayName
                                                    ? room.name
                                                    : room.nameCreate
                                                : room.name}
                                        </span>
                                    </li>
                                );
                            })
                        ) : (
                            <li className="no-friend">No Room</li>
                        )}
                    </>
                ) : (
                    <>
                        {appContext.userRef?.map((user) => {
                            const as = appContext.infoUsers[0]?.friend.map((friend) => {
                                if (user.uid === friend) {
                                    return (
                                        <li
                                            key={friend}
                                            className="chat-room-list-item"
                                            onClick={() => {
                                                let test;
                                                context.listRoom.map((room) => {
                                                    if (
                                                        room.members.includes(friend) &&
                                                        room.members.includes(context.user.uid)
                                                    ) {
                                                        test = true;
                                                    }
                                                });

                                                if (test) {
                                                    context.listRoom.map((room, index) => {
                                                        if (
                                                            room.members.includes(friend) &&
                                                            room.members.includes(context.user.uid)
                                                        ) {
                                                            context.setRoom(index);
                                                            setTabActive(0);
                                                        }
                                                        if (
                                                            !room.members.includes(friend) &&
                                                            !room.members.includes(context.user.uid)
                                                        ) {
                                                            alert('You are not in this room');
                                                        }
                                                    });
                                                } else {
                                                    context.setNameRoom(user.displayName);
                                                    context.setAvatarRoom(user.photoURL);
                                                    context.setMembers([friend]);
                                                    const data = {
                                                        type: 'friend',
                                                        name: user.displayName,
                                                        avatarRoom:
                                                            user.photoURL ||
                                                            'https://graph.facebook.com/3648135422079660/picture',
                                                        members: [friend, context.user.uid],
                                                        nameCreate: context.user.displayName,
                                                        avatarRoomCreate: context.user.photoURL,
                                                    };
                                                    addDoc('rooms', data);
                                                    setTabActive(0);
                                                    context.setRoom(context.listRoom.length);
                                                }
                                            }}
                                        >
                                            <img
                                                className="chat-room-list-item-avatar"
                                                src={user.photoURL}
                                                alt="user"
                                            />
                                            <span className="chat-room-list-item-name ">{user.displayName}</span>
                                        </li>
                                    );
                                }
                            });
                            return as;
                        })}
                    </>
                )}
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
