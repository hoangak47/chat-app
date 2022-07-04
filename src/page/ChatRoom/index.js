/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import Context from '~/context/context';

import './chat_room.scss';
import ChangeTheme from './component/changeTheme';
import Body from './component/content/body';
import Footer from './component/content/footer';
import Header from './component/content/header';
import HandleChangeInput from './component/handleChangeInput';
import SectionBody from './component/sectionBody';
import SectionHeader from './component/sectionHeader';

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

    const labelName = useRef(null);
    const inputName = useRef(null);

    const inputRoom = useRef(null);
    const labelRoom = useRef(null);

    return (
        <div className="chat-room">
            <div className="chat-room-section">
                <SectionHeader context={context} theme={theme} setTheme={setTheme} />
                <SectionBody context={context} navigate={navigate} setModal={setModal} />
            </div>
            <div className="chat-room-content">
                <Header context={context} />
                <Body context={context} />
                <Footer context={context} />
            </div>
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
                                    onChange={() => HandleChangeInput(inputName, labelName)}
                                />
                                <label ref={labelName}>Room Name</label>
                            </div>

                            <div className="formInput">
                                <input
                                    ref={inputRoom}
                                    className="input"
                                    type="text"
                                    onChange={() => HandleChangeInput(inputRoom, labelRoom)}
                                />
                                <label ref={labelRoom}>Room Describe</label>
                            </div>
                        </div>
                        <div className="submit">
                            <button
                                type="button"
                                onClick={() => setModal(false)}
                                className="btn btn-submit btn-secondary"
                            >
                                Cancel
                            </button>
                            <button type="button" class="btn btn-submit btn-primary">
                                Add room
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChatRoom;
