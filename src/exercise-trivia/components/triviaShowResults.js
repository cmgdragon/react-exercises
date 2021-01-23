import React, { useEffect, useState } from 'react';
import PlayersTable from './playersTable';
import * as triviaService from '../services/triviaService';

const TriviaShowResults = ({ user, results, spentTime }) => {

    const [userMarks, updateUserMarks] = useState('loading');
    const [globalMarks, updateGlobalMarks] = useState('loading');

    useEffect(() => {
        Promise.all([
            triviaService.addNewGlobalMark({ nickname: results.nickname, points: results.points, spentTime: spentTime }),
            triviaService.addNewUserMark(user.uid, { nickname: results.nickname, points: results.points, spentTime: spentTime }),
        ]).then(() => console.log('sent'));
        triviaService.getGlobalMarks().then(marks => updateGlobalMarks(marks));
        triviaService.getUserMarks(user.uid).then(marks => updateUserMarks(marks));
    }, [])

    return (
        <>
            <div className={'results'}>Nickname: {results.nickname}</div>
            <div className={'results'}>Your points: {results.points}/20 points</div>
            <div className={'results'}>Elapsed time: {spentTime}s</div>
            <PlayersTable userMarks={userMarks} globalMarks={globalMarks} />
        </>
    )
}

export default TriviaShowResults;