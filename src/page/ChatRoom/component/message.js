import { Avatar } from 'antd';
import React, { useContext } from 'react';
import Context from '~/context/context';

import './content/body.scss';

function Message({ img, name, mess, time, id, lastText }) {
    const context = useContext(Context);
    return (
        <div ref={lastText ? lastText : null} className={context.user && id === context.user.uid ? 'mess me' : 'mess'}>
            {img ? (
                <img className="messImg" src={img} alt="avatar" />
            ) : (
                <Avatar className="messImg" style={{ marginLeft: 'unset' }} size="default">
                    {!img && name.charAt(0)?.toUpperCase()}
                </Avatar>
            )}
            <div className="mess-content">
                <div className="detail">
                    <span className="name">{name}</span>
                    <span className="time">{time}</span>
                </div>
                <div className="text">
                    <p className="mess-text">{mess}</p>
                </div>
            </div>
        </div>
    );
}

export default Message;
