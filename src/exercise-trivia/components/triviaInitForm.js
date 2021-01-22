import React, { useRef, useState } from 'react';
import { tags } from '../trivia-api/tags';
import { getQuestions } from '../trivia-api/endpoints';
import TriviaQuizForm from './triviaQuizForm';

const TriviaInitForm = ({user}) => {

    const tagRef = useRef(null);
    const [fullQuizObject, updateQuizObject] = useState(null);

    const downloadQuestions = event => {
        event.preventDefault();
        getQuestions(3, tagRef.current.value).then(res => updateQuizObject(res));
    }

    return (
        <> { !fullQuizObject ?
            <form id="init-form" onSubmit={downloadQuestions}>

                <label htmlFor="nickname">Nickname to display</label>
                <input type="text" id="nickname" required/>

                <label htmlFor="tags">Select a tag</label>
                    <select id="tags" ref={tagRef}>
                        {
                            tags.map(tag => <option key={tag} value={tag}>{tag}</option>)
                        }
                    </select>

                <button type="submit">Start!</button>

            </form>
            : ''}
            { fullQuizObject ?
            <TriviaQuizForm 
                user={user}
                fullQuizObject={fullQuizObject} 
                nickname={{ nickname: document.getElementById("nickname").value}}
            />
            : ''}
        </>
    )

}

export default TriviaInitForm;