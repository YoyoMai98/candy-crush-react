import { randomColors, width } from "./Candy"
import blank from '../images/blank.png'

export const checkColumnForThree = ({board}) => {
    for(let i = 0; i < 6 * width; i++) {
        const columnForThree = [i, i + width, i + width * 2]
        const chosenColor = board[i]
        const isBlank = board[i] === blank

        if(columnForThree.every(square => board[square] === chosenColor && !isBlank)) {
            columnForThree.forEach(square => board[square] = blank)
            return true
        }
    }
}

export const checkColumnForFour = ({board}) => {
    for(let i = 0; i < 5 * width; i++) {
        const columnForFour = [i, i + width, i + width * 2, i + width * 3]
        const chosenColor = board[i]
        const isBlank = board[i] === blank

        if(columnForFour.every(square => board[square] === chosenColor && !isBlank)) {
            columnForFour.forEach(square => board[square] = blank)
            return true
        }
    }
}

export const checkRowForThree = ({board}) => {
    for(let i = 0; i < width * width - 2; i++) {
        const rowForThree = [i, i + 1, i + 2]
        const chosenColor = board[i]
        const isBlank = board[i] === blank

        if(i % width === 7 || i % width === 6){
            continue
        }

        if(rowForThree.every(square => board[square] === chosenColor && !isBlank)) {
            rowForThree.forEach(square => board[square] = blank)
            return true
        }
    }
}

export const checkRowForFour = ({board}) => {
    for(let i = 0; i < width * width - 3; i++) {
        const rowForFour = [i, i + 1, i + 2, i + 3]
        const chosenColor = board[i]
        const isBlank = board[i] === blank

        if(i % width === 7 || i % width === 6 || i % width === 5){
            continue
        }

        if(rowForFour.every(square => board[square] === chosenColor && !isBlank)) {
            rowForFour.forEach(square => board[square] = blank)
            return true
        }
    }
}

export const updateBoard = ({board}) => {
    for(let i = 0; i < width * 7; i++){
        const isFirstRow = i >= 0 && i <= (width - 1)

        if(isFirstRow && board[i] === blank){
            board[i] = randomColors()
        }

        if(board[i + width] === blank){
            board[i + width] = board[i]
            board[i] = blank
        }
    }
}