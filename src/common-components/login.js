import React from 'react';
import { auth, providers } from '../auth/authProviders';
import { registerNewUser } from '../auth/registerUser';

const Login = () => {

    const signIn = async provider => {
    
        try {
           const userInfo = await auth.signInWithPopup(provider);
           console.log(userInfo.additionalUserInfo, userInfo.user.uid)
           if (userInfo.additionalUserInfo.isNewUser) {
               registerNewUser(userInfo.user.uid);
           }
        } catch (error) {
            console.log(error.message);
        }
    
    }
    

    return (
        <>
        <div onClick={() => signIn(providers.google)} >
            <div>
                <img alt="Google login" src="providers_icons/google.svg" />
            </div>
            <p><b>Sign in with Google</b></p>
        </div>
    </>
    )
}

export default Login;