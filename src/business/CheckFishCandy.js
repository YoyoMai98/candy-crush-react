import { width, fishCandy } from "./Candy";
import blank from '../images/blank.png'
import { checkHorizonColor, checkVerticalColor } from "./CheckStrippedCandy"
import { checkWrappedCandy } from "./CheckWrappedCandy"

export const checkColorForSquare = ({board, setScore, isDragged}) => {
    for(let i = 0; i < (width-1) * width - 1; i++){
        const colorForSquare = [i, i+1, i+width, i+width+1]
        const colorNearby = [i-1, i+2, i+width-1, i+width+2, i-width, i-width+1, i+width*2, i+width*2+1]
        const chosenColor = board[i].color
        const isBlank = board[i].src === blank

        if(i % width === 7) continue

        if(colorForSquare.every(square => board[square].color === chosenColor && !isBlank)){
            for(let j = 0; j < colorNearby.length; j++){
                if(colorNearby[j] && board[colorNearby[j]] && board[colorNearby[j]].color === chosenColor){
                    colorForSquare.push(colorNearby[j])
                }
            }
            if(colorForSquare.some(square => board[square].type === "horizon")){
                checkHorizonColor({indexArr: colorForSquare, board, setScore})
            }else if(colorForSquare.some(square => board[square].type === "vertical")){
                checkVerticalColor({indexArr: colorForSquare, board, setScore})
            }else if(colorForSquare.some(square => board[square].type === "wrapped")){
                checkWrappedCandy({indexArr: colorForSquare, board, setScore, strippedIndex: null})
            }else if(colorForSquare.some(square => board[square].type === "fish")){
                checkFishCandy({indexArr: colorForSquare, board, setScore})
            }
            
            console.log("create Fish");
            const index = fishCandy.color.indexOf(chosenColor)
            setScore(prev => prev + 120)
            colorForSquare.forEach(square => board[square] = {
                src: blank, color:"blank", type: "blank"
            })
            if(!isDragged){
                board[i+width] = {
                    src: fishCandy.src[index],
                    color: chosenColor,
                    type: "fish"
                }
            }

            return {isTrue: true, color: chosenColor, indexArr: colorForSquare}
        }
    }
}

export const randomSquare = ({board}) => {
    let randomIndex = Math.floor(Math.random() * (width * width))
    if(board[randomIndex].src === blank){
        randomIndex = randomSquare({board})
    }
    return randomIndex
}

export const checkFishCandy = ({indexArr, board, setScore}) => {
    let fishIndex = []

    for(let i = 0; i < indexArr.length; i++) {
        if(board[indexArr[i]].type === "fish"){
            fishIndex.push(indexArr[i])
        }
        board[indexArr[i]] = {
            src: blank, color:"blank", type: "blank"
        }
    }

    fishIndex.forEach(() => {
        const randomIndex = randomSquare({board})
console.log("find fish");
console.log(randomIndex);
        board[randomIndex].className = "special"
        console.log(board[randomIndex]);
        if(board[randomIndex].type === "vertical"){
            checkVerticalColor({indexArr: [randomIndex], board, setScore})
        }else if(board[randomIndex].type === "horizon"){
            checkHorizonColor({indexArr: [randomIndex], board, setScore})
        }else if(board[randomIndex].type === "wrapped"){
            checkWrappedCandy({indexArr: [randomIndex], board, setScore, strippedIndex: null})
        }else if(board[randomIndex].type === "fish"){
            checkFishCandy({indexArr: [randomIndex], board, setScore})
        }

        if(board[randomIndex].src !== blank){
            setScore(prev => prev + 20)
            board[randomIndex] = {
                src: blank, color:"blank", type: "blank"
            }
        }
        board[randomIndex].className = ""
    })
    console.log("--clear fish--");
}