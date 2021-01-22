import React, { useEffect, useState } from 'react';
import MemoryResults from './memoryResults';

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
                            <div
                                data-emoji={`emoji-${rowIndex}-${emojiIndex}`}
                                key={id+emojiIndex}
                                style={{
                                    width: 'auto',
                                    flex: '1',
                                    border: '2px solid rgba(0,0,0,.4)',
                                    backgroundImage: `url('${
                                        chosenEmojis.some(e=> e === getEmojiFromHTML(rowIndex, emojiIndex)) || correctEmojis.some(e=> e === getEmojiFromHTML(rowIndex, emojiIndex))
                                            ?  image : 'http://127.0.0.1:8080/hidden.png'
                                    }')`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'contain',
                                    backgroundColor: `${correctEmojis.some(e=> e === getEmojiFromHTML(rowIndex, emojiIndex)) ? 'green' : 'white'}`,
                                    borderRadius: '4px',
                                    backgroundPosition: 'center',
                                    width: 'auto',
                                    height: '8vw',
                                    minWidth: '3rem',
                                    maxHeight: '8rem',
                                    maxWidth: '8rem',
                                    minHeight: '3rem',
                                    margin: '.2rem'
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