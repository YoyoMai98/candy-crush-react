import { useEffect, useState } from "react";

import useBoard from "./hooks/useBoard";
import useTime from "./hooks/useTime";

import {checkColumnForFour, checkColumnForThree, checkRowForThree, checkRowForFour, updateBoard} from "./business/CheckBoard";
import { checkHorizonColor, checkVerticalColor, checkSpecialColor } from "./business/CheckStrippedCandy"
import { checkColorForSix, checkWrappedCandy } from "./business/CheckWrappedCandy"
import { checkColorForSquare } from "./business/CheckFishCandy";
import { width, verticalCandyColors, horizonCandyColors, wrappedCandyColors, fishCandy, bombCandy } from "./business/Candy";
import ScoreBoard from "./components/ScoreBoard";
import { checkColorBomb, checkColumnForFive, checkRowForFive } from "./business/CheckBombCandy";

function App() {
  const [score, setScore] = useState(0)
  const [draggedSquare, setDraggedSquare] = useState(null)
  const [replacedSquare, setReplacedSquare] = useState(null)

  let isDragged = false

  const [board, setBoard] = useBoard({setScore})
  const [refreshTime, resumeTime, pauseTime] = useTime()

  const onDrop = e => {
    e.preventDefault()
    setReplacedSquare(e.target)
  }

  const onDragStart = e => {
    setDraggedSquare(e.target)
  }

  const onDragEnd = () => {
    isDragged = true
    const draggedSquareId = parseInt(draggedSquare.getAttribute('id'))
    const replacedSquareId = parseInt(replacedSquare.getAttribute('id'))

    const draggedSquareColor = draggedSquare.getAttribute('color')
    const replacedSquareColor = replacedSquare.getAttribute('color')

    const draggedSquareSrc = draggedSquare.getAttribute('src')
    const replacedSquareSrc = replacedSquare.getAttribute('src')

    const draggedSquareType = draggedSquare.getAttribute('type')
    const replacedSquareType = replacedSquare.getAttribute('type')

    const draggedSquareClassName = draggedSquare.getAttribute('className')
    const replacedSquareClassName = replacedSquare.getAttribute('className')

    board[replacedSquareId] = {
      src: draggedSquareSrc,
      color: draggedSquareColor,
      type: draggedSquareType,
      className : draggedSquareClassName
    }
    board[draggedSquareId] = {
      src: replacedSquareSrc,
      color: replacedSquareColor,
      type: replacedSquareType,
      className: replacedSquareClassName
    }

    const validIndex = [
      draggedSquareId - 1,
      draggedSquareId + 1,
      draggedSquareId - width,
      draggedSquareId + width
    ]

    if(replacedSquareId && validIndex.includes(replacedSquareId)){
      console.log("draggedSquareId: " + draggedSquareId + ", " + draggedSquareType);
      console.log("replacedSquareId: " +replacedSquareId +", " +  replacedSquareType);
      if(checkSpecialColor({
        firstSquareType: draggedSquareType, secondSquareType: replacedSquareType,
        firstSquareId: draggedSquareId, secondSquareId: replacedSquareId,
        board, setScore, pauseTime
      })){
        console.log("checkSpecialColor");

        setDraggedSquare(null)
        setReplacedSquare(null)
        resumeTime()
        return
      }
      
      if(checkColorBomb({
        firstSquareType: draggedSquareType, secondSquareType: replacedSquareType,
        firstSquareId: draggedSquareId, secondSquareId: replacedSquareId,
        firstSquareColor: draggedSquareColor, secondSquareColor: replacedSquareColor,
        board, setScore
      })){
        console.log("checkColorBomb");

        setDraggedSquare(null)
        setReplacedSquare(null)
        resumeTime()
        return
      }
      const checkColumnBomb = checkColumnForFive({board, setScore, isDragged})
      const checkRowBomb = checkRowForFive({board, setScore, isDragged})
      console.log("--checkColumnForFive--");
      console.log(checkColumnBomb);
      console.log("--checkRowForFive--");
      console.log(checkRowBomb);
      if(checkColumnBomb !== undefined && checkColumnBomb.isTrue){
        const color = checkColumnBomb.color
        if(draggedSquareColor === color){
          board[replacedSquareId] = {
            src: bombCandy.src[0],
            color: bombCandy.color[0],
            type: "bomb",
            className: ""
          }
        }else if(replacedSquareColor === color){
          board[draggedSquareId] = {
            src: bombCandy.src[0],
            color: bombCandy.color[0],
            type: "bomb",
            className: ""
          }
        }
        setDraggedSquare(null)
        setReplacedSquare(null)
        return
      }else if(checkRowBomb !== undefined && checkRowBomb.isTrue){
        const color = checkRowBomb.color
        if(draggedSquareColor === color){
          board[replacedSquareId] = {
            src: bombCandy.src[0],
            color: bombCandy.color[0],
            type: "bomb",
            className: ""
          }
        }else if(replacedSquareColor === color){
          board[draggedSquareId] = {
            src: bombCandy.src[0],
            color: bombCandy.color[0],
            type: "bomb",
            className: ""
          }
        }
        setDraggedSquare(null)
        setReplacedSquare(null)
        return
      }

      const checkColumn = checkColumnForFour({board, setScore, isDragged})
      const checkRow = checkRowForFour({board, setScore, isDragged})
      const checkWrap = checkColorForSix({board, setScore, isDragged})
      const checkFish = checkColorForSquare({board, setScore, isDragged})
console.log("--checkColumnForFour--");
console.log(checkColumn);
console.log("--checkRowForFour--");
console.log(checkRow);
console.log("--checkColorForSix--");
console.log(checkWrap);
console.log("--checkColorForSquare--");
console.log(checkFish);
      isDragged = false
      if(checkColumn !== undefined && checkColumn.isTrue){
        if(draggedSquareType === "horizon" || replacedSquareType === "horizon"){
          checkHorizonColor({indexArr: checkColumn.indexArr, board, setScore})
        }else if(draggedSquareType === "vertical" || replacedSquareType === "vertical"){
          checkVerticalColor({indexArr: checkColumn.indexArr, board, setScore})
        }else if(draggedSquareType === "wrapped" || replacedSquareType === "wrapped"){
          checkWrappedCandy({board, setScore, indexArr: checkColumn.indexArr})
        }
console.log("checkColumn");
        const color = checkColumn.color
        const index = horizonCandyColors.color.indexOf(color)
        if(color === draggedSquareColor){
          board[replacedSquareId] = {
            src: horizonCandyColors.src[index],
            color: color,
            type: "horizon",
            className: ""
          }
        }else{
          board[draggedSquareId] = {
            src: horizonCandyColors.src[index],
            color: color,
            type: "horizon",
            className: ""
          }
        }
        setDraggedSquare(null)
        setReplacedSquare(null)
        return
      }
      
      else if(checkRow !== undefined && checkRow.isTrue){
        if(draggedSquareType === "horizon" || replacedSquareType === "horizon"){
          checkHorizonColor({indexArr: checkRow.indexArr, board, setScore})
        }else if( draggedSquareType === "vertical" || replacedSquareType === "vertical"){
          checkVerticalColor({indexArr: checkRow.indexArr, board, setScore})
        }else if(draggedSquareType === "wrapped" || replacedSquareType === "wrapped"){
          checkWrappedCandy({board, setScore, indexArr: checkRow.indexArr})
        }
console.log("checkRow");
        const color = checkRow.color
        const index = verticalCandyColors.color.indexOf(color)
        if(color === draggedSquareColor){
          board[replacedSquareId] = {
            src: verticalCandyColors.src[index],
            color: color,
            type: "vertical",
            className: ""
          }
        }else{
          board[draggedSquareId] = {
            src: verticalCandyColors.src[index],
            color: color,
            type: "vertical",
            className: ""
          }
        }
        setDraggedSquare(null)
        setReplacedSquare(null)
        return
      }

      else if(checkWrap !== undefined && checkWrap.isTrue){
        console.log("checkWrap");
        const color = checkWrap.color
        const index = wrappedCandyColors.color.indexOf(color)
        if(color === draggedSquareColor){
          board[replacedSquareId] = {
            src: wrappedCandyColors.src[index],
            color: color,
            type: "wrapped",
            className: ""
          }
        }else{
          board[draggedSquareId] = {
            src: wrappedCandyColors.src[index],
            color: color,
            type: "wrapped",
            className: ""
          }
        }
        setDraggedSquare(null)
        setReplacedSquare(null)
        return
      }

      else if(checkFish !== undefined && checkFish.isTrue){
        console.log("checkFish");
        const color = checkFish.color
        const index = fishCandy.color.indexOf(color)
        if(color === draggedSquareColor){
          board[replacedSquareId] = {
            src: fishCandy.src[index],
            color: color,
            type: "fish",
            className: ""
          }
        }else{
          board[draggedSquareId] = {
            src: fishCandy.src[index],
            color: color,
            type: "fish",
            className: ""
          }
        }
        setDraggedSquare(null)
        setReplacedSquare(null)
        return
      }

      const checkColThree = checkColumnForThree({board, setScore, isDragged})
      const checkRowThree = checkRowForThree({board, setScore, isDragged})
      if((checkColThree !== undefined && checkColThree.isTrue) ||
              (checkRowThree !== undefined && checkRowThree.isTrue)
        ){
          console.log(true);
          setDraggedSquare(null)
          setReplacedSquare(null)
          return
        }

      else {
        board[replacedSquareId] = {
          src: replacedSquareSrc,
          color: replacedSquareColor,
          type: replacedSquareType,
          className: replacedSquareClassName
        }
        board[draggedSquareId] = {
            src: draggedSquareSrc,
            color: draggedSquareColor,
            type: draggedSquareType,
            className: draggedSquareClassName
          }
        setBoard([...board])
      }

    }else{
      board[replacedSquareId] = {
        src: replacedSquareSrc,
        color: replacedSquareColor,
        type: replacedSquareType,
        className: replacedSquareClassName
      }
      board[draggedSquareId] = {
          src: draggedSquareSrc,
          color: draggedSquareColor,
          type: draggedSquareType,
          className: draggedSquareClassName
        }
      isDragged = false
      setBoard([...board])

    }
  }
  useEffect(() => {
    const timer = setInterval(() => {
      checkColumnForFive({board, setScore, isDragged})
      checkRowForFive({board, setScore, isDragged})
      checkColumnForFour({board, setScore, isDragged})
      checkRowForFour({board, setScore, isDragged})
      checkColorForSix({board, setScore, isDragged})
      checkColorForSquare({board, setScore, isDragged})
      checkColumnForThree({board, setScore})
      checkRowForThree({board, setScore})
      updateBoard({board})
      setBoard([...board])
    }, refreshTime)

    return () => clearInterval(timer)

  }, [
    setScore,
    setBoard,
    board,
    isDragged
  ])

  return (
    <div className="app">
    <h2>Candy Crush</h2>
      <div className="game">
        {board.map((candyColor, index) => (
          <img
            className={candyColor.className}
            src={candyColor.src}
            color={candyColor.color}
            type={candyColor.type}
            alt={candyColor} 
            key={index}
            id={index}
            draggable={true}
            onDragStart={onDragStart}
            onDragOver={e => e.preventDefault()}
            onDragEnter={e => e.preventDefault()}
            onDragLeave={e => e.preventDefault()}
            onDrop={onDrop}
            onDragEnd={onDragEnd}
          />
        ))}
      </div>
      <aside>
          <ScoreBoard score={score} />
      </aside>
    </div>
  );
}

export default App;
