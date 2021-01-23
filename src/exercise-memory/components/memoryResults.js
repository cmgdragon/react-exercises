import React, { useEffect, useState } from 'react';
import PlayersTable from './playersTable';
import * as memoryService from '../services/memoryService';

const MemoryResults = ({user, errors, nickname, spentTime, emojisNumber}) => {

    const [userMarks, updateUserMarks] = useState('loading');
    const [globalMarks, updateGlobalMarks] = useState('loading');

    useEffect(() => {
        Promise.all([
            memoryService.addNewGlobalMark({nickname: nickname, errors: errors, spentTime: spentTime, size: emojisNumber}),
            memoryService.addNewUserMark(user.uid, {nickname: nickname, errors: errors, spentTime: spentTime, size: emojisNumber}),
        ]).then(() => console.log('sent'));
        memoryService.getGlobalMarks().then(marks => updateGlobalMarks(marks));
        memoryService.getUserMarks(user.uid).then(marks => updateUserMarks(marks));
    }, [])

    return (
        <>
        <div className={'results'}>Errors: {errors}</div>
        <div className={'results'}>Elapsed time: {spentTime}s</div>
        <div className={'results'}>Complexity: {emojisNumber} emojis</div>
        <PlayersTable userMarks={userMarks} globalMarks={globalMarks} emojisNumber={emojisNumber} />
        </>
    )
}

export default MemoryResults;