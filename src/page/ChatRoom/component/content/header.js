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
                                      <div className="user-list-item">
                                          <img src={room.photoURL} alt="user" />
                                      </div>
                                  </li>
                              );
                          })
                        : appContext.users.map((room, index) => {
                              return (
                                  <li key={index}>
                                      {room.photoURL ? (
                                          <div className="user-list-item">
                                              <img src={room.photoURL} alt="user" />
                                          </div>
                                      ) : (
                                          <div className="user-list-item more">
                                              <span>
                                                  {context.user && context.user.displayName.charAt(0).toUpperCase()}
                                              </span>
                                          </div>
                                      )}
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
                                                    <img src={room.photoURL} alt="user" />
                                                    <span>{room.displayName}</span>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </li>
                    )}
                    {/* {appContext.users?.map((room, index) => {
                        return (
                            <li key={index}>
                                <div className="user-list-item">
                                    <img src={room.photoURL} alt="user" />
                                </div>
                            </li>
                        );
                    })} */}
                    {/* {context.listRoom[context.indexRoom - 1].users.slice(0, 2).map((room, index) => {
                        return (
                            <li key={index}>
                                <div className="user-list-item">
                                    <img src={room.avatar} alt="user" />
                                </div>
                            </li>
                        );
                    })}
                    {context.listRoom[context.indexRoom - 1].users.length > 2 && (
                        <li>
                            <div className="user-list-item more">
                                <span>+{context.listRoom[context.indexRoom - 1].users.length - 2}</span>
                                <ul className="more-users">
                                    {context.listRoom[context.indexRoom - 1].users.slice(2).map((room, index) => {
                                        return (
                                            <li key={index}>
                                                <div className="user-list-item">
                                                    <img src={room.avatar} alt="user" />
                                                    <span>{room.name}</span>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </li>
                    )} */}
                </ul>
            </div>
        </div>
    );
}

export default Header;
