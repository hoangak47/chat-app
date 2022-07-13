/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import Context from '~/context/context';
import { addDoc, generateKeywords } from '~/firebase/services';
import firebase, { auth } from '../../firebase/config';
import ModalLoading from '~/page/modal/modalLoading/modalLoading';

import './login.scss';

function Login() {
    const navigate = useNavigate();
    const context = useContext(Context);
    const [loading, setLoading] = useState(false);

    const handleLoginFacebook = async () => {
        const { additionalUserInfo, user } = await auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());

        if (additionalUserInfo.isNewUser) {
            addDoc('users', {
                displayName: user.displayName,
                photoURL: user.photoURL,
                email: user.email,
                uid: user.uid,
                provider: additionalUserInfo.providerId,
                keyword: generateKeywords(user.displayName),
                friend: [],
            });
        }
    };

    const handleLoginGoogle = async () => {
        const { additionalUserInfo, user } = await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

        if (additionalUserInfo.isNewUser) {
            addDoc('users', {
                displayName: user.displayName,
                photoURL: user.photoURL,
                email: user.email,
                uid: user.uid,
                provider: additionalUserInfo.providerId,
                keyword: generateKeywords(user.displayName),
                friend: [],
            });
        }
    };

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setLoading(true);
                context.setUser(user);
                setTimeout(() => {
                    setLoading(false);
                    navigate(config.routes.chatroom);
                }, 3000);
            } else {
                navigate(config.routes.login);
            }
        });
    }, [context.user]);

    return (
        <div className="login">
            <div className="login-wrap">
                <div className="login-html">
                    <div className="login-form">
                        <div className="group">
                            <input
                                type="submit"
                                className="button"
                                value="Login with Facebook"
                                onClick={handleLoginFacebook}
                            />
                        </div>
                        <div className="group">
                            <input
                                type="submit"
                                className="button google"
                                value="Login with Google"
                                onClick={handleLoginGoogle}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {loading && <ModalLoading />}
        </div>
    );
}

export default Login;
