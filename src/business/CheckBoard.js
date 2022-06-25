import { randomColors, width, specialTypes } from "./Candy"
import blank from '../images/blank.png'
import { horizonCandyColors, verticalCandyColors } from "./Candy"

export const checkColumnForFour = ({board, setScore, isDragged}) => {
    for(let i = 0; i < 5 * width; i++) {
        const columnForFour = [i, i + width, i + width * 2, i + width * 3]
        const chosenColor = board[i].color
        const isBlank = board[i].src === blank

        if(columnForFour.every(square => board[square].color === chosenColor && !isBlank)) {
            if(columnForFour.some(square => board[square].type === "horizon")){
              console.log("---checkHor for column--");
              checkHorizonColor({indexArr: columnForFour, board, setScore})
            }else if(columnForFour.some(square => board[square].type === "vertical")){
              console.log("---checkVer for column");
              checkVertizonColor({indexArr: columnForFour, board, setScore})
            }

            const index = horizonCandyColors.color.indexOf(chosenColor)
            setScore(prev => prev + 120)
            columnForFour.forEach(square => board[square] = {
                src:blank, color:"blank", type: "blank"
                })
            if(!isDragged){
                board[i + width * 3] = {
                src: horizonCandyColors.src[index], color: chosenColor, type: "horizon"
                }
                console.log(isDragged);
            }
            
                console.log("checkColumnForFour");
            return {isTrue: true, color: chosenColor, indexArr: columnForFour}
        }
    }
}

export const checkRowForFour = ({board, setScore, isDragged}) => {
    for(let i = 0; i < width * width - 3; i++) {
        const rowForFour = [i, i + 1, i + 2, i + 3]
        const chosenColor = board[i].color
        const isBlank = board[i].src === blank

        if(i % width === 7 || i % width === 6 || i % width === 5){
            continue
        }

        if(rowForFour.every(square => board[square].color === chosenColor && !isBlank)) {
            if(rowForFour.some(square => board[square].type === "horizon")){
                console.log("---checkHor for row--");
                checkHorizonColor({indexArr: rowForFour, board, setScore})
            }else if(rowForFour.some(square => board[square].type === "vertical")){
                console.log("---checkVer for row--");
                checkVertizonColor({indexArr: rowForFour, board, setScore})
            }
            
            const index = verticalCandyColors.color.indexOf(chosenColor)
            setScore(prev => prev + 120)
            rowForFour.forEach(square => board[square] = {
                src:blank, color:"blank", type: "blank"
                })
            if(!isDragged){
                board[i] = {
                src: verticalCandyColors.src[index], color: chosenColor, type: "vertical"
                }
                console.log(isDragged);
            }
            
                console.log("checkRowForFour");
            return {isTrue: true, color: chosenColor, indexArr: rowForFour}
        }
    }
}

export const checkColumnForThree = ({board, setScore}) => {
    for(let i = 0; i < 6 * width; i++) {
        const columnForThree = [i, i + width, i + width * 2]
        const chosenColor = board[i].color
        const isBlank = board[i].src === blank

        if(columnForThree.every(square => board[square].color === chosenColor && !isBlank)) {
            if(columnForThree.some(square => board[square].type === "horizon")){
                checkHorizonColor({indexArr: columnForThree, board, setScore})
            }else if(columnForThree.some(square => board[square].type === "vertical")){
                checkVertizonColor({indexArr: columnForThree, board, setScore})
            }
            else {
                setScore(prev => prev + 60)
                columnForThree.forEach(square => board[square] = {
                src:blank, color:"blank", type: "blank"
                })
            }
            return {isTrue: true, indexArr: columnForThree}
        }
    }
}

