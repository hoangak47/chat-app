import { formatRelative } from 'date-fns';
import React, { useContext, useEffect, useMemo, useRef } from 'react';
import Context from '~/context/context';
import useFirestore from '~/hooks/useFirestore';
import Message from '../message';

import './body.scss';

function Body() {
    const context = useContext(Context);

    const condition = useMemo(() => {
        return {
            fieldName: 'roomId',
            operator: '==',
            compareValue: context.listRoom[context.indexRoom].id,
        };
    }, [context.indexRoom, context.listRoom]);

    const message = useFirestore('messages', condition);
    const body = useRef(null);

    useEffect(() => {
        console.log(body);
    }, [message]);

    const formatTime = (time) => {
        let formatDate = '';

        if (time) {
            formatDate = formatRelative(new Date(time) * 1000, new Date());
            formatDate = formatDate.charAt(0).toUpperCase() + formatDate.slice(1);
        }

        return formatDate;
    };

    return (
        <div ref={body} className="chat-room-content-body">
            {message.map((item, index) => {
                return (
                    <Message
                        key={index}
                        img={item.photoURL}
                        name={item.displayName}
                        mess={item.content}
                        time={formatTime(item.createdAt?.seconds)}
                        id={item.uid}
                    />
                );
            })}
        </div>
    );
}

export default Body;
