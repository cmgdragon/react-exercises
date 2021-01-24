import openmoji from 'openmoji';

const isPair = num => num % 2 === 0 ? true : false;
const adjustNum = num => isPair(num) ? num : num +1;

const getEmojis = (cols, rows) => {

    const emojisNeeded = adjustNum(cols * rows);

    if (emojisNeeded > openmoji.openmojis.length) { 
        return "Grid too big";
    } else { 
        return emojiPicker(openmoji.openmojis, emojisNeeded, rows);
    }

}

const shuffleEmojis = emojiList => {
    let k = emojiList.length - 1;
    while (k !== 1) {
        const random = Math.floor(Math.random() * k);
        const tempEmoji = emojiList[random];
        emojiList[random] = emojiList[k];
        emojiList[k] = tempEmoji;
        --k;
    }
    return emojiList;
}

const buildEmojiMatrix = (emojiList, rows, emojisNeeded) => {

    const { length } = emojiList;
    
    const emojisPerRow = length / rows;
    const isGridPair = Number.isInteger(emojisPerRow);
    const emojiMatrix = [[]];
    let [row, col] = [0, 0];

    for (let i = 0; i < length; i++) { 
        emojiMatrix[row][col] = emojiList[i];
        if (col === Math.floor(emojisPerRow) + (!isGridPair && row === 0 ? 0 : -1) ) {
            emojiMatrix.push([]);
            row++; col = 0;
        } else col++;
    }

    return { emojiMatrix: emojiMatrix, emojisNeeded: emojisNeeded };
}

const emojiPicker = (emojis, emojisNeeded, rows) => {

    const emojiList = [];
    for (let i = 0; i < emojisNeeded/2; i++) {
        
        const random = Math.floor(Math.abs(Math.random() * emojis.length - i));
        const emojiObj = {
            id: emojis[random].order,
            image: `https://openmoji.org/data/color/svg/${emojis[random].hexcode}.svg`
        }
        emojiList.push(emojiObj);
        emojiList.push(emojiObj);
        emojis.splice(emojis.findIndex(x => x === emojis[random]), 1);
    }
    const shuffledEmojis = shuffleEmojis(emojiList);
    return buildEmojiMatrix(shuffledEmojis, rows, emojisNeeded);
}

export default getEmojis;