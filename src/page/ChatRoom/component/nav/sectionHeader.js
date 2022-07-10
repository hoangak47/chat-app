import React from 'react';

function SectionHeader({ context, theme, setTheme }) {
    return (
        <div className="chat-room-section-header">
            <div className="chat-room-list-item avatar">
                {context.user !== null && context.user.photoURL !== null ? (
                    <img
                        className="chat-room-list-item-avatar"
                        src={context.user ? context.user.photoURL : 'https://imgur.com/uX3mOqs.jpg'}
                        alt="user"
                    />
                ) : (
                    <div className="user-list-item more">
                        <span>{context.user && context.user.displayName.charAt(0).toUpperCase()}</span>
                    </div>
                )}

                <span className="chat-room-list-item-name ">{context.user && context.user.displayName}</span>
            </div>
            <div className="theme-toggle" onClick={() => setTheme(!theme)}>
                {theme ? <i className="bi ic-theme bi-brightness-high"></i> : <i className="bi ic-theme bi-moon"></i>}
            </div>
        </div>
    );
}

export default SectionHeader;
