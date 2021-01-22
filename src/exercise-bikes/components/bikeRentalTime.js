import React, { useEffect, useState, useRef } from 'react';
import { addUserBike, removeUserBike, getBikeDisposal, changekBikeDisposal } from '../services/bikeService';
import * as firebase from 'firebase/app';
import 'firebase/database';

const BikeRentalTime = ({rentTime, user, userBikeStock}) => {

    const [bikeStock, updateStock] = useState('');
    const [isChecked, updateChecked] = useState(false);

    useEffect(() => {
        getBikeDisposal(rentTime).then(res => res !== null ? updateStock(res) : createNewRentTime(8));

        firebase.default.database().ref(`bikes/${rentTime}`).on("value", snapshot => {
            updateBikeRent(snapshot.exportVal());
        });
        autoCheckBike();
    }, [userBikeStock]);

    const createNewRentTime = bikeStock => changekBikeDisposal(rentTime, bikeStock);
    const updateBikeRent = rentNumber => updateStock(rentNumber);

    const isBikeAlreadyChecked = () => userBikeStock?.includes(rentTime);
    const autoCheckBike = () => {
        if (userBikeStock && isBikeAlreadyChecked()) {
            updateChecked(true);
        }
    }

    const bookBike = () => addUserBike(user.uid, rentTime);
    const releaseBike = () => removeUserBike(user.uid, rentTime);

    const userBikeInteraction = () => {

        if (!isChecked && bikeStock === 0) return;

        if (isChecked) {
            releaseBike();
            const newStock = bikeStock + 1;
            changekBikeDisposal(rentTime, newStock);
            updateChecked(false);
            updateStock(newStock);
        } else {
            bookBike();
            const newStock = bikeStock - 1;
            changekBikeDisposal(rentTime, newStock);
            updateStock(newStock);
            updateChecked(true);
        }
    }

    return (
        <li className={`bike-row ${
            isChecked ? 'checked' :
            !userBikeStock || bikeStock === 0 ? 'locked' : 'white'
        }`}
        onClick={userBikeStock ? userBikeInteraction :
            isBikeAlreadyChecked() && bikeStock !== 0 && isChecked
            ? userBikeInteraction : () => 'do nothing'}
        >
            <span 
                className={'bike-time'}
                style={{
                    color: !userBikeStock || bikeStock === 0 ? 'red' : 'initial'
                }}>
                <b><span className={'clock-icon'} aria-label="Reservation time">🕑</span> {rentTime}</b>
                <b>{bikeStock} <span className={'bike-icon'} aria-label="Available bikes">🏍️</span></b>
            </span>
        </li>
    )

}

export default BikeRentalTime;