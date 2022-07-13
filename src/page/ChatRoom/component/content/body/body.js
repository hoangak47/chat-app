import { formatRelative } from 'date-fns';
import React, { useContext, useEffect, useMemo, useRef } from 'react';
import Context from '~/context/context';
import useFirestore from '~/hooks/useFirestore';
import Message from '../../message';

import './body.scss';

function Body() {
    const context = useContext(Context);

    const condition = useMemo(() => {
        return {
            fieldName: 'roomId',
            operator: '==',
            compareValue: context.listRoom[context.indexRoom]?.id,
        };
    }, [context.indexRoom, context.listRoom]);

    const message = useFirestore('messages', condition);
    const lastText = useRef('');

    const formatTime = (time) => {
        let formatDate = '';

        if (time) {
            formatDate = formatRelative(new Date(time) * 1000, new Date());
            formatDate = formatDate.charAt(0).toUpperCase() + formatDate.slice(1);
        }

        return formatDate;
    };

    const body = useRef(null);

    useEffect(() => {
        body?.current.scrollTo({ top: body.current?.lastChild?.offsetTop });
    }, [message]);

    return (
        <div ref={body} className="chat-room-content-body">
            {message.length !== 0 ? (
                message.map((item, index) => {
                    return (
                        <Message
                            key={index}
                            avatar={item.photoURL}
                            name={item.displayName}
                            mess={item.content}
                            time={formatTime(item.createdAt?.seconds)}
                            id={item.uid}
                            lastText={message.length - 1 === index ? lastText : null}
                            img={item.img}
                        />
                    );
                })
            ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <h1 style={{ color: 'var(--color)' }}>Let's start chatting</h1>
                </div>
            )}
        </div>
    );
}

export default Body;
