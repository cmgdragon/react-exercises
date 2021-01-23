import React, { useEffect, useState } from 'react';
import MemoryResults from './memoryResults';
import hiddenEmoji from '../../img/hidden.png';

const MemoryGrid = ({user, emojiList, emojisNumber, nickname}) => {

    const [chosenEmojis, updateChosenEmojis] = useState([]);
    const [correctEmojis, updateCorrectEmojis] = useState([]);
    const [errors, updateErrors] = useState(0);
    const [spentTime, updateTime] = useState(0);
    const [hasFinished, updateFinished] = useState(false);

    useEffect(() => {
        const startMemoryTime = !hasFinished && setInterval(() => {
            updateTime(spentTime => spentTime +1);
        }, 1000);
        return () => clearInterval(startMemoryTime);
    }, [hasFinished]);

    const chooseEmoji = ({currentTarget}) => {
        const chosenEmojisNum = chosenEmojis.length;
        let selected = false;

        if (!selected) {
            currentTarget.style.backgroundColor = "white";
            updateChosenEmojis([...chosenEmojis, currentTarget]);
            
            selected = true;

            if (chosenEmojisNum === 1) {
                setTimeout(() => {
                    checkChosenEmojis(currentTarget);
                }, 1000);
            }
        }

    }

    const checkChosenEmojis = currentTarget => {

        if (chosenEmojis[0].style.backgroundImage === currentTarget.style.backgroundImage) {
            setTimeout(() => {

                updateCorrectEmojis([...correctEmojis, chosenEmojis[0], currentTarget]);
                
                if (correctEmojis.length === emojisNumber - 2) {
                    finishMemoryGame();
                    return;
                }

                updateChosenEmojis([]);
                
            }, 500);

        } else {
            setTimeout(() => {

                chosenEmojis[0].style.backgroundColor = "#d04a4a";
                currentTarget.style.backgroundColor = "#d04a4a";

            }, 500);

            setTimeout(() => {
                chosenEmojis[0].style.backgroundColor = "white";
                currentTarget.style.backgroundColor = "white";
                updateErrors(errors + 1);
                updateChosenEmojis([]);
            }, 1500);

        }
   
    }

    const finishMemoryGame = () => {
        updateChosenEmojis([]);
        updateFinished(true);
    }

    const getEmojiFromHTML = (rowIndex, emojiIndex) => 
        document.querySelector(`[data-emoji=emoji-${rowIndex}-${emojiIndex}]`);

    const emojiDisplay = (display, undisplay, rowIndex, emojiIndex) => {
        return chosenEmojis.some(e=> e === getEmojiFromHTML(rowIndex, emojiIndex))
         || correctEmojis.some(e=> e === getEmojiFromHTML(rowIndex, emojiIndex))
        ? display : undisplay                              
    }

    return (
        <>
        { !hasFinished ? 
        <div className={'memory-table'}>

        { emojiList === 'loading' ? <span>Generating grid...</span> :
            emojiList.map((emojiRow, rowIndex) => {
                return (

                    <div key={rowIndex} className={'memory-row'}>
                        { 
                            emojiRow.map(({image, id}, emojiIndex) => { return (
                            <div className={'memory-cell'}
                                data-emoji={`emoji-${rowIndex}-${emojiIndex}`}
                                key={id+emojiIndex}
                                style={{
                                    backgroundImage: `url('${emojiDisplay(image, hiddenEmoji, rowIndex, emojiIndex)}')`,
                                    backgroundColor: `${correctEmojis.some(e=> e === getEmojiFromHTML(rowIndex, emojiIndex)) ? '#5cc65c' : 'white'}`,
                                    backgroundSize: `${emojiDisplay('contain', 'cover', rowIndex, emojiIndex)}`
                                }}
                                onClick={chosenEmojis.length < 2 ? chooseEmoji : undefined}
                            >
            
                            </div>
                            ) })
                        }
                    </div>

                )

            })

        }
    </div>
    : ''}
    { hasFinished ? 
        <MemoryResults 
            user={user} 
            nickname={nickname} 
            errors={errors} 
            spentTime={spentTime}
            emojisNumber={emojisNumber}
        /> : ''}
    </>
    )
}

export default MemoryGrid;