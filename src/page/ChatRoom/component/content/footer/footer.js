import React, { useContext, useRef, useState } from 'react';
import Context from '~/context/context';
import { addDoc } from '~/firebase/services';
import Picker from 'emoji-picker-react';

import './footer.scss';
import { message, notification } from 'antd';
import { CloseCircleOutlined, FileImageOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { storage } from '~/firebase/config';
import { AppContext } from '~/context/appProvider';

function Footer() {
    const context = useContext(Context);
    const appContext = useContext(AppContext);

    const [inputValue, setInputValue] = React.useState('');

    const handleInput = (e) => {
        setInputValue(e.target.value);
    };

    const input = useRef(null);

    const handleSubmit = (e) => {
        if (inputValue.length > 0) {
            if (imgInput) {
                const uploadTask = storage.ref(`images/${imgInput.name}`).put(imgInput);
                uploadTask.on(
                    'state_changed',
                    (snapshot) => {},
                    (error) => {
                        console.log(error);
                    },
                    () => {
                        storage
                            .ref('images')
                            .child(imgInput.name)
                            .getDownloadURL()
                            .then((url) => {
                                addDoc('messages', {
                                    content: inputValue,
                                    uid: context.user.uid,
                                    photoURL: context.user.photoURL,
                                    displayName: context.user.displayName,
                                    roomId: context.listRoom[context.indexRoom].id,
                                    img: url,
                                });
                            });
                    },
                );
            } else {
                addDoc('messages', {
                    content: inputValue,
                    uid: context.user.uid,
                    photoURL: context.user.photoURL,
                    displayName: context.user.displayName,
                    roomId: context.listRoom[context.indexRoom].id,
                    img: null,
                });
            }

            setInputValue('');
            setImgInput('');
            input.current.focus();
            input.current.value = '';
            setShowEmoji(false);
        } else {
            if (imgInput) {
                const uploadTask = storage.ref(`images/${imgInput.name}`).put(imgInput);
                uploadTask.on(
                    'state_changed',
                    (snapshot) => {},
                    (error) => {
                        console.log(error);
                    },
                    () => {
                        storage
                            .ref('images')
                            .child(imgInput.name)
                            .getDownloadURL()
                            .then((url) => {
                                addDoc('messages', {
                                    content: inputValue,
                                    uid: context.user.uid,
                                    photoURL: context.user.photoURL,
                                    displayName: context.user.displayName,
                                    roomId: context.listRoom[context.indexRoom].id,
                                    img: url,
                                });
                            });
                    },
                );
            } else {
                notification.open({
                    message: 'Please enter message',
                    duration: 2,
                    icon: <InfoCircleOutlined style={{ color: 'var(--color-secondary)' }} />,
                });
            }

            setInputValue('');
            setImgInput('');
            input.current.focus();
            input.current.value = '';
            setShowEmoji(false);
        }
    };

    const checkSubmit = (e) => {
        let index = 0;
        let check = false;
        if (context.listRoom[context.indexRoom].type === 'friend') {
            const indexUser = context.listRoom[context.indexRoom].members.indexOf(appContext.infoUsers[0].uid);
            if (indexUser === 1) {
                index = 0;
            } else {
                index = 1;
            }
            appContext.infoUsers[0].friend.forEach((friend) => {
                if (friend === context.listRoom[context.indexRoom].members[index]) {
                    check = true;
                }
            });
            if (check) {
                handleSubmit(e);
                return;
            }
            notification.open({
                message: 'You are not friend with this user',
                description: '',
                icon: <InfoCircleOutlined style={{ color: '#108ee9' }} />,
            });
            input.current.focus();
            input.current.value = '';
            setInputValue('');
            setImgInput('');
        } else {
            handleSubmit(e);
        }
    };

    const [showEmoji, setShowEmoji] = useState(false);

    const onEmojiClick = (event, emojiObject) => {
        setInputValue(inputValue + emojiObject.emoji);
    };

    const [imgInput, setImgInput] = useState(null);

    const emojiRef = useRef(null);
    document.onclick = (e) => {
        if (showEmoji) {
            if (e.target.closest('.emoji-picker-react') || e.target.closest('.ic-emoji')) {
                setShowEmoji(true);
            } else {
                setShowEmoji(false);
            }
        }
    };

    return (
        <div className="chat-room-content-footer">
            {imgInput && (
                <div className="preview-img">
                    <img className="img-preview" src={URL.createObjectURL(imgInput)} alt="preview" />
                    <CloseCircleOutlined className="ic-close-img" onClick={() => setImgInput(null)} />
                </div>
            )}
            <div className="footer-input">
                <input
                    value={inputValue}
                    ref={input}
                    type="text"
                    placeholder="Type a message..."
                    onChange={(e) => handleInput(e)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            checkSubmit(e);
                        }
                    }}
                />
                <input
                    type="file"
                    id="file"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                        if (!e.target.files[0]) {
                            return;
                        }
                        if (e.target.files[0].type !== 'image/jpeg' && e.target.files[0].type !== 'image/png') {
                            message.error('Please choose image jpeg or png');
                            return;
                        }
                        setImgInput(e.target.files[0]);
                    }}
                />
                <label htmlFor="file" className="label">
                    <FileImageOutlined className="ic ic-up-img" />
                </label>
                <i
                    className="bi ic ic-emoji bi-emoji-smile-fill"
                    onClick={() => {
                        input.current.focus();
                        setShowEmoji(!showEmoji);
                    }}
                ></i>
                {showEmoji && (
                    <div
                        ref={emojiRef}
                        className="emoji-ref"
                        style={{ position: 'absolute', bottom: '150%', right: '0' }}
                    >
                        <Picker onEmojiClick={onEmojiClick} />
                    </div>
                )}
            </div>
            <button className="send" onClick={(e) => checkSubmit(e)}>
                <i className="bi ic-send bi-send"></i>
            </button>
        </div>
    );
}

export default Footer;
