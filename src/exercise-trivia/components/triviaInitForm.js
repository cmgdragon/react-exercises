import React, { useRef, useState } from 'react';
import { tags } from '../trivia-api/tags';
import { getQuestions } from '../trivia-api/endpoints';
import TriviaQuizForm from './triviaQuizForm';

const TriviaInitForm = ({user}) => {

    const [tag, updateTag] = useState('');
    const [nickname, updateNickname] = useState('');
    const [fullQuizObject, updateQuizObject] = useState(null);

    const changeTag = ({currentTarget}) => updateTag(currentTarget.value);

    const downloadQuestions = event => {
        event.preventDefault();
        getQuestions(3, tag).then(res => {
            updateQuizObject(res);
        });
    }

    return (
        <> { !fullQuizObject ?
            <form id="init-form" className={'form'} onSubmit={downloadQuestions}>

                <label className={'label'} htmlFor="nickname">Nickname to display</label>
                <input className={'input'} type="text" id="nickname" required
                onChange={e => updateNickname(e.currentTarget.value)} />

                <label className={'label'} htmlFor="tags">Select a tag</label>
                    <select id="tags" className={'input'} onChange={changeTag}>
                        {
                            tags.map(tag => <option key={tag} value={tag}>{tag}</option>)
                        }
                    </select>

                    <button className={'start'} type="submit">Start!</button>

            </form>
            : ''}
            { fullQuizObject ?
            <TriviaQuizForm 
                user={user}
                fullQuizObject={fullQuizObject} 
                nickname={{nickname: nickname}}
                tag={tag}
            />
            : ''}
        </>
    )

}

export default TriviaInitForm;