export const checkRowForThree = ({board, setScore}) => {
    for(let i = 0; i < width * width - 2; i++) {
        const rowForThree = [i, i + 1, i + 2]
        const chosenColor = board[i].color
        const isBlank = board[i].src === blank

        if(i % width === 7 || i % width === 6){
            continue
        }

        if(rowForThree.every(square => board[square].color === chosenColor && !isBlank)) {
            if(rowForThree.some(square => board[square].type === "horizon")){
                checkHorizonColor({indexArr: rowForThree, board, setScore})
            }else if(rowForThree.some(square => board[square].type === "vertical")){
                checkVertizonColor({indexArr: rowForThree, board, setScore})
            }else{
                setScore(prev => prev + 60)
                rowForThree.forEach(square => board[square] = {
                src:blank, color:"blank", type: "blank"
                })
            }
            return {isTrue: true, indexArr: rowForThree}
        }
    }
}

export const checkHorizonColor = ({indexArr, board, setScore}) => {
    const start = indexArr[0]
    const end = indexArr[indexArr.length - 1]
    const interval = indexArr[1] - indexArr[0]
    let horIndex

console.log("ClearHor");
    for(let i = start; i <= end; i = i + interval) {
        if(board[i].type === "horizon") {
            horIndex = i
        }
    }
    const row = parseInt(horIndex / width)

    for(let j = row * width; j < row * width + width; j++){
        setScore(prev => prev + 60)
        if(board[j].type === "vertical") {
            horOrVerColor({board, j, isVer: true, isHor: false ,  setScore})
        }
        // }else if(j !== horIndex && board[j].type === "horizon"){

        // }
        board[j] = {
            src:blank, color:"blank", type: "blank"
            }
        console.log(j)
    }
    console.log("--done--");
}

export const checkVertizonColor = ({indexArr, board, setScore}) => {
    const start = indexArr[0]
    const end = indexArr[indexArr.length - 1]
    const interval = indexArr[1] - indexArr[0]
    let verIndex

console.log("clearVer");
    for(let i = start; i <= end; i = i + interval) {
        if(board[i].type === "vertical") {
            verIndex = i
        }
    }

    const col = verIndex % width

    for(let j = col; j < width * width; j = j+width){
        setScore(prev => prev + 60)
        if(board[j].type === "horizon"){
            horOrVerColor({board, j, isVer: false, isHor: true, setScore})
        }
        board[j] = {
            src:blank, color:"blank", type: "blank"
            }
            console.log(j)
    }
    console.log("--done--");
}

export const horOrVerColor = ({board, j, isVer, isHor, setScore}) => {
    if(isVer) {
        console.log(j);
        const col = j % width
        for(let i = col; i < width * width; i = i+width){
            setScore(prev => prev + 60)
            board[i] = {
                src:blank, color:"blank", type: "blank"
                }
        }
        console.log("clearver in hor");
    }else if(isHor){
        console.log(j);
        const row = parseInt(j / width)
        for(let i = row * width; i < row * width + width; i++){
            setScore(prev => prev + 60)
            board[i] = {
                src:blank, color:"blank", type: "blank"
                }
        }
        console.log("clearhor in ver");
    }else{
        return
    }
}

export const checkSpecialColor = ({
    firstSquareType, secondSquareType, secondSquareId, board, setScore
}) => {
    if(specialTypes.includes(firstSquareType) && specialTypes.includes(secondSquareType)){
        console.log("checkSpecialColor-inside");
        const id = secondSquareId
        const row = parseInt(id / width)
        const col = id % width
        for(let i = row * width; i < row * width + width; i++){
            setScore(prev => prev + 60)
            board[i] = {
                src:blank, color:"blank", type: "blank"
                }
        }
        for(let j = col; j < width * width; j = j+width){
            if(board[j].src !== blank){
                setScore(prev => prev + 60)
                board[j] = {
                    src:blank, color:"blank", type: "blank"
                    }
            }
        }
        return true
    }
}

export const updateBoard = ({board}) => {
    for(let i = 0; i < width * 7; i++){
        const isFirstRow = i >= 0 && i <= (width - 1)

        if(isFirstRow && board[i].src === blank){
            board[i] = randomColors()
        }

        if(board[i + width].src === blank){
            board[i + width] = board[i]
            board[i] = {src:blank, color:"blank", type:"blank"}
        }
    }
}