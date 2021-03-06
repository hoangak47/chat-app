/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from 'react';
import { AppContext } from '~/context/appProvider';
import { auth } from '~/firebase/config';
import { addDoc } from '~/firebase/services';

import './nav.scss';

function SectionBody({ context, setModal, setModalAddFriend }) {
    const appContext = useContext(AppContext);

    const tab = ['Chats', 'Friends'];
    const [tabActive, setTabActive] = useState(0);

    const handleClickFriend = (friend, user) => {
        let test;
        context.listRoom.map((room) => {
            if (room.members.includes(friend) && room.members.includes(context.user.uid) && room.type === 'friend') {
                test = true;
            }
        });

        if (test) {
            context.listRoom.map((room, index) => {
                if (
                    room.members.includes(friend) &&
                    room.members.includes(context.user.uid) &&
                    room.type === 'friend'
                ) {
                    context.setRoom(index);
                    setTabActive(0);
                }
                if (!room.members.includes(friend) && !room.members.includes(context.user.uid)) {
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
                avatarRoom: user.photoURL || 'https://graph.facebook.com/3648135422079660/picture',
                members: [friend, context.user.uid],
                nameCreate: context.user.displayName,
                avatarRoomCreate: context.user.photoURL,
            };
            addDoc('rooms', data);
            setTabActive(0);
            context.setRoom(context.listRoom.length);
        }
    };

    return (
        <div className="chat-room-section-body">
            <div className="chat-room-search-content">
                <div className="chat-room-search" onClick={() => setModalAddFriend(true)}>
                    <i className="bi ic-search bi-search"></i>
                    <span className="chat-room-search-text">Friends</span>
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
                        {context.listRoom.length !== 0 ? (
                            context.listRoom.map((room, index) => {
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
                                            context.setMenu(false);
                                        }}
                                    >
                                        <div style={{ position: 'relative' }}>
                                            <img
                                                className="chat-room-list-item-avatar"
                                                src={
                                                    room.type === 'friend'
                                                        ? room.members[1] === context.user.uid
                                                            ? room.avatarRoom
                                                            : room.avatarRoomCreate
                                                        : room.avatarRoom
                                                }
                                                alt="user"
                                            />

                                            {/* <div className="dot"></div> */}
                                        </div>
                                        <span className="chat-room-list-item-name ">
                                            {room.type === 'friend'
                                                ? room.members[1] === context.user.uid
                                                    ? room.name
                                                    : room.nameCreate
                                                : room.name}
                                        </span>
                                    </li>
                                );
                            })
                        ) : (
                            <li className="no-friend">
                                <strong>No Room!</strong>
                                <span>Please add new room and add members to use.</span>
                            </li>
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
                                            onClick={() => handleClickFriend(friend, user)}
                                        >
                                            <div>
                                                <img
                                                    className="chat-room-list-item-avatar"
                                                    src={user.photoURL}
                                                    alt="user"
                                                />
                                                {/* <div className="dot"></div> */}
                                            </div>
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
