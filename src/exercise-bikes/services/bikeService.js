import * as firebase from 'firebase/app';
import 'firebase/database';

export const getBikeDisposal = async rentalTime => {
    try {
        const data = await firebase.default.database()
            .ref(`bikes/${rentalTime}`)
            .once('value');
        return data.exportVal();

     } catch (error) {
         console.error(error);
     }
}

export const changekBikeDisposal = async (rentalTime, newBikes) => {

    try {
        firebase.default.database()
            .ref(`bikes/${rentalTime}`)
            .set(newBikes);
    } catch (error) {
        console.error(error);
    }

}

export const getUserBikes = async uid => {
    try {
        const data = await firebase.default.database()
            .ref(`users/${uid}/bikes`)
            .once('value');
        return data.exportVal();

     } catch (error) {
         console.error(error);
     }
}

export const addUserBike = async (uid, rentalTime) => {

    try {

        const userBikes = Object.values(await getUserBikes(uid));
        userBikes.push(rentalTime);

        firebase.default.database()
            .ref(`users/${uid}/bikes`)
            .set(userBikes);
    } catch (error) {
        console.error(error);
    }

}

export const removeUserBike = async (uid, rentalTime) => {

    try {


        const userBikes = Object.values(await getUserBikes(uid));
        userBikes.splice(
            userBikes.findIndex(s => s === rentalTime),
            1
        )

        firebase.default.database()
            .ref(`users/${uid}/bikes`)
            .set(userBikes);
    } catch (error) {
        console.error(error);
    }

}