import useBoard from "./hooks/useBoard";
import {checkColumnForFour, checkColumnForThree, checkRowForThree, checkRowForFour, updateBoard} from "./business/CheckBoard";
import { useEffect, useState } from "react";
import { width } from "./business/Candy";
import useScore from "./hooks/useScore";
import ScoreBoard from "./components/ScoreBoard";

function App() {
  const [board, setBoard] = useBoard([])
  const [score, setScore, scoreDisplay] = useScore({
    board,
    checkColumnForFour, checkColumnForThree, checkRowForThree, checkRowForFour
  })
  
  const [draggedSquare, setDraggedSquare] = useState(null)
  const [replacedSquare, setReplacedSquare] = useState(null)

  const onDrop = e => {
    setReplacedSquare(e.target)
  }

  const onDragStart = e => {
    setDraggedSquare(e.target)
  }

  const onDragEnd = () => {
    const draggedSquareId = parseInt(draggedSquare.getAttribute('id'))
    const replacedSquareId = parseInt(replacedSquare.getAttribute('id'))

    board[replacedSquareId] = draggedSquare.getAttribute('src')
    board[draggedSquareId] = replacedSquare.getAttribute('src')

    const validIndex = [
      draggedSquareId - 1,
      draggedSquareId + 1,
      draggedSquareId - width,
      draggedSquareId + width
    ]

    if(replacedSquareId && validIndex.includes(replacedSquareId) && (
      checkColumnForFour({board}) ||
      checkRowForFour({board}) ||
      checkColumnForThree({board}) ||
      checkRowForThree({board})
    )){
      setDraggedSquare(null)
      setReplacedSquare(null)
    }else{
      board[replacedSquareId] = replacedSquare.getAttribute('src')
      board[draggedSquareId] = draggedSquare.getAttribute('src')
      setBoard([...board])
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      checkColumnForFour({board})
      checkRowForFour({board})
      checkColumnForThree({board})
      checkRowForThree({board})
      updateBoard({board})
      setBoard([...board])
      scoreDisplay()
    }, 100)

    return () => clearInterval(timer)

  }, [checkColumnForFour, checkRowForFour, checkColumnForThree, checkRowForThree, updateBoard, board])

  return (
    <div className="app">
      <div className="game">
        {board.map((candyColor, index) => (
          <img
            src={candyColor}
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
      <ScoreBoard score={score} />
    </div>
  );
}

export default App;
