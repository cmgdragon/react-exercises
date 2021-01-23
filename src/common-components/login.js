import React from 'react';
import { auth, providers } from '../auth/authProviders';
import { registerNewUser } from '../auth/registerUser';
import googleIcon from '../img/google.svg';

const Login = () => {

    const signIn = async provider => {

        try {
            const userInfo = await auth.signInWithPopup(provider);

            if (userInfo.additionalUserInfo.isNewUser) {
                registerNewUser(userInfo.user.uid);
            }
        } catch (error) {
            console.log(error.message);
        }

    }


    return (
        <div className={'login-wrapper'}>
            <span className={'dont-worry'}>Please, before start,</span>
            <div onClick={() => signIn(providers.google)} className={`google-btn provider-btn`} >
                <div className={`provider-icon-wrapper`}>
                    <img alt="Google login" className={`google-icon provider-icon`} src={googleIcon} />
                </div>
                <p className={'btn-text'}><b>Sign in with Google</b></p>
            </div>
            <span className={'dont-worry'}>(Don't be afraid, he's already watching you anyways)</span>
        </div>
    )
}

export default Login;