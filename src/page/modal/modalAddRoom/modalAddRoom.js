import { FileImageOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { message, notification } from 'antd';
import React, { useContext, useState } from 'react';
import Context from '~/context/context';
import { storage } from '~/firebase/config';
import { addDoc } from '~/firebase/services';
import './modalAddRoom.scss';

function ModalAddRoom({ modal, setModal }) {
    const context = useContext(Context);

    const [inputName, setInputName] = useState('');
    const [inputImg, setInputImg] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (inputName) {
            if (inputImg) {
                const uploadTask = storage.ref(`images/${inputImg.name}`).put(inputImg);
                uploadTask.on(
                    'state_changed',
                    (snapshot) => {},
                    (error) => {
                        console.log(error);
                    },
                    () => {
                        storage
                            .ref('images')
                            .child(inputImg.name)
                            .getDownloadURL()
                            .then((url) => {
                                addDoc('rooms', {
                                    name: inputName,
                                    avatarRoom: url,
                                    members: [context.user.uid],
                                    type: 'room',
                                });
                            });
                    },
                );
            } else {
                addDoc('rooms', {
                    name: inputName,
                    avatarRoom: context.user.photoURL,
                    members: [context.user.uid],
                    type: 'room',
                });
            }

            setModal(false);
            setInputName('');
            setInputImg('');
            message.success('Add room success');
        } else {
            if (inputImg) {
                const uploadTask = storage.ref(`images/${inputImg.name}`).put(inputImg);
                uploadTask.on(
                    'state_changed',
                    (snapshot) => {},
                    (error) => {
                        console.log(error);
                    },
                    () => {
                        storage
                            .ref('images')
                            .child(inputImg.name)
                            .getDownloadURL()
                            .then((url) => {
                                addDoc('rooms', {
                                    name: inputName,
                                    avatarRoom: url,
                                    members: [context.user.uid],
                                    type: 'room',
                                });
                            });
                    },
                );
                setModal(false);
                setInputName('');
                setInputImg('');
                message.success('Add room success');
            } else {
                notification.open({
                    message: 'Please enter room name',
                    duration: 2,
                    icon: <InfoCircleOutlined style={{ color: 'var(--color-secondary)' }} />,
                });
            }
        }
    };

    return (
        <div className={modal ? 'modal-add-room' : 'modal-add-room hide'}>
            <div className="content">
                <i className="bi ic-close bi-x-circle" onClick={() => setModal(false)}></i>
                <div className="title">Add new room</div>
                <form>
                    <div className="form">
                        <div className="formInput">
                            <input
                                className="input"
                                type="text"
                                name="name"
                                value={inputName}
                                onChange={(e) => setInputName(e.target.value)}
                            />
                            <label>Room Name</label>
                        </div>

                        <input
                            type="file"
                            id="img-add-room"
                            style={{ display: 'none' }}
                            onChange={(e) => {
                                if (!e.target.files[0]) {
                                    return;
                                }
                                if (e.target.files[0].type !== 'image/jpeg' && e.target.files[0].type !== 'image/png') {
                                    message.error('Please choose image jpeg or png');
                                    return;
                                }
                                setInputImg(e.target.files[0]);
                            }}
                        />
                        <label htmlFor="img-add-room" className="label">
                            <FileImageOutlined className="ic ic-up-img" />
                            Select images
                        </label>
                    </div>
                    <div className="submit">
                        <button type="button" onClick={() => setModal(false)} className="btn btn-submit btn-secondary">
                            Cancel
                        </button>
                        <button onClick={(e) => handleSubmit(e)} className="btn btn-submit btn-primary">
                            Add room
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalAddRoom;
