import React, { useContext } from 'react';
import Context from '~/context/context';

import './content/body.scss';

function Message({ img, name, mess, time, id }) {
    const context = useContext(Context);
    return (
        <div className={context.user && id === context.user.uid ? 'mess me' : 'mess'}>
            <img src={img} alt="avatar" />
            <div className="mess-content">
                <div className="detail">
                    <span className="name">{name}</span>
                    <span className="time">{time}</span>
                </div>
                <p className="mess-text">{mess}</p>
            </div>
        </div>
    );
}

export default Message;
