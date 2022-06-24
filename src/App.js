import useBoard from "./hooks/useBoard";
import {checkColumnForFour, checkColumnForThree, checkRowForThree, checkRowForFour, updateBoard} from "./business/CheckBoard";
import { useEffect, useState } from "react";
import { width } from "./business/Candy";
import ScoreBoard from "./components/ScoreBoard";

function App() {
  const [board, setBoard] = useBoard([])

  const [score, setScore] = useState(0)
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
      checkColumnForFour({board, setScore}) ||
      checkRowForFour({board, setScore}) ||
      checkColumnForThree({board, setScore}) ||
      checkRowForThree({board, setScore})
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
      checkColumnForFour({board, setScore})
      checkRowForFour({board, setScore})
      checkColumnForThree({board, setScore})
      checkRowForThree({board, setScore})
      updateBoard({board})
      setBoard([...board])
    }, 100)

    return () => clearInterval(timer)

  }, [
    checkColumnForFour,
    checkRowForFour,
    checkColumnForThree,
    checkRowForThree,
    updateBoard,
    setScore,
    board
  ])

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
      <aside>
          <ScoreBoard score={score} />
      </aside>
    </div>
  );
}

export default App;
