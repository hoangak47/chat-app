import { CameraOutlined, DownOutlined, EditOutlined } from '@ant-design/icons';
import { Avatar, Button, message } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '~/context/appProvider';
import Context from '~/context/context';
import { db, storage } from '~/firebase/config';

import './info.scss';

function Info({ setModalAdd }) {
    const context = useContext(Context);
    const appContext = useContext(AppContext);

    const [activeMember, setActiveMember] = useState(false);
    const [activeCustom, setActiveCustom] = useState(false);

    const handleMakeFriend = (meId, uid, docID) => {
        const userRef = db.collection('users').doc(appContext.infoUsers[0].id);

        userRef.update({
            friend: [...appContext.infoUsers[0].friend, uid],
        });

        const friendRef = db.collection('users').doc(docID);

        appContext.users.forEach((user) => {
            if (user.uid === uid) {
                friendRef.update({
                    friend: [...user.friend, meId],
                });
            }
        });

        message.success('Make friend success');
    };

    const handleUnFriend = (meId, uid, docID) => {
        appContext.infoUsers[0].friend.splice(appContext.infoUsers[0].friend.indexOf(uid), 1);
        const userRef = db.collection('users').doc(appContext.infoUsers[0].id);
        userRef.update({
            friend: appContext.infoUsers[0].friend,
        });

        const friendRef = db.collection('users').doc(docID);
        appContext.users.forEach((user) => {
            console.log(user);
            if (user.uid === uid) {
                user.friend.splice(user.friend.indexOf(meId), 1);
                friendRef.update({
                    friend: user.friend,
                });
            }
        });
    };

    const [inputChangeName, setInputChangeName] = useState('');

    const handleUpdateNameRoom = () => {
        const roomsRef = db.collection('rooms').doc(context.listRoom[context.indexRoom].id);
        if (context.listRoom[context.indexRoom].type === 'room') {
            roomsRef.update({
                name: inputChangeName,
            });

            input.current.checked = false;
            setInputChangeName('');
            message.success('Update name room success');
            return;
        }

        if (context.listRoom[context.indexRoom].type === 'friend') {
            if (context.listRoom[context.indexRoom].members[0] === context.user.uid) {
                roomsRef.update({
                    nameCreate: inputChangeName,
                });
            } else {
                roomsRef.update({
                    name: inputChangeName,
                });
            }

            input.current.checked = false;
            setInputChangeName('');
            message.success('Update name room success');
            input.current.checked = false;

            return;
        }
    };

    const handleCancel = () => {
        input.current.checked = false;
        setInputChangeName('');
        setImageUpload('');
    };

    const [imageUpload, setImageUpload] = useState(null);

    const handleUploadImage = () => {
        if (!imageUpload) {
            message.error('Please choose image');
            return;
        }
        if (imageUpload.type !== 'image/jpeg' && imageUpload.type !== 'image/png') {
            message.error('Please choose image jpeg or png');
            return;
        }
        const uploadTask = storage.ref(`images/${imageUpload.name}`).put(imageUpload);
        uploadTask.on(
            'state_changed',
            (snapshot) => {},
            (error) => {
                console.log(error);
            },
            () => {
                storage
                    .ref('images')
                    .child(imageUpload.name)
                    .getDownloadURL()
                    .then((url) => {
                        const roomsRef = db.collection('rooms').doc(context.listRoom[context.indexRoom].id);
                        roomsRef.update({
                            avatarRoom: url,
                        });
                        message.success('Upload image success');
                    });
            },
        );
        setImageUpload('');
    };

    const input = useRef(null);
    const list = useRef(null);
    const item = useRef(null);

    useEffect(() => {
        if (activeMember) {
            list.current.style.height = `${appContext.users.length * 42}px`;
        } else {
            list.current.style.height = '0px';
        }
    }, [activeMember, appContext.users]);

    return (
        <div className="info-room">
            <div className="info-room-header">
                <div className="avatar">
                    <Avatar
                        size="large"
                        style={{ marginRight: '10px' }}
                        src={
                            context.listRoom[context.indexRoom]?.type === 'friend'
                                ? context.listRoom[context.indexRoom]?.members[1] === context.user.uid
                                    ? context.listRoom[context.indexRoom]?.avatarRoom
                                    : context.listRoom[context.indexRoom]?.avatarRoomCreate
                                : context.listRoom[context.indexRoom]?.avatarRoom
                        }
                    >
                        {context.avatarRoom ? '' : context.nameRoom?.charAt(0)?.toUpperCase()}
                    </Avatar>
                    <div className="detail">
                        <span>
                            {context.listRoom[context.indexRoom]?.type === 'friend'
                                ? context.listRoom[context.indexRoom]?.members[1] === context.user.uid
                                    ? context.listRoom[context.indexRoom]?.name
                                    : context.listRoom[context.indexRoom]?.nameCreate
                                : context.listRoom[context.indexRoom]?.name}
                        </span>
                    </div>
                </div>
            </div>
            <div className="info-room-body">
                <div className="list-control-info">
                    <div>
                        <div className="title" onClick={() => setActiveMember(!activeMember)}>
                            <h3>Members chat</h3>
                            {activeMember ? <DownOutlined rotate={180} /> : <DownOutlined />}
                        </div>
                        <div ref={list} className={`list ${activeMember ? 'active' : ''}`}>
                            {appContext.users.map((user, index) => {
                                return (
                                    <div
                                        ref={item}
                                        className="item"
                                        key={index}
                                        onMouseEnter={() => {
                                            if (user.uid !== appContext.infoUsers[0]?.uid) {
                                                list.current.style.height = `${appContext.users.length * 42 + 40}px`;
                                            }
                                        }}
                                        onMouseLeave={() => {
                                            if (user.id !== context.user.uid) {
                                                list.current.style.height = `${appContext.users.length * 42}px`;
                                            }
                                        }}
                                    >
                                        <div className="member-info">
                                            <Avatar size="default" src={user.photoURL} />
                                            <span className="item-name-info">{user.displayName}</span>
                                        </div>
                                        {user.uid ===
                                        appContext.infoUsers[0]?.uid ? null : appContext.infoUsers[0]?.friend.includes(
                                              user.uid,
                                          ) ? (
                                            <div className="modal-add-friend">
                                                <Button
                                                    className="btn"
                                                    type="primary"
                                                    danger
                                                    size={'small'}
                                                    onClick={() => {
                                                        handleUnFriend(context.user.uid, user.uid, user.id);
                                                    }}
                                                >
                                                    Unfriend
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="modal-add-friend">
                                                <Button
                                                    className="btn"
                                                    type="primary"
                                                    size={'small'}
                                                    onClick={() => {
                                                        handleMakeFriend(context.user.uid, user.uid, user.id);
                                                    }}
                                                >
                                                    Make friend
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                            {context.listRoom[context.indexRoom]?.type !== 'friend' && (
                                <div className="new-member-mb" onClick={() => setModalAdd(true)}>
                                    <i className="bi ic-user-add bi-person-plus"></i>
                                    <span>Add new members</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <div
                            className="title"
                            onClick={() => {
                                setActiveCustom(!activeCustom);
                            }}
                        >
                            <h3>Customize the chat</h3>
                            {activeCustom ? <DownOutlined rotate={180} /> : <DownOutlined />}
                        </div>
                        <div className={`list ${activeCustom ? 'active' : ''}`}>
                            {context.listRoom[context.indexRoom]?.type === 'friend' ? (
                                <div className="item friend custom">
                                    <input ref={input} type="checkbox" id="checkEditName" />
                                    <div
                                        className="label"
                                        onClick={() => {
                                            if (input.current?.checked) {
                                                input.current.checked = false;
                                                setInputChangeName('');
                                            } else {
                                                input.current.checked = true;
                                            }
                                        }}
                                    >
                                        <EditOutlined className="ic-custom" />
                                        <div className="checkEditName">Edit name</div>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Edit name"
                                        className="edit-name"
                                        value={inputChangeName}
                                        onChange={(e) => setInputChangeName(e.target.value)}
                                    />
                                    <div className="box-btn">
                                        <Button
                                            className="btn"
                                            type="primary"
                                            size={'small'}
                                            onClick={() => handleUpdateNameRoom()}
                                        >
                                            Update
                                        </Button>
                                        <Button
                                            className="btn btn-cancel"
                                            size={'small'}
                                            onClick={() => handleCancel()}
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="item friend custom">
                                        <input ref={input} type="checkbox" id="checkEditName" />
                                        <div
                                            className="label"
                                            onClick={() => {
                                                if (input.current?.checked) {
                                                    input.current.checked = false;
                                                    setInputChangeName('');
                                                } else {
                                                    input.current.checked = true;
                                                }
                                            }}
                                        >
                                            <EditOutlined className="ic-custom" />
                                            <div className="checkEditName">Edit name</div>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Edit name"
                                            className="edit-name"
                                            value={inputChangeName}
                                            onChange={(e) => setInputChangeName(e.target.value)}
                                        />
                                        <div className="box-btn">
                                            <Button
                                                className="btn"
                                                type="primary"
                                                size={'small'}
                                                onClick={() => handleUpdateNameRoom()}
                                            >
                                                Update
                                            </Button>
                                            <Button
                                                className="btn btn-cancel"
                                                size={'small'}
                                                onClick={() => handleCancel()}
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="item friend custom">
                                        <div className="label">
                                            <CameraOutlined className="ic-custom" />
                                            <span>Change Image</span>
                                            <input
                                                type="file"
                                                id="filePicker"
                                                className="file"
                                                onChange={(e) => {
                                                    setImageUpload(e.target.files[0]);
                                                }}
                                            />
                                        </div>
                                        <div className={`box-btn upload-img ${imageUpload ? '' : 'hidden'}`}>
                                            <Button
                                                onClick={handleUploadImage}
                                                className="btn btn-change-img"
                                                type="primary"
                                                size={'small'}
                                            >
                                                Change Image
                                            </Button>
                                            <Button
                                                className="btn btn-cancel"
                                                size={'small'}
                                                onClick={() => handleCancel()}
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Info;
