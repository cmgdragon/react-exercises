import React from 'react';

const PlayersTable = ({globalMarks, userMarks}) => {
    console.log(globalMarks, userMarks);
    
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
            <div>
        <div>Global: {
            Object.values(globalMarks)
            .map(({nickname, errors, spentTime}, i) => {
                return (
                    <div key={nickname+i}>{nickname} - {errors} - {spentTime}s</div>
                )
            })
        }</div>
        <div>User best marks: {
            Object.values(userMarks)
            .sort((a, b) => sortByBestMark(a, b))
            .map(({nickname, errors, spentTime}, i) => {
                return (
                    <div key={nickname+i}>{nickname} - {errors} - {spentTime}s</div>
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