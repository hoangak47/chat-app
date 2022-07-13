import { Avatar } from 'antd';
import React, { useContext } from 'react';
import Context from '~/context/context';

import './content/body/body.scss';

function Message({ avatar, name, mess, time, id, lastText, img }) {
    const context = useContext(Context);
    return (
        <div ref={lastText ? lastText : null} className={context.user && id === context.user.uid ? 'mess me' : 'mess'}>
            {avatar ? (
                <img className="messImg" src={avatar} alt="avatar" />
            ) : (
                <Avatar className="messImg" style={{ marginLeft: 'unset' }} size="default">
                    {!avatar && name.charAt(0)?.toUpperCase()}
                </Avatar>
            )}
            <div className="mess-content">
                <div className="detail">
                    <span className="name">{name}</span>
                    <span className="time">{time}</span>
                </div>
                <div className="text">
                    {mess && <p className="mess-text">{mess}</p>}
                    {img && <img className="img-chat" alt="img" src={img} />}
                </div>
            </div>
        </div>
    );
}

export default Message;
