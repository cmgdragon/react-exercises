import * as firebase from 'firebase/app';
import 'firebase/database';

export const registerNewUser = async userId => {

    try {
        firebase.default.database()
            .ref(`users/${userId}`)
            .set({bikes: [""], trivia: [""], memory: [""]});
    } catch (error) {
        console.error(error);
    }

}