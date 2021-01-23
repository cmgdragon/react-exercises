import React from 'react';

const PlayersTable = ({ globalMarks, userMarks }) => {

    const sortByBestMark = ({ points: pointsA, spentTime: timeA }, { points: pointsB, spentTime: timeB }) => {

        if (pointsA < pointsB) {
            return 1;
        }

        if (pointsA > pointsB) {
            return -1;
        }

        if (pointsA == pointsB) {

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

    return (
        <>
            { globalMarks !== 'loading' && userMarks !== 'loading' ?
                <div className={'players-table'}>
                    <div className={'global'}>Best users marks: {
                        Object.values(globalMarks)
                            .sort((a, b) => sortByBestMark(a, b)).splice(0, 3)
                            .map(({ nickname, points, spentTime, tag }, i) => {
                                return (
                                    <div className={'global-mark'} key={nickname + i}>
                                        {i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}
                                        <b>{`${nickname} | ${tag}`}</b>{`${points}/20 | ${spentTime}s`}</div>
                                )
                            })
                    }</div>
                    <div className={'personal'}>Best personal marks: {
                        Object.values(userMarks)
                            .sort((a, b) => sortByBestMark(a, b)).splice(0, 5)
                            .map(({ nickname, points, spentTime, tag }, i) => {
                                return (
                                    <div className={'personal-mark'} key={nickname + i}>{`${points}/20 | ${spentTime}s | ${tag}`}</div>
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