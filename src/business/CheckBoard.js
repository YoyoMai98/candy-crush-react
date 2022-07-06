import { randomColors, width } from "./Candy"
import blank from '../images/blank.png'
import { horizonCandyColors, verticalCandyColors } from "./Candy"
import { checkHorizonColor, checkVerticalColor } from "./CheckStrippedCandy"
import { checkWrappedCandy } from "./CheckWrappedCandy"
import { checkFishCandy } from "./CheckFishCandy"

export const checkColumnForFour = ({board, setScore, isDragged}) => {
    for(let i = 0; i < 5 * width; i++) {
        const columnForFour = [i, i + width, i + width * 2, i + width * 3]
        const chosenColor = board[i].color
        const isBlank = board[i].src === blank

        if(columnForFour.every(square => board[square].color === chosenColor && !isBlank)) {
            if(columnForFour.some(square => board[square].type === "horizon")){
              checkHorizonColor({indexArr: columnForFour, board, setScore})
            }else if(columnForFour.some(square => board[square].type === "vertical")){
              checkVerticalColor({indexArr: columnForFour, board, setScore})
            }else if(columnForFour.some(square => board[square].type === "wrapped")){
              checkWrappedCandy({board, setScore, indexArr: columnForFour, strippedIndex: null})
            }else if(columnForFour.some(square => board[square].type === "fish")){
              checkFishCandy({indexArr: columnForFour, board, setScore})
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
            }
            
            return {isTrue: true, color: chosenColor, indexArr: columnForFour}
        }
    }
}

export const checkRowForFour = ({board, setScore, isDragged}) => {
    for(let i = 0; i < width * width - 3; i++) {
        const rowForFour = [i, i + 1, i + 2, i + 3]
        const chosenRow = parseInt(i / width)
        const chosenColor = board[i].color
        const isBlank = board[i].src === blank

        if(i % width === 7 || i % width === 6 || i % width === 5){
            continue
        }

        if(rowForFour.every(square => parseInt(square / width) === chosenRow) &&
            rowForFour.every(square => board[square].color === chosenColor &&
            !isBlank)) {
            if(rowForFour.some(square => board[square].type === "horizon")){
                checkHorizonColor({indexArr: rowForFour, board, setScore})
            }else if(rowForFour.some(square => board[square].type === "vertical")){
                checkVerticalColor({indexArr: rowForFour, board, setScore})
            }else if(rowForFour.some(square => board[square].type === "wrapped")){
                checkWrappedCandy({board, setScore, indexArr: rowForFour, strippedIndex: null})
            }else if(rowForFour.some(square => board[square].type === "fish")){
                checkFishCandy({indexArr: rowForFour, board, setScore})
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
            }
            
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
                checkVerticalColor({indexArr: columnForThree, board, setScore})
            }else if(columnForThree.some(square => board[square].type === "wrapped")){
                checkWrappedCandy({indexArr: columnForThree, board, setScore, strippedIndex: null})
            }else if(columnForThree.some(square => board[square].type === "fish")){
                checkFishCandy({indexArr: columnForThree, board, setScore})
            }
            for(let i = 0; i < columnForThree.length; i++){
                if(columnForThree[i].src !== blank){
                    setScore(prev => prev + 60)
                    columnForThree.forEach(square => board[square] = {
                    src:blank, color:"blank", type: "blank"
                    })
                }
            }
            return {isTrue: true, indexArr: columnForThree}
        }
    }
}

export const checkRowForThree = ({board, setScore}) => {
    for(let i = 0; i < width * width - 2; i++) {
        const rowForThree = [i, i + 1, i + 2]
        const chosenRow = parseInt(i / width)
        const chosenColor = board[i].color
        const isBlank = board[i].src === blank

        if(i % width === 7 || i % width === 6){
            continue
        }

        if(rowForThree.every(square => parseInt(square / width) === chosenRow) &&
            rowForThree.every(square => board[square].color === chosenColor &&
                !isBlank)) {
            if(rowForThree.some(square => board[square].type === "horizon")){
                checkHorizonColor({indexArr: rowForThree, board, setScore})
            }else if(rowForThree.some(square => board[square].type === "vertical")){
                checkVerticalColor({indexArr: rowForThree, board, setScore})
            }else if(rowForThree.some(square => board[square].type === "wrapped")){
                checkWrappedCandy({indexArr: rowForThree, board, setScore, strippedIndex: null})
            }else if(rowForThree.some(square => board[square].type === "fish")){
                checkFishCandy({indexArr: rowForThree, board, setScore})
            }
            for(let i = 0; i < rowForThree.length; i++){
                if(rowForThree[i].src !== blank){
                    setScore(prev => prev + 60)
                    rowForThree.forEach(square => board[square] = {
                    src:blank, color:"blank", type: "blank"
                    })
                }
            }
            return {isTrue: true, indexArr: rowForThree}
        }
    }
}

// export const horOrVerColor = ({board, specialColorId, isVer, isHor, setScore}) => {
//     if(isVer) {
//         const col = specialColorId % width
//         for(let i = col; i < width * width; i = i+width){
//             if(board[i].type === "horizon"){
//                 horOrVerColor({
//                     board,
//                     specialColorId: i,
//                     isVer: false,
//                     isHor: true,
//                     setScore
//                 })
//             }
//             setScore(prev => prev + 60)
//             board[i] = {
//                 src:blank, color:"blank", type: "blank"
//                 }
//         }
//     }else if(isHor){
//         const row = parseInt(specialColorId / width)
//         for(let i = row * width; i < row * width + width; i++){
//             if(board[i].type === "vertical"){
//                 horOrVerColor({
//                     board,
//                     specialColorId: i,
//                     isVer: true,
//                     isHor: false,
//                     setScore
//                 })
//             }
//             setScore(prev => prev + 60)
//             board[i] = {
//                 src:blank, color:"blank", type: "blank"
//                 }
//         }
//     }else{
//         return
//     }
// }

export const updateBoard = ({board}) => {
    for(let i = 0; i < width * (width - 1); i++){
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