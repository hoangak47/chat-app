import { message } from 'antd';
import React, { useContext, useRef } from 'react';
import Context from '~/context/context';
import { addDoc } from '~/firebase/services';
import HandleChangeInput from '../ChatRoom/component/handleChangeInput';

import './modalAddRoom.scss';

function ModalAddRoom({ modal, setModal }) {
    const context = useContext(Context);

    const labelName = useRef(null);
    const inputName = useRef(null);

    const inputImg = useRef(null);
    const labelImg = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputName.current.value === '') {
            message.info('Please enter the full information');
            return;
        } else {
            const data = {
                name: inputName.current.value,
                avatarRoom: inputImg.current.value || 'https://graph.facebook.com/3648135422079660/picture',
                members: [context.user.uid],
                type: 'room',
            };
            addDoc('rooms', data);
            setModal(false);
            message.success('Add room success');
            inputName.current.value = null;
            inputImg.current.value = null;
        }
    };

    return (
        <div className={modal ? 'modal-add-room' : 'modal-add-room hide'}>
            <div className="content">
                <i className="bi ic-close bi-x-circle" onClick={() => setModal(false)}></i>
                <div className="title">Add new room</div>
                <form>
                    <div className="form">
                        <div className="formInput">
                            <input
                                ref={inputName}
                                className="input"
                                type="text"
                                name="name"
                                onChange={() => HandleChangeInput(inputName, labelName)}
                            />
                            <label ref={labelName}>Room Name</label>
                        </div>

                        <div className="formInput">
                            <input
                                ref={inputImg}
                                className="input"
                                type="text"
                                name="image"
                                onChange={() => HandleChangeInput(inputImg, labelImg)}
                            />
                            <label ref={labelImg}>Room Image</label>
                        </div>
                    </div>
                    <div className="submit">
                        <button type="button" onClick={() => setModal(false)} className="btn btn-submit btn-secondary">
                            Cancel
                        </button>
                        <button onClick={(e) => handleSubmit(e)} className="btn btn-submit btn-primary">
                            Add room
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalAddRoom;
