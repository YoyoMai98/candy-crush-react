import { useEffect, useState } from "react";
import useBoard from "./hooks/useBoard";

import {checkColumnForFour, checkColumnForThree, checkRowForThree, checkRowForFour, updateBoard,
        checkHorizonColor, checkVerticalColor, checkSpecialColor
} from "./business/CheckBoard";
import { checkColorForSix, checkWrappedCandy } from "./business/CheckWrapperCandy"
import { width, verticalCandyColors, horizonCandyColors, wrappedCandyColors } from "./business/Candy";
import ScoreBoard from "./components/ScoreBoard";

function App() {
  const [score, setScore] = useState(0)
  const [draggedSquare, setDraggedSquare] = useState(null)
  const [replacedSquare, setReplacedSquare] = useState(null)
  let isDragged = false

  const [board, setBoard] = useBoard({setScore})

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

    board[replacedSquareId] = {
      src: draggedSquareSrc,
      color: draggedSquareColor,
      type: draggedSquareType
    }
    board[draggedSquareId] = {
      src: replacedSquareSrc,
      color: replacedSquareColor,
      type: replacedSquareType
    }

    const validIndex = [
      draggedSquareId - 1,
      draggedSquareId + 1,
      draggedSquareId - width,
      draggedSquareId + width
    ]

    if(replacedSquareId && validIndex.includes(replacedSquareId)){
      const checkColumn = checkColumnForFour({board, setScore, isDragged})
      const checkRow = checkRowForFour({board, setScore, isDragged})
      const checkWrap = checkColorForSix({board, setScore, isDragged})
      const checkColThree = checkColumnForThree({board, setScore, isDragged})
      const checkRowThree = checkRowForThree({board, setScore, isDragged})

      isDragged = false

      if(checkSpecialColor({
        firstSquareType: draggedSquareType, secondSquareType: replacedSquareType,
        secondSquareId: replacedSquareId, board, setScore
      })){
        setDraggedSquare(null)
        setReplacedSquare(null)
        return
      }

      else if(checkColumn !== undefined && checkColumn.isTrue){
        if(draggedSquareType === "horizon" || replacedSquareType === "horizon"
          ){
            checkHorizonColor({indexArr: checkColumn.indexArr, board, setScore})
          }else if(draggedSquareType === "vertical" || replacedSquareType === "vertical"
          ){
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
            type: "horizon"
          }
        }else{
          board[draggedSquareId] = {
            src: horizonCandyColors.src[index],
            color: color,
            type: "horizon"
          }
        }
        setDraggedSquare(null)
        setReplacedSquare(null)
        return
      }
      
      else if(checkRow !== undefined && checkRow.isTrue){
        if(draggedSquareType === "horizon" || replacedSquareType === "horizon"
        ){
          checkHorizonColor({indexArr: checkRow.indexArr, board, setScore})
        }else if( draggedSquareType === "vertical" || replacedSquareType === "vertical"
        ){
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
            type: "vertical"
          }
        }else{
          board[draggedSquareId] = {
            src: verticalCandyColors.src[index],
            color: color,
            type: "vertical"
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
            type: "wrapped"
          }
        }else{
          board[draggedSquareId] = {
            src: wrappedCandyColors.src[index],
            color: color,
            type: "wrapped"
          }
        }
        setDraggedSquare(null)
        setReplacedSquare(null)
        return
      }

      else if((checkColThree !== undefined && checkColThree.isTrue) ||
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
          type: replacedSquareType
        }
        board[draggedSquareId] = {
            src: draggedSquareSrc,
            color: draggedSquareColor,
            type: draggedSquareType
          }
        setBoard([...board])
      }

    }else{
      board[replacedSquareId] = {
        src: replacedSquareSrc,
        color: replacedSquareColor,
        type: replacedSquareType
      }
      board[draggedSquareId] = {
          src: draggedSquareSrc,
          color: draggedSquareColor,
          type: draggedSquareType
        }
      isDragged = false
      setBoard([...board])

    }
  }
  useEffect(() => {
    const timer = setInterval(() => {
      checkColumnForFour({board, setScore, isDragged})
      checkRowForFour({board, setScore, isDragged})
      checkColorForSix({board, setScore, isDragged})
      checkColumnForThree({board, setScore})
      checkRowForThree({board, setScore})
      updateBoard({board})
      setBoard([...board])
    }, 100)

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
