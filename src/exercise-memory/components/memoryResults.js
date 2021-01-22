import React, { useEffect, useState } from 'react';
import PlayersTable from './playersTable';
import * as memoryService from '../services/memoryService';

const MemoryResults = ({user, errors, nickname, spentTime}) => {

    const [userMarks, updateUserMarks] = useState('loading');
    const [globalMarks, updateGlobalMarks] = useState('loading');

    useEffect(() => {
        Promise.all([
            memoryService.addNewGlobalMark({nickname: nickname, errors: errors, spentTime: spentTime}),
            memoryService.addNewUserMark(user.uid, {nickname: nickname, errors: errors, spentTime: spentTime}),
        ]).then(() => console.log('sent'));
        memoryService.getGlobalMarks().then(marks => updateGlobalMarks(marks));
        memoryService.getUserMarks(user.uid).then(marks => updateUserMarks(marks));
    }, [])

    return (
        <>
        <div>Errors: {errors}</div>
        <div>Elapsed time: {spentTime}s</div>
        <PlayersTable userMarks={userMarks} globalMarks={globalMarks} />
        </>
    )
}

export default MemoryResults;