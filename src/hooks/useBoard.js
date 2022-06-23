import { useEffect, useState } from "react"
import { width, randomColors } from "../business/Candy"

const createBoard = () => {
    const randomBoard = []

    for(let i = 0; i < width * width; i++) {
        randomBoard.push(randomColors())
    }

    return randomBoard
}

const useBoard = () => {
    const [board, setBoard] = useState([])

    useEffect(() => {
        setBoard(createBoard())
    }, [])

    return [board, setBoard]
}

export default useBoard