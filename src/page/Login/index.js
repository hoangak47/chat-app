/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import Context from '~/context/context';
import { addDoc, generateKeywords } from '~/firebase/services';
import firebase, { auth } from '../../firebase/config';

import './login.scss';

function Login() {
    const navigate = useNavigate();
    const context = useContext(Context);

    const handleLoginFacebook = async () => {
        const { additionalUserInfo, user } = await auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
        console.log(additionalUserInfo);
        if (additionalUserInfo.isNewUser) {
            addDoc('users', {
                displayName: user.displayName,
                photoURL: user.photoURL,
                email: user.email,
                uid: user.uid,
                provider: additionalUserInfo.providerId,
                keyword: generateKeywords(user.displayName),
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
            });
        }
    };

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                navigate(config.routes.chatroom);
                context.setUser(user);
            } else {
                navigate(config.routes.login);
            }
        });
    }, [context.user]);

    return (
        <div className="login">
            <div className="login-wrap">
                <div className="login-html">
                    <input id="tab-1" type="radio" name="tab" className="sign-in" checked readOnly />
                    <label htmlFor="tab-1" className="tab">
                        Sign In
                    </label>
                    <input id="tab-2" type="radio" name="tab" className="sign-up" />
                    <label htmlFor="tab-2" className="tab">
                        Sign Up
                    </label>
                    <div className="login-form">
                        <div className="sign-in-htm">
                            <div className="group">
                                <label className="label">Username</label>
                                <input type="text" className="input" />
                            </div>
                            <div className="group">
                                <label className="label">Password</label>
                                <input type="password" className="input" data-type="password" />
                            </div>
                            <div className="group">
                                <input id="check" type="checkbox" className="check" checked readOnly />
                                <label htmlFor="check">
                                    <span className="icon"></span> Keep me Signed in
                                </label>
                            </div>
                            <div className="group">
                                <input type="submit" className="button" value="Sign In" />
                            </div>

                            <div className="foot-lnk">
                                <a href="#forgot">Forgot Password?</a>
                            </div>
                            <div className="hr"></div>
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
                        <div className="sign-up-htm">
                            <div className="group">
                                <label className="label">Username</label>
                                <input type="text" className="input" />
                            </div>
                            <div className="group">
                                <label className="label">Password</label>
                                <input type="password" className="input" data-type="password" />
                            </div>
                            <div className="group">
                                <label className="label">Repeat Password</label>
                                <input type="password" className="input" data-type="password" />
                            </div>
                            <div className="group">
                                <label className="label">Email Address</label>
                                <input type="text" className="input" />
                            </div>
                            <div className="group">
                                <input type="submit" className="button" value="Sign Up" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
