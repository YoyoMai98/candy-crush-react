import useBoard from "./hooks/useBoard";
import {checkColumnForFour, checkColumnForThree, checkRowForThree, checkRowForFour, updateBoard} from "./business/CheckBoard";
import { useEffect, useReducer, useState } from "react";
import { width, verticalCandyColors, horizonCandyColors } from "./business/Candy";
import ScoreBoard from "./components/ScoreBoard";

function App() {
  const [score, setScore] = useState(0)
  const [draggedSquare, setDraggedSquare] = useState(null)
  const [replacedSquare, setReplacedSquare] = useState(null)

  const [board, setBoard] = useBoard({setScore})

  const onDrop = e => {
    setReplacedSquare(e.target)
  }

  const onDragStart = e => {
    setDraggedSquare(e.target)
  }

  const onDragEnd = () => {
    const draggedSquareId = parseInt(draggedSquare.getAttribute('id'))
    const replacedSquareId = parseInt(replacedSquare.getAttribute('id'))

    const draggedSquareColor = draggedSquare.getAttribute('color')
    const replacedSquareColor = replacedSquare.getAttribute('color')

    const draggedSquareSrc = draggedSquare.getAttribute('src')
    const replacedSquareSrc = replacedSquare.getAttribute('src')

    board[replacedSquareId] = {
      src: draggedSquareSrc,
      color: draggedSquareColor
    }
    board[draggedSquareId] = {
      src: replacedSquareSrc,
      color: replacedSquareColor
    }

    const validIndex = [
      draggedSquareId - 1,
      draggedSquareId + 1,
      draggedSquareId - width,
      draggedSquareId + width
    ]

    if(replacedSquareId && validIndex.includes(replacedSquareId)){
      const checkColumn = checkColumnForFour({board, setScore})
      const checkRow = checkRowForFour({board, setScore})
      if(checkColumn !== undefined && checkColumn.isTrue){
        const color = checkColumn.color
        const index = horizonCandyColors.color.indexOf(color)
        if(color === draggedSquareColor){
          board[replacedSquareId] = {
            src: horizonCandyColors.src[index],
            color: color
          }
        }else{
          board[draggedSquareId] = {
            src: horizonCandyColors.src[index],
            color: color
          }
        }
      }

      if(checkRow !== undefined && checkRow.isTrue){
        const color = checkRow.color
        const index = verticalCandyColors.color.indexOf(color)
        if(color === draggedSquareColor){
          board[replacedSquareId] = {
            src: verticalCandyColors.src[index],
            color: color
          }
        }else{
          board[draggedSquareId] = {
            src: verticalCandyColors.src[index],
            color: color
          }
        }
      }

      if(
          checkColumnForThree({board, setScore}) ||
          checkRowForThree({board, setScore})
        ){
          board[replacedSquareId] = {
            src: draggedSquareSrc,
            color: draggedSquareColor
          }
          board[draggedSquareId] = {
            src: replacedSquareSrc,
            color: replacedSquareColor
          }
        }
      setDraggedSquare(null)
      setReplacedSquare(null)
    }else{
      board[replacedSquareId] = {
        src: replacedSquareSrc,
        color: replacedSquareColor
      }
      board[draggedSquareId] = {
          src: draggedSquareSrc,
          color: draggedSquareColor
        }
      setBoard([...board])

    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      checkColumnForFour({board, setScore})
      checkRowForFour({board, setScore})
      checkColumnForThree({board, setScore})
      checkRowForThree({board, setScore})
      updateBoard({board})
      setBoard([...board])
    }, 100)

    return () => clearInterval(timer)

  }, [
    setScore,
    setBoard,
    board
  ])

  return (
    <div className="app">
      <div className="game">
        {board.map((candyColor, index) => (
          <img
            src={candyColor.src}
            color={candyColor.color}
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
