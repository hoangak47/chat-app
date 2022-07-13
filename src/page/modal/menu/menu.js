import { CloseCircleOutlined } from '@ant-design/icons';
import React, { useContext } from 'react';
import Context from '~/context/context';
import SectionBody from '~/page/ChatRoom/component/nav/sectionBody';
import SectionHeader from '~/page/ChatRoom/component/nav/sectionHeader';

import './menu.scss';

function Menu({ theme, setTheme }) {
    const context = useContext(Context);

    return (
        <div className={`menu ${context.menu ? '' : 'hide'}`}>
            <div className="content">
                <div className="close-menu" onClick={() => context.setMenu(false)}>
                    <CloseCircleOutlined />
                </div>
                <div className="chat-room-section">
                    <SectionHeader context={context} theme={theme} setTheme={setTheme} />
                    <SectionBody context={context} setModal={context.setModal} />
                </div>
            </div>
        </div>
    );
}

export default Menu;
