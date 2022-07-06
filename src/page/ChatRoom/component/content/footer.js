import React, { useContext, useRef } from 'react';
import Context from '~/context/context';
import { addDoc } from '~/firebase/services';

import './footer.scss';

function Footer() {
    const context = useContext(Context);

    const [inputValue, setInputValue] = React.useState('');

    const handleInput = (e) => {
        setInputValue(e.target.value);
    };

    const input = useRef(null);

    const handleSubmit = (e) => {
        if (inputValue.length > 0) {
            addDoc('messages', {
                content: inputValue,
                uid: context.user.uid,
                photoURL: context.user.photoURL,
                displayName: context.user.displayName,
                roomId: context.listRoom[context.indexRoom].id,
            });
            setInputValue('');
            input.current.focus();
            input.current.value = '';
        } else {
            alert('Please enter message');
        }
    };

    return (
        <div className="chat-room-content-footer">
            <div className="footer-input">
                <input
                    ref={input}
                    type="text"
                    placeholder="Type a message..."
                    onChange={(e) => handleInput(e)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSubmit();
                        }
                    }}
                />
                <i className="bi ic-emoji bi-emoji-smile-fill"></i>
            </div>
            <button className="send" onClick={(e) => handleSubmit(e)}>
                <i className="bi ic-send bi-send"></i>
            </button>
        </div>
    );
}

export default Footer;
