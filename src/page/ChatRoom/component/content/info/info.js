import { CameraOutlined, DownOutlined, EditOutlined } from '@ant-design/icons';
import { Avatar, Button, message } from 'antd';
import React, { useContext, useState } from 'react';
import { AppContext } from '~/context/appProvider';
import Context from '~/context/context';
import { db, storage } from '~/firebase/config';

import './info.scss';

function Info() {
    const context = useContext(Context);
    const appContext = useContext(AppContext);

    const [activeMember, setActiveMember] = useState(false);
    const [activeCustom, setActiveCustom] = useState(false);

    const handleMakeFriend = (meid, uid, memberID) => {
        if (meid) {
            const userRef = db.collection('users').doc(appContext.infoUsers[0].id);

            userRef.update({
                friend: [...appContext.infoUsers[0].friend, uid],
            });

            const friendRef = db.collection('users').doc(memberID);

            const infoFriendRef = db.collection('users').where('uid', '==', uid);
            infoFriendRef.get().then((snapshot) => {
                snapshot.forEach((doc) => {
                    friendRef.update({
                        friend: [...doc.data().friend, meid],
                    });
                });
            });

            message.success('Make friend success');
        }
    };

    const [inputChangeName, setInputChangeName] = useState('');

    const handleUpdateNameRoom = () => {
        const roomsRef = db.collection('rooms').doc(context.listRoom[context.indexRoom].id);
        if (context.listRoom[context.indexRoom].type === 'room') {
            roomsRef.update({
                name: inputChangeName,
            });

            document.getElementById('checkEditName').checked = false;
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

            document.getElementById('checkEditName').checked = false;
            setInputChangeName('');
            message.success('Update name room success');

            return;
        }
    };

    const handleCancel = () => {
        document.getElementById('checkEditName').checked = false;
        setInputChangeName('');
        setImageUpload('');
    };

    const [imageUpload, setImageUpload] = useState();

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
                        <div className={`list ${activeMember ? 'active' : ''}`}>
                            {appContext.users.map((user, index) => {
                                return (
                                    <div className="item" key={index}>
                                        <Avatar size="default" src={user.photoURL} style={{ marginRight: '10px' }} />
                                        <span>{user.displayName}</span>
                                        {user.uid ===
                                        appContext.infoUsers[0]?.uid ? null : appContext.infoUsers[0]?.friend.includes(
                                              user.uid,
                                          ) ? null : (
                                            <div
                                                className="modal-add-friend"
                                                onClick={() => {
                                                    if (user.uid === appContext.infoUsers[0]?.uid) {
                                                        return;
                                                    }
                                                    if (appContext.infoUsers[0]?.friend.includes(user.uid)) {
                                                        message.error('You are friend');
                                                        return;
                                                    }
                                                    handleMakeFriend(context.user.uid, user.uid, user.id);
                                                }}
                                            >
                                                Make friends to chat
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
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
                                <div className="item friend">
                                    <input type="checkbox" id="checkEditName" />
                                    <label htmlFor="checkEditName" className="label">
                                        <EditOutlined className="ic-custom" />
                                        <div className="checkEditName">Edit name</div>
                                    </label>
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
                                    <div className="item friend">
                                        <input type="checkbox" id="checkEditName" />
                                        <label htmlFor="checkEditName" className="label">
                                            <EditOutlined className="ic-custom" />
                                            <div className="checkEditName">Edit name</div>
                                        </label>
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
                                    <div className="item friend">
                                        <input
                                            type="file"
                                            id="filePicker"
                                            className="file"
                                            onChange={(e) => {
                                                console.log(e.target.files[0]);
                                                setImageUpload(e.target.files[0]);
                                            }}
                                        />
                                        <label htmlFor="filePicker" className="label">
                                            <CameraOutlined className="ic-custom" />
                                            <span>Change Image</span>
                                        </label>
                                        {imageUpload && (
                                            <div className="box-btn upload-img">
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
                                        )}
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
