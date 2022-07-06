import { width, bombCandy, verticalCandyColors } from "./Candy"
import blank from '../images/blank.png'
import { checkHorizonColor, checkVerticalColor } from "./CheckStrippedCandy"
import { checkWrappedCandy } from "./CheckWrappedCandy"
import { checkFishCandy } from "./CheckFishCandy"
import { horizonCandyColors, wrappedCandyColors, fishCandy } from "./Candy"

export const checkColumnForFive = ({board, setScore, isDragged}) => {
  for(let i = 0; i < 4 * width; i++){
    const columnForFive = [i, i + width, i + width * 2, i + width * 3, i + width * 4]
    const chosenColor = board[i].color
    const isBlank = board[i].src === blank

    if(columnForFive.every(square => board[square].color === chosenColor) && !isBlank){
      setScore(prev => prev + 200)
      columnForFive.forEach(square => board[square] = {
        src: blank, color:"blank", type: "blank"
      })
      if(!isDragged){
        board[i] = {
          src: bombCandy.src[0], color: bombCandy.color[0], type: "bomb"
        }
      }
      return {isTrue: true, color: chosenColor}
    }
  }
}

export const checkRowForFive = ({board, setScore, isDragged}) => {
  for(let i = 0; i < width * width - 4; i++){
    const rowForFive = [i, i+1, i+2, i+3, i+4]
    const chosenRow = parseInt(i / width)
    const chosenColor = board[i].color
    const isBlank = board[i].src === blank

    if(i % width === 7 || i % width === 6 || i % width === 5) continue

    if(rowForFive.every(square => parseInt(square / width) === chosenRow) &&
      rowForFive.every(square => board[square].color === chosenColor) &&
      !isBlank){
      setScore(prev => prev + 200)
      rowForFive.forEach(square => board[square] = {
        src: blank, color:"blank", type: "blank"
      })
      if(!isDragged){
        board[i] = {
          src: bombCandy.src[0], color: bombCandy.color[0], type: "bomb"
        }
      }
      return {isTrue: true, color: chosenColor}
    }
  }
}

export const checkColorBomb = ({
  firstSquareType, secondSquareType,
  firstSquareColor, secondSquareColor,
  firstSquareId, secondSquareId,
  board, setScore
}) => {
  if(firstSquareType === "bomb" && secondSquareType !== "bomb"){
    // pauseTime()
    clearColorBomb({
      chosenColor: secondSquareColor, index: secondSquareId, board, setScore,
      squareType: secondSquareType
    })
    return true
  }else if(firstSquareType !== "bomb" && secondSquareType === "bomb"){
    // pauseTime()
    clearColorBomb({
      chosenColor: firstSquareColor, index: firstSquareId, board, setScore,
      squareType: firstSquareType
    })
    return true
  }else if(firstSquareType === "bomb" && secondSquareType === "bomb"){
    // pauseTime()
    for(let i = 0; i < board.length; i++){
      if(board.src === blank) continue
      setScore(prev => prev + 60)
      board[i] = {
        src: blank, color:"blank", type: "blank"
      }
    }
    return true
  }
}

export const clearColorBomb = ({
  chosenColor, index, board, setScore, squareType
}) => {
  console.log("clear Color Bomb");
  
  if(squareType !== "normal" && squareType !== "blank"){
    let type
    if(squareType === "horizon"){
      type = horizonCandyColors
    }else if(squareType === "vertical"){
      type = verticalCandyColors
    }else if(squareType === "wrapped"){
      type = wrappedCandyColors
    }else if(squareType === "fish"){
      type = fishCandy
    }
    console.log(type);
    const id = type.color.indexOf(chosenColor)
    for(let i = 0; i < board.length; i++){
      if(board[i].color === chosenColor){
        setScore(prev => prev + 120)
        board[i] = {
          src: type.src[id], color: chosenColor, type: type.type
        }
      }
    }
  }
  if(board[index].type === "bomb"){
    board[index] = {
      src: blank, color:"blank", type: "blank"
    }
  }

  for(let i = 0; i < board.length; i++){
    if(board[i].color === chosenColor && board[i].src !== blank){
      if(board[i].type === "vertical") {
        console.log("find-vertical in bomb");
        console.log("vertical id: "+i);
        console.log(board[i]);
        checkVerticalColor({indexArr: [i], board, setScore})
        continue
      }else if(board[i].type === "horizon") {
        console.log("find-horizon in bomb");
        console.log("horizon id: "+i);
        console.log(board[i]);
        checkHorizonColor({indexArr: [i], board, setScore})
        continue
      }else if(board[i].type === "wrapped"){
        console.log("find-wrapped in bomb");
        console.log("wrap id: "+i);
        console.log(board[i]);
        checkWrappedCandy({indexArr: [i], board, setScore})
        continue
      }else if(board[i].type === "fish"){
        console.log("find-fish in bomb");
        console.log("fish-index: "+i);
        console.log(board[i]);
        checkFishCandy({indexArr: [i], board, setScore})
        continue
      }
      if(board[i].src === blank) continue
      setScore(prev => prev + 60)
      board[i] = {
        src: blank, color: "blank", type: "blank"
      }
    }
  }
}