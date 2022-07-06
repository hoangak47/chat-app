import { Avatar, Tooltip } from 'antd';
import React, { useContext } from 'react';
import { AppContext } from '~/context/appProvider';

import './header.scss';

function Header({ context, setModalAdd }) {
    const appContext = useContext(AppContext);
    return (
        <div className="chat-room-content-header">
            <div className="avatar">
                <img src={context.avatarRoom} alt="user" />
                <div className="detail">
                    <span>{context.nameRoom}</span>
                    <span>{context.describeRoom}</span>
                </div>
            </div>
            <div className="header-right">
                <i className="bi ic-user-add bi-person-plus" onClick={() => setModalAdd(true)}></i>
                <ul className="user-list">
                    {appContext.users && appContext.users.length > 2
                        ? appContext.users.slice(0, 2).map((room, index) => {
                              return (
                                  <li key={index}>
                                      <Tooltip title={appContext.users[index].displayName} placement="bottom">
                                          <Avatar style={{ marginLeft: 'unset' }} size="large" src={room.photoURL}>
                                              {!room.photoURL &&
                                                  appContext.users[index].displayName.charAt(0)?.toUpperCase()}
                                          </Avatar>
                                      </Tooltip>
                                  </li>
                              );
                          })
                        : appContext.users.map((room, index) => {
                              return (
                                  <li key={index}>
                                      <Tooltip title={appContext.users[index].displayName} placement="bottom">
                                          <Avatar style={{ marginLeft: 'unset' }} size="default" src={room.photoURL}>
                                              {!room.photoURL &&
                                                  appContext.users[index].displayName.charAt(0)?.toUpperCase()}
                                          </Avatar>
                                      </Tooltip>
                                      {/* {room.photoURL ? (
                                          
                                      ) : (
                                          <div className="user-list-item more">
                                              <span>{context.user && context.user.displayName}</span>
                                          </div>
                                      )} */}
                                  </li>
                              );
                          })}
                    {appContext.users?.length > 2 && (
                        <li>
                            <div className="user-list-item more">
                                <span>+{appContext.users?.length - 2}</span>
                                <ul className="more-users">
                                    {appContext.users?.slice(2).map((room, index) => {
                                        return (
                                            <li key={index}>
                                                <div className="user-list-item">
                                                    <Avatar
                                                        style={{ marginLeft: 'unset' }}
                                                        size="default"
                                                        src={room.photoURL}
                                                    >
                                                        {!room.photoURL &&
                                                            appContext.users[index + 2].displayName
                                                                .charAt(0)
                                                                ?.toUpperCase()}
                                                    </Avatar>

                                                    <span>{appContext.users[index + 2].displayName}</span>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Header;
