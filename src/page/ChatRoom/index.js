/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import Context from '~/context/context';
import { addDoc } from '~/firebase/services';

import { Alert } from 'antd';
// import 'antd/dist/antd.css';

import 'antd/dist/antd.min.css';

import './chat_room.scss';
import ChangeTheme from './component/changeTheme';
import Body from './component/content/body';
import Footer from './component/content/footer';
import Header from './component/content/header';
import HandleChangeInput from './component/handleChangeInput';
import SectionBody from './component/sectionBody';
import SectionHeader from './component/sectionHeader';
import ModalAdd from './component/modal/modalAdd';

const ChatRoom = () => {
    const context = useContext(Context);
    const navigate = useNavigate();

    const [theme, setTheme] = useState(false);

    ChangeTheme(theme);

    useEffect(() => {
        if (context.user === null) {
            navigate(config.routes.login);
        }
    }, [context.user]);

    const [modal, setModal] = useState(false);
    const [modalAdd, setModalAdd] = useState(false);

    const labelName = useRef(null);
    const inputName = useRef(null);

    const inputDescribe = useRef(null);
    const labelDescribe = useRef(null);

    const inputImg = useRef(null);
    const labelImg = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputName.current.value === '' || inputDescribe.current.value === '') {
            alert('Vui lòng nhập đầy đủ thông tin');
            return;
        } else {
            const data = {
                name: inputName.current.value,
                describe: inputDescribe.current.value,
                avatarRoom: inputImg.current.value || 'https://graph.facebook.com/3648135422079660/picture',
                members: [context.user.uid],
            };
            addDoc('rooms', data);
            setModal(false);
            alert('Thêm thành công');
            inputName.current.value = '';
            inputDescribe.current.value = '';
            inputImg.current.value = '';
        }
    };

    return (
        <div className="chat-room">
            <div className="chat-room-section">
                <SectionHeader context={context} theme={theme} setTheme={setTheme} />
                <SectionBody context={context} setModal={setModal} />
            </div>
            {context.listRoom.length > 0 ? (
                <div className="chat-room-content">
                    <Header context={context} setModalAdd={setModalAdd} />
                    <Body context={context} />
                    <Footer context={context} />
                </div>
            ) : (
                <Alert
                    message="No room"
                    type="info"
                    showIcon
                    style={{ height: '50px', width: '20%', marginTop: '5%', marginLeft: '50px' }}
                    closable
                />
            )}
            <div className={modal ? 'modal-add-room' : 'modal-add-room hide'}>
                <div className="content">
                    <i className="bi ic-close bi-x-circle" onClick={() => setModal(false)}></i>
                    <div className="title">Add new room</div>
                    <form>
                        <div className="form">
                            <div className="formInput">
                                <input
                                    ref={inputName}
                                    className="input"
                                    type="text"
                                    name="name"
                                    onChange={() => HandleChangeInput(inputName, labelName)}
                                />
                                <label ref={labelName}>Room Name</label>
                            </div>

                            <div className="formInput">
                                <input
                                    ref={inputDescribe}
                                    className="input"
                                    type="text"
                                    name="describe"
                                    onChange={() => HandleChangeInput(inputDescribe, labelDescribe)}
                                />
                                <label ref={labelDescribe}>Room Describe</label>
                            </div>

                            <div className="formInput">
                                <input
                                    ref={inputImg}
                                    className="input"
                                    type="text"
                                    name="image"
                                    onChange={() => HandleChangeInput(inputImg, labelImg)}
                                />
                                <label ref={labelImg}>Room Image</label>
                            </div>

                            {/* <input type={'file'} /> */}
                        </div>
                        <div className="submit">
                            <button
                                type="button"
                                onClick={() => setModal(false)}
                                className="btn btn-submit btn-secondary"
                            >
                                Cancel
                            </button>
                            <button onClick={(e) => handleSubmit(e)} className="btn btn-submit btn-primary">
                                Add room
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <ModalAdd modalAdd={modalAdd} setModalAdd={setModalAdd} />
        </div>
    );
};

export default ChatRoom;
