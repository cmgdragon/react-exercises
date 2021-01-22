import React from 'react';

const PlayersTable = ({globalMarks, userMarks}) => {

    const sortByBestMark = ({errors: errorsA, spentTime: timeA}, {errors: errorsB, spentTime: timeB}) => {

        if (errorsA < errorsB) {
            if (timeA < timeB) {
                return -1;
            } else return 1;
        }
        if (errorsA > errorsB) {
            if (timeA > timeB) {
                return 1;
            } else return -1;
        }
        if (errorsA == errorsB) {
            if (timeA > timeB) {
                return 1;
            } else return -1;
        }
        
    }
    
    return (
        <>
            { globalMarks !== 'loading' && userMarks !== 'loading' ?
        <div className={'players-table'}>
        <div className={'global'}>Best users marks: {
            Object.values(globalMarks)
            .sort((a, b) => sortByBestMark(a, b))
            .map(({nickname, errors, spentTime}, i) => {
                return (
                    <div className={'personal-mark'} key={nickname+i}><b>{`${nickname} `}</b>{`=> ${errors} errors | ${spentTime}s`}</div>
                )
            })
        }</div>
        <div className={'personal'}>Best personal marks: {
            Object.values(userMarks)
            .sort((a, b) => sortByBestMark(a, b))
            .map(({nickname, errors, spentTime}, i) => {
                return (
                    <div className={'global-mark'} key={nickname+i}>{`${errors} errors | ${spentTime}s`}</div>
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