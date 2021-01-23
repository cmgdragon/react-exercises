import React, { useEffect, useState } from 'react';
import TriviaShowResults from './triviaShowResults';

const TriviaQuizForm = ({ user, nickname, fullQuizObject }) => {

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
                .style.backgroundColor = '#6ef06e';
            markResponse(false, 0, currentTarget);
        }
    }

    const markResponse = (isCorrect, points, currentTarget) => {

        currentTarget.style.backgroundColor = isCorrect ? "#6ef06e" : "#ff3636bf";

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

                    <div className={'question'}>{fullQuizObject[quizOrder].question}</div>
                    {console.log(fullQuizObject[quizOrder])}

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
                <TriviaShowResults user={user} results={finalResult} spentTime={spentTime} />
                : ''}
        </>
    )
}

export default TriviaQuizForm;