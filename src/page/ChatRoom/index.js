/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import Context from '~/context/context';

import { Alert } from 'antd';

import 'antd/dist/antd.min.css';

import './chat_room.scss';
import ChangeTheme from './component/changeTheme';
import Body from './component/content/body/body';
import Footer from './component/content/footer/footer';
import Header from './component/content/header/header';
import SectionBody from './component/nav/sectionBody';
import SectionHeader from './component/nav/sectionHeader';
import ModalAdd from '../modal/modalAddMembers/modalAdd';
import ModalAddRoom from '../modal/modalAddRoom/modalAddRoom';
import Info from './component/content/info/info';
import Menu from '../modal/menu/menu';
import ModalAddFriend from '../modal/modalAddFriend/modalAddFriend';

const ChatRoom = () => {
    const context = useContext(Context);
    const navigate = useNavigate();

    const [theme, setTheme] = useState(true);

    ChangeTheme(theme);

    useEffect(() => {
        if (context.user === null) {
            navigate(config.routes.login);
        }
    }, [context.user]);

    const [modalAdd, setModalAdd] = useState(false);

    useEffect(() => {
        if (window.innerWidth < 768 && context.listRoom.length === 0) {
            context.setMenu(true);
        }
    }, [context.listRoom]);

    const [modalAddFriend, setModalAddFriend] = useState(false);

    return (
        <div className="chat-room">
            <div className="chat-room-section">
                <SectionHeader context={context} theme={theme} setTheme={setTheme} />
                <SectionBody context={context} setModal={context.setModal} setModalAddFriend={setModalAddFriend} />
            </div>
            {context.listRoom.length > 0 ? (
                <div className="chat-room-content">
                    <Header context={context} setModalAdd={setModalAdd} />
                    <Body context={context} />

                    <Footer context={context} />
                </div>
            ) : (
                <div style={{ width: '100%' }}>
                    <div className="mb-header">
                        <Header context={context} setModalAdd={setModalAdd} />
                    </div>
                    <Alert
                        message="No room"
                        type="info"
                        showIcon
                        style={{ height: '50px', width: '40%', marginTop: '5%', marginLeft: '50px' }}
                        closable
                    />
                </div>
            )}
            {context.listRoom.length !== 0 && <Info />}

            <ModalAddRoom modal={context.modal} setModal={context.setModal} />

            <ModalAdd modalAdd={modalAdd} setModalAdd={setModalAdd} />

            <ModalAddFriend modalAddFriend={modalAddFriend} setModalAddFriend={setModalAddFriend} />

            <Menu theme={theme} setTheme={setTheme} setModalAddFriend={setModalAddFriend} />
        </div>
    );
};

export default ChatRoom;
