import React, { useState } from 'react';
import getEmojis from '../emoji-api/emojiListGenerator';
import MemoryGrid from './memoryGrid';

const MemoryInitForm = ({user}) => {

    const [rowsValue, updateRows] = useState(4);
    const [colsValue, updateCols] = useState(4);
    const [nickname, updateNickname] = useState('');
    const [emojiList, updateEmojiList] = useState('loading');

    const retrieveEmojis = event => {
        event.preventDefault();
        updateEmojiList(getEmojis(colsValue, rowsValue));
    }

    return (
        <> { emojiList === 'Grid too big' ? <span>Grid too big</span> :
         typeof emojiList === 'string' ?
            <form id="init-form" className={'form'} onSubmit={retrieveEmojis}>

                <label className={'label'} htmlFor="nickname">Nickname to display</label>
                <input className={'input'} type="text" id="nickname" required
                onChange={e => updateNickname(e.currentTarget.value)} />

                <div>
                    <span className={'label'}>Select the size for the grid:</span>
                    <label className={'label'} htmlFor="rows">Grid rows</label>
                    <input className={'input'} type="number" id="rows" name="rows" min="2" value={rowsValue}
                        onChange={e => updateRows(e.currentTarget.value)}/>

                    <label className={'label'} htmlFor="cols">Grid columns</label>
                    <input className={'input'} type="number" id="cols" name="cols" min="2" value={colsValue}
                        onChange={e => updateCols(e.currentTarget.value)}/>
                </div>

                <button className={'start'} type="submit">Start!</button>

            </form>
            : ''}
            { typeof emojiList !== 'string' ?
            <MemoryGrid 
                user={user}
                emojisNumber={emojiList.emojisNeeded}
                emojiList={emojiList.emojiMatrix} 
                nickname={nickname}
            />
            : ''}
        </>
    )

}

export default MemoryInitForm;