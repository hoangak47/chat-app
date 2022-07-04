import React from 'react';

import './footer.scss';

function Footer() {
    return (
        <div className="chat-room-content-footer">
            <div className="footer-input">
                <input type="text" placeholder="Type a message..." />
                <i className="bi ic-emoji bi-emoji-smile-fill"></i>
            </div>
            <button className="send">
                <i className="bi ic-send bi-send"></i>
            </button>
        </div>
    );
}

export default Footer;
