import React, { useEffect, useState, useRef } from 'react';
import { addUserBike, removeUserBike, getBikeDisposal, changekBikeDisposal } from '../services/bikeService';
import * as firebase from 'firebase/app';
import 'firebase/database';

const BikeRentalTime = ({rentTime, user, userBikeStock}) => {

    const [bikeStock, updateStock] = useState('');
    const checkInput = useRef(null);

    useEffect(() => {
        getBikeDisposal(rentTime).then(res => res !== null ? updateStock(res) : createNewRentTime(8));

        firebase.default.database().ref(`bikes/${rentTime}`).on("value", snapshot => {
            updateBikeRent(snapshot.exportVal());
            if (checkInput.current.checked) checkInput.current.checked = true;
        });
        autoCheckBike();
    }, [userBikeStock]);

    const createNewRentTime = bikeStock => changekBikeDisposal(rentTime, bikeStock);
    const updateBikeRent = rentNumber => updateStock(rentNumber);

    const isBikeAlreadyChecked = () => userBikeStock?.includes(rentTime);
    const autoCheckBike = () => {
        if (userBikeStock && isBikeAlreadyChecked()) checkInput.current.checked = true;   
    }

    const bookBike = () => addUserBike(user.uid, rentTime);
    const releaseBike = () => removeUserBike(user.uid, rentTime);

    const userBikeInteraction = ({target}) => {
        if (!target.checked) {
            releaseBike();
            const newStock = bikeStock + 1;
            changekBikeDisposal(rentTime, newStock);
            updateStock(newStock)
        } else {
            bookBike();
            const newStock = bikeStock - 1;
            changekBikeDisposal(rentTime, newStock);
            updateStock(newStock)
            if (!isBikeAlreadyChecked() && bikeStock === 1) checkInput.current.disabled = false;
        }
    }

    return (
        <li>
            <input 
            type="checkbox" 
            disabled={ !userBikeStock ? true :
                !isBikeAlreadyChecked() && bikeStock === 0 && !checkInput.current.checked
                ? true : false} 
            onChange={userBikeInteraction}
            ref={checkInput} 
            />
            <span style={{
                color: !userBikeStock || bikeStock === 0 ? 'red' : 'initial'
            }}>{rentTime} - {bikeStock}</span>
        </li>
    )

}

export default BikeRentalTime;