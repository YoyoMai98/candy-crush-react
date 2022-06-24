import { randomColors, width } from "./Candy"
import blank from '../images/blank.png'
import { verticalCandyColors, horizonCandyColors } from "./Candy"

export const checkColumnForFour = ({board, setScore}) => {
    for(let i = 0; i < 5 * width; i++) {
        const columnForFour = [i, i + width, i + width * 2, i + width * 3]
        const chosenColor = board[i].color
        const isBlank = board[i].src === blank

        if(columnForFour.every(square => board[square].color === chosenColor && !isBlank)) {
            const index = horizonCandyColors.color.indexOf(chosenColor)
            setScore(prev => prev + 120)
            columnForFour.forEach(square => board[square] = {
                src: horizonCandyColors.src[index], color: chosenColor
                })
            return {isTrue: true, color: chosenColor}
        }
    }
}

export const checkRowForFour = ({board, setScore}) => {
    for(let i = 0; i < width * width - 3; i++) {
        const rowForFour = [i, i + 1, i + 2, i + 3]
        const chosenColor = board[i].color
        const isBlank = board[i].src === blank

        if(i % width === 7 || i % width === 6 || i % width === 5){
            continue
        }

        if(rowForFour.every(square => board[square].color === chosenColor && !isBlank)) {
            const index = verticalCandyColors.color.indexOf(chosenColor)
            setScore(prev => prev + 120)
            rowForFour.forEach(square => board[square] = {
                src: verticalCandyColors.src[index], color: chosenColor
                })
            return {isTrue: true, color: chosenColor}
        }
    }
}

export const checkColumnForThree = ({board, setScore}) => {
    for(let i = 0; i < 6 * width; i++) {
        const columnForThree = [i, i + width, i + width * 2]
        const chosenColor = board[i].color
        const isBlank = board[i].src === blank

        if(columnForThree.every(square => board[square].color === chosenColor && !isBlank)) {
            setScore(prev => prev + 60)
            columnForThree.forEach(square => board[square] = {
                src:blank, color:"blank"
                })
            return true
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
            setScore(prev => prev + 60)
            rowForThree.forEach(square => board[square] = {
                src:blank, color:"blank"
                })
            return true
        }
    }
}

export const checkHorizonColor = ({board, setScore}) => {
    for(let i = 0; i < width * width; i++){
        
    }
}

export const checkVertizonColor = ({board, setScore}) => {
    for(let i = 0; i < width * width; i++){}
}

export const updateBoard = ({board}) => {
    for(let i = 0; i < width * 7; i++){
        const isFirstRow = i >= 0 && i <= (width - 1)

        if(isFirstRow && board[i].src === blank){
            board[i] = randomColors()
        }

        if(board[i + width].src === blank){
            board[i + width] = board[i]
            board[i] = {src:blank, color:"blank"}
        }
    }
}