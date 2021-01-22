import React, { useEffect, useState } from 'react';
import BikeRentalTime from './bikeRentalTime';
import { getUserBikes } from '../services/bikeService';

const BikeList = ({user}) => {

    const startTime = 8;
    const endTime = 20;
    const rentalInterval = .5;

    const [userBikeStock, updateStock] = useState(null);

    useEffect(() => {
        getUserBikes(user.uid).then(res => !!res ? updateStock(Object.values(res)) : '');
    }, [user]);

    const generateList = (startTime, endTime, rentalInterval) => {

        const rentalTimes = [];

        for (let rentTime = startTime; rentTime <= endTime ; rentTime += rentalInterval) {
            rentalTimes.push( (
                Number.isInteger(rentTime) ?
                    `${rentTime}` :
                    `${Math.floor(rentTime)}:${(rentTime * 60 % 60) .toFixed(0)}`
                )
            );
        }

        return rentalTimes;
    }

    return (
        <ul className={'bike-list'}>
            <span>In real time!</span>
            { user ?
                generateList(startTime, endTime, rentalInterval).map((rentTime, i) => 
                    <BikeRentalTime 
                        key={i} 
                        rentTime={rentTime} 
                        user={user} 
                        userBikeStock={userBikeStock}
                    />
                )
            : ''}
    
        </ul>
    )

}

export default BikeList;