import React from 'react';

const PlayersTable = ({globalMarks, userMarks}) => {

    const sortByBestMark = ({points: pointsA, spentTime: timeA}, {points: pointsB, spentTime: timeB}) => {

        if (pointsA < pointsB) {
            if (timeA < timeB) {
                return -1;
            } else return 1;
        }
        if (pointsA > pointsB) {
            if (timeA > timeB) {
                return 1;
            } else return -1;
        }
        if (pointsA == pointsB) {
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
            .map(({nickname, points, spentTime}, i) => {
                return (
                    <div className={'personal-mark'} key={nickname+i}><b>{`${nickname} `}</b>{`=> ${points}p | ${spentTime}s`}</div>
                )
            })
        }</div>
        <div className={'personal'}>Best personal marks: {
            Object.values(userMarks)
            .sort((a, b) => sortByBestMark(a, b))
            .map(({nickname, points, spentTime}, i) => {
                return (
                    <div className={'global-mark'} key={nickname+i}>{`${points}p | ${spentTime}s`}</div>
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