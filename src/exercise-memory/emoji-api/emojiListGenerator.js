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
    const isRowPair = Number.isInteger(length / rows);
    const emojiMatrix = [];
    for (let i = 0; i < rows; i++) {
        emojiMatrix.push([]);
        let j = 0;
        while (j <= emojisPerRow - (!isRowPair && i === 0 ? 0: 1)) {
            emojiMatrix[i][j] = emojiList[Math.floor((i * emojisPerRow) + j)];
            ++j;
        }
    }
    return { emojiMatrix: emojiMatrix, emojisNeeded: emojisNeeded };
}

const emojiPicker = (emojis, emojisNeeded, rows) => {

    const emojiList = [];
    for (let i = 0; i < emojisNeeded/2; i++) {
        
        const random = Math.floor(Math.abs(Math.random() * emojis.length - i));
        const emojiObj = {
            id: emojis[random].order,
            image: emojis[random].openmoji_images.color.svg.replace(/\\/g, '/')
        }
        emojiList.push(emojiObj);
        emojiList.push(emojiObj);
        emojis.splice(emojis.findIndex(x => x === emojis[random]), 1);
    }
    
    const shuffledEmojis = shuffleEmojis(emojiList);
    return buildEmojiMatrix(shuffledEmojis, rows, emojisNeeded);
}

export default getEmojis;