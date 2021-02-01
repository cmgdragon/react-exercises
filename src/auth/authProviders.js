import * as firebase from 'firebase/app';
import firebaseConfig from '../firebase';
import 'firebase/auth';

firebase.default.initializeApp(firebaseConfig);

const auth = firebase.default.auth();
const providers = {
    google: new firebase.default.auth.GoogleAuthProvider()
}

const signOut = async () => {
    
    try {
        await auth.signOut();
        console.log('Logged out');
        window.location.href = '/';
    } catch (error) {
        console.log(error.message)
    }

}

export {
    auth,
    providers,
    signOut
}