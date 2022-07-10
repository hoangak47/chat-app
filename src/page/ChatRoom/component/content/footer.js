import React, { useContext, useRef, useState } from 'react';
import Context from '~/context/context';
import { addDoc } from '~/firebase/services';
import Picker from 'emoji-picker-react';

import './footer.scss';
import { message } from 'antd';

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
            setShowEmoji(false);
        } else {
            message.info('Please enter message', 2);
        }
    };

    const [showEmoji, setShowEmoji] = useState(false);

    const onEmojiClick = (event, emojiObject) => {
        // console.log(emojiObject.emoji);
        setInputValue(inputValue + emojiObject.emoji);
    };

    return (
        <div className="chat-room-content-footer">
            <div className="footer-input">
                <input
                    value={inputValue}
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
                <i
                    className="bi ic-emoji bi-emoji-smile-fill"
                    onClick={() => {
                        input.current.focus();
                        setShowEmoji(!showEmoji);
                    }}
                ></i>
                {showEmoji && (
                    <div style={{ position: 'absolute', bottom: '150%', right: '0' }}>
                        <Picker onEmojiClick={onEmojiClick} />
                    </div>
                )}
            </div>
            <button className="send" onClick={(e) => handleSubmit(e)}>
                <i className="bi ic-send bi-send"></i>
            </button>
        </div>
    );
}

export default Footer;
