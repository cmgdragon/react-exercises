import * as firebase from 'firebase/app';
import 'firebase/database';

export const getUserMarks = async uid => {
    try {
        const data = await firebase.default.database()
            .ref(`users/${uid}/memory/marks`)
            .once('value');
        return data.exportVal();

     } catch (error) {
         console.error(error);
     }
}

export const getGlobalMarks = async () => {
    try {
        const data = await firebase.default.database()
            .ref(`memory/marks`)
            .once('value');
        return data.exportVal();

     } catch (error) {
         console.error(error);
     }
}

export const addNewUserMark = async (uid, newMark) => {

    try {
        firebase.default.database()
            .ref(`users/${uid}/memory/marks`)
            .push(newMark);
    } catch (error) {
        console.error(error);
    }

}

export const addNewGlobalMark = async newMark => {

    try {
        firebase.default.database()
            .ref(`memory/marks`)
            .push(newMark);
    } catch (error) {
        console.error(error);
    }

}