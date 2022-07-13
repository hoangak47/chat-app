import { Avatar } from 'antd';
import React, { useContext } from 'react';
import { AppContext } from '~/context/appProvider';

import './header.scss';

function Header({ context, setModalAdd }) {
    const appContext = useContext(AppContext);

    return (
        <div className="chat-room-content-header">
            <div className="avatar">
                <Avatar
                    size={'large'}
                    style={{ marginRight: '10px' }}
                    src={
                        context.listRoom[context.indexRoom]?.type === 'friend'
                            ? context.listRoom[context.indexRoom]?.members[1] === context.user.uid
                                ? context.listRoom[context.indexRoom]?.avatarRoom
                                : context.listRoom[context.indexRoom]?.avatarRoomCreate
                            : context.listRoom[context.indexRoom]?.avatarRoom
                    }
                >
                    {context.avatarRoom ? '' : context.nameRoom?.charAt(0)?.toUpperCase()}
                </Avatar>
                <div className="detail">
                    <span>
                        {context.listRoom[context.indexRoom]?.type === 'friend'
                            ? context.listRoom[context.indexRoom]?.members[1] === context.user.uid
                                ? context.listRoom[context.indexRoom]?.name
                                : context.listRoom[context.indexRoom]?.nameCreate
                            : context.listRoom[context.indexRoom]?.name}
                    </span>
                </div>
            </div>
            <div className="header-right">
                {context.listRoom[context.indexRoom]?.type !== 'friend' && (
                    <i className="bi ic-user-add bi-person-plus" onClick={() => setModalAdd(true)}></i>
                )}
                <Avatar.Group
                    maxPopoverPlacement="bottom"
                    size="large"
                    maxCount={2}
                    maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
                >
                    {appContext.users.map((member, index) => {
                        return (
                            <div key={index}>
                                <div key={index}>
                                    <Avatar style={{ cursor: 'pointer' }} src={member.photoURL}>
                                        {member.photoURL ? '' : member.displayName?.charAt(0)?.toUpperCase()}
                                    </Avatar>
                                </div>
                                {/* {member.uid === appContext.infoUsers[0]?.uid ? (
                                    <Tooltip placement="left" title="You">
                                        <Avatar style={{ cursor: 'pointer' }} src={member.photoURL}>
                                            {member.photoURL ? '' : member.displayName?.charAt(0)?.toUpperCase()}
                                        </Avatar>
                                    </Tooltip>
                                ) : (
                                    <>
                                        {appContext.infoUsers[0]?.friend.includes(member.uid) ? (
                                            <Tooltip placement="left" title={`${appContext.users[index].displayName}`}>
                                                <Avatar style={{ cursor: 'pointer' }} src={member.photoURL}>
                                                    {member.photoURL
                                                        ? ''
                                                        : member.displayName?.charAt(0)?.toUpperCase()}
                                                </Avatar>
                                            </Tooltip>
                                        ) : (
                                            <Popconfirm
                                                placement="leftBottom"
                                                title={`Do you want to make friends with ${appContext.users[index].displayName} ?`}
                                                onConfirm={() => confirm(context.user.uid, member.uid, member.id)}
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <Tooltip
                                                    placement="left"
                                                    title={`${appContext.users[index].displayName}`}
                                                >
                                                    <Avatar style={{ cursor: 'pointer' }} src={member.photoURL}>
                                                        {member.photoURL
                                                            ? ''
                                                            : member.displayName?.charAt(0)?.toUpperCase()}
                                                    </Avatar>
                                                </Tooltip>
                                            </Popconfirm>
                                        )}
                                    </>
                                )} */}
                            </div>
                        );
                    })}
                </Avatar.Group>
            </div>
        </div>
    );
}

export default Header;