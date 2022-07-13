import { MenuUnfoldOutlined } from '@ant-design/icons';
import { Avatar, Drawer } from 'antd';
import React, { useContext, useState } from 'react';
import { AppContext } from '~/context/appProvider';
import Info from '../info/info';

import './header.scss';

function Header({ context, setModalAdd }) {
    const appContext = useContext(AppContext);

    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    return (
        <div className="chat-room-content-header">
            <div className="header-menu" onClick={() => context.setMenu(true)}>
                <MenuUnfoldOutlined />
            </div>
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
            <div className="ic-info-room" onClick={showDrawer}>
                <svg role="presentation" name="icon" width="24px" height="24px" viewBox="0 0 36 36">
                    <g transform="translate(18,18)scale(1.2)translate(-18,-18)">
                        <path
                            fill="var(--color-secondary)"
                            stroke="var(--color-secondary)"
                            d="M18,10 C16.6195,10 15.5,11.119 15.5,12.5 C15.5,13.881 16.6195,15 18,15 C19.381,15 20.5,13.881 20.5,12.5 C20.5,11.119 19.381,10 18,10 Z M16,25 C16,25.552 16.448,26 17,26 L19,26 C19.552,26 20,25.552 20,25 L20,18 C20,17.448 19.552,17 19,17 L17,17 C16.448,17 16,17.448 16,18 L16,25 Z M18,30 C11.3725,30 6,24.6275 6,18 C6,11.3725 11.3725,6 18,6 C24.6275,6 30,11.3725 30,18 C30,24.6275 24.6275,30 18,30 Z"
                        ></path>
                    </g>
                </svg>
            </div>
            <Drawer
                title="Information Room"
                placement="right"
                onClose={onClose}
                visible={visible}
                headerStyle={{ background: 'var(--bg-main)', color: 'var(--color)' }}
                bodyStyle={{ background: 'var(--bg-main' }}
            >
                <Info setModalAdd={setModalAdd} />
            </Drawer>
        </div>
    );
}

export default Header;
