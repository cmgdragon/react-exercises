import React, { useRef, useState } from 'react';
import { tags } from '../trivia-api/tags';
import { getQuestions } from '../trivia-api/endpoints';
import TriviaQuizForm from './triviaQuizForm';

const TriviaInitForm = ({user}) => {

    const tagRef = useRef(null);
    const [nickname, updateNickname] = useState('');
    const [fullQuizObject, updateQuizObject] = useState(null);

    const downloadQuestions = event => {
        event.preventDefault();
        getQuestions(3, tagRef.current.value).then(res => {
            updateQuizObject(res);
            updateCanStart(true);
        });
    }

    return (
        <> { !fullQuizObject ?
            <form id="init-form" className={'form'} onSubmit={downloadQuestions}>

                <label className={'label'} htmlFor="nickname">Nickname to display</label>
                <input className={'input'} type="text" id="nickname" required
                onChange={e => updateNickname(e.currentTarget.value)} />

                <label className={'label'} htmlFor="tags">Select a tag</label>
                    <select id="tags" ref={tagRef} className={'input'}>
                        {
                            tags.map(tag => <option key={tag} value={tag}>{tag}</option>)
                        }
                    </select>

                <input className={'start'} type="submit" value="Start!" />

            </form>
            : ''}
            { fullQuizObject ?
            <TriviaQuizForm 
                user={user}
                fullQuizObject={fullQuizObject} 
                nickname={{ nickname: nickname}}
            />
            : ''}
        </>
    )

}

export default TriviaInitForm;