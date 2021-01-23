import React, { useEffect, useState } from 'react';
import TriviaShowResults from './triviaShowResults';

const TriviaQuizForm = ({ user, nickname, fullQuizObject, tag }) => {

    const [quizOrder, updateOrder] = useState(0);
    const [spentTime, updateTime] = useState(0);
    const [hasFinished, updateFinished] = useState(false);
    const [canRespond, updateCanRespond] = useState(true);
    const [finalResult, updateResult] = useState({ ...nickname, points: 0 });

    useEffect(() => {
        const startQuizTime = !hasFinished && setInterval(() => {
            updateTime(spentTime => spentTime + 1);
        }, 1000);
        return () => clearInterval(startQuizTime);
    }, [hasFinished]);

    const endOrContinue = () => {
        if (quizOrder === fullQuizObject.length - 1) {
            updateFinished(true);
            updateOrder('showResults');
            return true;
        }
    }

    const checkAnswer = (currentTarget, answerName, correctAnswer) => {

        updateCanRespond(false)
        const correctName = correctAnswer.replace('_correct', '');

        if (answerName === correctName) {
            markResponse(true, 1, currentTarget);
        } else {
            document.querySelector(`[data-answer=${correctName}]`)
                .classList = ['correct answer'];
            markResponse(false, 0, currentTarget);
        }
    }

    const markResponse = (isCorrect, points, currentTarget) => {

        currentTarget.classList = isCorrect ? ['correct answer'] : ['incorrect answer'];

        setTimeout(() => {
            updateResult({ ...finalResult, points: finalResult.points + points })

            if (endOrContinue()) return;
            updateOrder(quizOrder + 1);
            updateCanRespond(true);
        }, 1500);

    }

    return (
        <>
            { quizOrder !== 'showResults' ?
                <div id="quiz-form" className={'quizz-form'}>

                    <div className={'quiz-info'}>
                        <span>{`| ${quizOrder +1}/20 | `}</span>
                        <span>
                            {
                                fullQuizObject[quizOrder].tags.map(({name}) =>
                                    `${name} |`)
                            }
                        </span>
                    </div>
                    <div className={'question'}>{fullQuizObject[quizOrder].question}</div>

                    {
                        Object.entries(fullQuizObject[quizOrder].answers).filter(answer => answer[1] != null)
                            .map((answer, i) => {

                                const answerName = answer[0];
                                const answerText = answer[1];
                                const correctAnswer = (Object.entries(fullQuizObject[quizOrder].correct_answers).find(
                                    answer => answer[1] === 'true') || [fullQuizObject[quizOrder].correct_answer])[0];

                                return (
                                    <div
                                        data-answer={answerName}
                                        className={'answer'}
                                        key={fullQuizObject[quizOrder].id + i}
                                        onClick={({ currentTarget }) => canRespond ? checkAnswer(currentTarget, answerName, correctAnswer) : ''}>
                                        {answerText}
                                    </div>
                                )
                            })
                    }


                </div>
                : ''}
                { quizOrder === 'showResults' ?
                    <TriviaShowResults 
                        user={user} 
                        results={finalResult} 
                        spentTime={spentTime} 
                        tag={!!tag ? tag : 'Any'}
                    />
                : ''}
        </>
    )
}

export default TriviaQuizForm;