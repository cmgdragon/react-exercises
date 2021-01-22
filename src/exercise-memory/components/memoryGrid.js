import React, { useEffect, useState } from 'react';
import MemoryResults from './memoryResults';
import hiddenEmoji from '../../img/hidden.png';
//import test from '../../img/test.svg';

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
        
        console.log(chosenEmojis[0].style.backgroundImage, currentTarget.style.backgroundImage)

        if (chosenEmojis[0].style.backgroundImage === currentTarget.style.backgroundImage) {
            setTimeout(() => {
                console.log("CORRECT")
                updateCorrectEmojis([...correctEmojis, chosenEmojis[0], currentTarget]);
                
                if (correctEmojis.length === emojisNumber - 2) {
                    finishMemoryGame();
                    return;
                }

                updateChosenEmojis([]);
                
            }, 500);

        } else {
            setTimeout(() => {
                console.log("INCORRECT")
                updateErrors(errors + 1);
                chosenEmojis[0].style.backgroundColor = "red";
                currentTarget.style.backgroundColor = "red";
                updateChosenEmojis([]);
            }, 1500);
            
            chosenEmojis[0].style.backgroundColor = "white";
            currentTarget.style.backgroundColor = "white";

        }
   
    }

    const finishMemoryGame = () => {
        updateChosenEmojis([]);
        updateFinished(true);
    }

    const getEmojiFromHTML = (rowIndex, emojiIndex) => 
        document.querySelector(`[data-emoji=emoji-${rowIndex}-${emojiIndex}]`);

    return (
        <>
        { !hasFinished ? 
        <div style={{
            overflow: 'auto'
        }}>

        { emojiList === 'loading' ? <span>Generating grid...</span> :
            emojiList.map((emojiRow, rowIndex) => {
                return (

                    <div 
                    key={rowIndex}
                    style={{
                        display: 'flex',
                        placeContent: 'center'
                    }}>
                        { 
                            emojiRow.map(({image, id}, emojiIndex) => { return (
                            <div className={'memory-cell'}
                                data-emoji={`emoji-${rowIndex}-${emojiIndex}`}
                                key={id+emojiIndex}
                                style={{
                                    backgroundImage: `url('${
                                        chosenEmojis.some(e=> e === getEmojiFromHTML(rowIndex, emojiIndex)) || correctEmojis.some(e=> e === getEmojiFromHTML(rowIndex, emojiIndex))
                                            ? image : hiddenEmoji
                                    }')`,
                                    backgroundColor: `${correctEmojis.some(e=> e === getEmojiFromHTML(rowIndex, emojiIndex)) ? 'green' : 'white'}`,
                                    backgroundSize: `${
                                        chosenEmojis.some(e=> e === getEmojiFromHTML(rowIndex, emojiIndex)) || correctEmojis.some(e=> e === getEmojiFromHTML(rowIndex, emojiIndex))
                                            ?  'contain' : 'cover'
                                    }`,
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
        /> : ''}
    </>
    )
}

export default MemoryGrid;