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
            <div>
        <div>Best users marks: {
            Object.values(globalMarks)
            .sort((a, b) => sortByBestMark(a, b))
            .map(({nickname, points, spentTime}, i) => {
                return (
                    <div key={nickname+i}>{nickname} - {points} - {spentTime}s</div>
                )
            })
        }</div>
        <div>BEst personal mark: {
            Object.values(userMarks)
            .sort((a, b) => sortByBestMark(a, b))
            .map(({nickname, points, spentTime}, i) => {
                return (
                    <div key={nickname+i}>{nickname} - {points} - {spentTime}s</div>
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