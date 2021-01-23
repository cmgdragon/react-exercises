import React from 'react';

const PlayersTable = ({globalMarks, userMarks}) => {


    const sortByBestMark = ({errors: errorsA, size: sizeA, spentTime: timeA},
        {errors: errorsB, spentTime: timeB, size: sizeB}) => {
        
        if (sizeA < sizeB) {
            return 1;
        }

        if (sizeA > sizeB) {
            return -1;
        }

        if (sizeA == sizeB) {

            if (errorsA > errorsB) {
                return 1;
            }
    
            if (errorsA < errorsB) {
                return -1;
            }

            if (errorsA == errorsB) {

                if (timeA > timeB) {
                    return 1;
                }

                if (timeA < timeB) {
                    return -1;
                }
        
                if (timeA == timeB) {
        
                        return 0;
                }

            }


        }
        
    }
    
    return (
        <>
            { globalMarks !== 'loading' && userMarks !== 'loading' ?
        <div className={'players-table'}>
        <div className={'global'}>Best users marks: {
            Object.values(globalMarks)
            .sort((a, b) => sortByBestMark(a, b))
            .splice(0, 3)
            .map(({nickname, errors, spentTime, size}, i) => {
                return (
                    <div className={'global-mark'} key={nickname+i}>
                        {i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}    
                    <b>{`${nickname}`}</b>{`${size} emojis | ${errors} errors | ${spentTime}s`}</div>
                )
            })
        }</div>
        <div className={'personal'}>Best personal marks: {
            Object.values(userMarks)
            .sort((a, b) => sortByBestMark(a, b))
            .splice(0, 5)
            .map(({nickname, errors, spentTime, size}, i) => {
                return (
                    <div className={'personal-mark'} key={nickname+i}>{`${size} emojis | ${errors} errors | ${spentTime}s`}</div>
                )
            })
        }</div>
        </div>
        : 'loading'}

        <button onClick={() => window.location.reload()}>Restart</button>

        </>
    )
}

export default PlayersTable;