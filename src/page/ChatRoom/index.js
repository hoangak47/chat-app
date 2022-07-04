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

    return (
        <div className="chat-room">
            <div className="chat-room-section">
                <SectionHeader context={context} theme={theme} setTheme={setTheme} />
                <SectionBody context={context} navigate={navigate} />
            </div>
            <div className="chat-room-content">
                <Header context={context} />
                <Body context={context} />
                <Footer context={context} />
            </div>
        </div>
    );
};

export default ChatRoom;
