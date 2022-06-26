import { randomColors, width, specialTypes, strippedTypes } from "./Candy"
import blank from '../images/blank.png'
import { horizonCandyColors, verticalCandyColors } from "./Candy"
import { checkWrappedCandy } from "./CheckWrapperCandy"

export const checkColumnForFour = ({board, setScore, isDragged}) => {
    for(let i = 0; i < 5 * width; i++) {
        const columnForFour = [i, i + width, i + width * 2, i + width * 3]
        const chosenColor = board[i].color
        const isBlank = board[i].src === blank

        if(columnForFour.every(square => board[square].color === chosenColor && !isBlank)) {
            if(columnForFour.some(square => board[square].type === "horizon")){
              checkHorizonColor({indexArr: columnForFour, board, setScore})
            }else if(columnForFour.some(square => board[square].type === "vertical")){
                checkVerticalColor({indexArr: columnForFour, board, setScore})
            }else if(columnForFour.some(square => board[square].type === "wrapped")){
                checkWrappedCandy({board, setScore, indexArr: columnForFour})
            }

            const index = horizonCandyColors.color.indexOf(chosenColor)
            setScore(prev => prev + 120)
            columnForFour.forEach(square => board[square] = {
                src:blank, color:"blank", type: "blank"
                })
            if(!isDragged){
                board[i + width * 3] = {
                src: horizonCandyColors.src[index], color: chosenColor, type: "horizon"
                }
            }
            
            return {isTrue: true, color: chosenColor, indexArr: columnForFour}
        }
    }
}

export const checkRowForFour = ({board, setScore, isDragged}) => {
    for(let i = 0; i < width * width - 3; i++) {
        const rowForFour = [i, i + 1, i + 2, i + 3]
        const chosenColor = board[i].color
        const isBlank = board[i].src === blank

        if(i % width === 7 || i % width === 6 || i % width === 5){
            continue
        }

        if(rowForFour.every(square => board[square].color === chosenColor && !isBlank)) {
            if(rowForFour.some(square => board[square].type === "horizon")){
                checkHorizonColor({indexArr: rowForFour, board, setScore})
            }else if(rowForFour.some(square => board[square].type === "vertical")){
                checkVerticalColor({indexArr: rowForFour, board, setScore})
            }else if(rowForFour.some(square => board[square].type === "wrapped")){
                checkWrappedCandy({board, setScore, indexArr: rowForFour})
            }
            
            const index = verticalCandyColors.color.indexOf(chosenColor)
            setScore(prev => prev + 120)
            rowForFour.forEach(square => board[square] = {
                src:blank, color:"blank", type: "blank"
                })
            if(!isDragged){
                board[i] = {
                src: verticalCandyColors.src[index], color: chosenColor, type: "vertical"
                }
            }
            
            return {isTrue: true, color: chosenColor, indexArr: rowForFour}
        }
    }
}

export const checkColumnForThree = ({board, setScore}) => {
    for(let i = 0; i < 6 * width; i++) {
        const columnForThree = [i, i + width, i + width * 2]
        const chosenColor = board[i].color
        const isBlank = board[i].src === blank

        if(columnForThree.every(square => board[square].color === chosenColor && !isBlank)) {
            if(columnForThree.some(square => board[square].type === "horizon")){
                checkHorizonColor({indexArr: columnForThree, board, setScore})
            }else if(columnForThree.some(square => board[square].type === "vertical")){
                checkVerticalColor({indexArr: columnForThree, board, setScore})
            }else if(columnForThree.some(square => board[square].type === "wrapped")){
                checkWrappedCandy({indexArr: columnForThree, board, setScore})
            }
            else {
                setScore(prev => prev + 60)
                columnForThree.forEach(square => board[square] = {
                src:blank, color:"blank", type: "blank"
                })
            }
            return {isTrue: true, indexArr: columnForThree}
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
            if(rowForThree.some(square => board[square].type === "horizon")){
                checkHorizonColor({indexArr: rowForThree, board, setScore})
            }else if(rowForThree.some(square => board[square].type === "vertical")){
                checkVerticalColor({indexArr: rowForThree, board, setScore})
            }else if(rowForThree.some(square => board[square].type === "wrapped")){
                checkWrappedCandy({indexArr: rowForThree, board, setScore})
            }
            else{
                setScore(prev => prev + 60)
                rowForThree.forEach(square => board[square] = {
                src:blank, color:"blank", type: "blank"
                })
            }
            return {isTrue: true, indexArr: rowForThree}
        }
    }
}

export const checkHorizonColor = ({indexArr, board, setScore}) => {
    let horIndex

    // for(let i = start; i <= end; i = i + interval) {
    //     if(board[i].type === "horizon") {
    //         horIndex = i
    //     }
    // }
    indexArr.forEach(square => {
        if(board[square].type === "horizon") {
            horIndex = square
        }
    })

    const row = parseInt(horIndex / width)

    for(let j = row * width; j < row * width + width; j++){
        setScore(prev => prev + 60)
        if(board[j].type === "vertical") {
            // horOrVerColor({
            //     board,
            //     specialColorId: j,
            //     isVer: true,
            //     isHor: false,
            //     setScore
            // })
            console.log("find-vertical");
            checkVerticalColor({indexArr: [j], board, setScore})
        }
        board[j] = {
            src:blank, color:"blank", type: "blank"
            }
    }
}

export const checkVerticalColor = ({indexArr, board, setScore}) => {
    let verIndex

    indexArr.forEach(square => {
        if(board[square].type === "vertical") {
            verIndex = square
        }
    })

    const col = verIndex % width

    for(let j = col; j < width * width; j = j+width){
        setScore(prev => prev + 60)
        if(board[j].type === "horizon"){
            // horOrVerColor({
            //     board,
            //     specialColorId: j,
            //     isVer: false,
            //     isHor: true,
            //     setScore
            // })
            console.log("find-horizon");
            checkHorizonColor({indexArr: [j], board, setScore})
        }
        if(board[j].type === "wrapped"){
            console.log("find-wrapped");
            checkWrappedCandy({board, setScore, indexArr: [j]})
        }
        board[j] = {
            src:blank, color:"blank", type: "blank"
            }
    }
}

// export const horOrVerColor = ({board, specialColorId, isVer, isHor, setScore}) => {
//     if(isVer) {
//         const col = specialColorId % width
//         for(let i = col; i < width * width; i = i+width){
//             if(board[i].type === "horizon"){
//                 horOrVerColor({
//                     board,
//                     specialColorId: i,
//                     isVer: false,
//                     isHor: true,
//                     setScore
//                 })
//             }
//             setScore(prev => prev + 60)
//             board[i] = {
//                 src:blank, color:"blank", type: "blank"
//                 }
//         }
//     }else if(isHor){
//         const row = parseInt(specialColorId / width)
//         for(let i = row * width; i < row * width + width; i++){
//             if(board[i].type === "vertical"){
//                 horOrVerColor({
//                     board,
//                     specialColorId: i,
//                     isVer: true,
//                     isHor: false,
//                     setScore
//                 })
//             }
//             setScore(prev => prev + 60)
//             board[i] = {
//                 src:blank, color:"blank", type: "blank"
//                 }
//         }
//     }else{
//         return
//     }
// }

export const checkSpecialColor = ({
  firstSquareType, secondSquareType, secondSquareId, board, setScore
}) => {
  if(strippedTypes.includes(firstSquareType) && strippedTypes.includes(secondSquareType)){
    const id = secondSquareId
    const row = parseInt(id / width)
    const col = id % width
    for(let i = row * width; i < row * width + width; i++){
      if(board[i].type === "vertical"){
                // horOrVerColor({
                //     board,
                //     specialColorId: i,
                //     isVer: true,
                //     isHor: false,
                //     setScore
                // })
        checkVerticalColor({indexArr: [i], board, setScore})
      }
      setScore(prev => prev + 60)
      board[i] = {
        src:blank, color:"blank", type: "blank"
      }
    }
    for(let j = col; j < width * width; j = j+width){
      if(board[j].src !== blank){
        if(board[j].type === "horizon"){
                    // horOrVerColor({
                    //     board,
                    //     specialColorId: j,
                    //     isVer: false,
                    //     isHor: true,
                    //     setScore
                    // })
          checkHorizonColor({indexArr: [j], board, setScore})
        }
        setScore(prev => prev + 60)
        board[j] = {
          src:blank, color:"blank", type: "blank"
        }
      }
    }
    return true
  }
  
  else if((strippedTypes.includes(firstSquareType) && secondSquareType === "wrapped") ||
    (strippedTypes.includes(secondSquareType) && firstSquareType === "wrapped")
  ){
    console.log("wrapped+stripped");
    const id = secondSquareId
    const row = parseInt(id / width)
    const col = id % width

    let coefficientForRow
    let countForRow
    let coefficientForCol
    let countForColumn

    if(row === 0){
      coefficientForRow = 0
      countForRow = 2
    }else if(row === width - 1){
      coefficientForRow = row - 1
      countForRow = 2
    }else{
      coefficientForRow = row - 1
      countForRow = 3
    }

    if(col === 0){
      coefficientForCol = 0
      countForColumn = 2
    }else if(col === width - 1){
      coefficientForCol = col - 1
      countForColumn = 2
    }else{
      coefficientForCol = col - 1
      countForColumn = 3
    }

    for(let i = coefficientForRow * width; i < (coefficientForRow + countForRow) * width; i++){
      if(board[i].type === "vertical"){
        if(i % width !== coefficientForCol && i % width !== coefficientForCol+1){
          if((countForColumn === 2) ||
              (countForColumn === 3 && i % width !== coefficientForCol+1)
          ){
            checkVerticalColor({indexArr: [i], board, setScore})
          }
        }
      }
      setScore(prev => prev + 60)
      board[i] = {
        src:blank, color:"blank", type: "blank"
      }
    }
    for(let j = coefficientForCol; j < width * width; j = j+width){
      for(let k = j; k < j+countForColumn; k++){
        if(board[k].src !== blank){
          if(board[k].type === "horizon"){
            if(parseInt(k/width) !== coefficientForRow && parseInt(k/width) !== coefficientForRow+1){
              if(countForRow === 2||
                (countForRow === 3 && parseInt(k/width) !== coefficientForRow+2)
              ){
                checkHorizonColor({indexArr: [k], board, setScore})
              }
            }
          }
          setScore(prev => prev + 60)
          board[k] = {
            src:blank, color:"blank", type: "blank"
          }
        }
      }
    }
    return true
  }
}

export const updateBoard = ({board}) => {
    for(let i = 0; i < width * 7; i++){
        const isFirstRow = i >= 0 && i <= (width - 1)

        if(isFirstRow && board[i].src === blank){
            board[i] = randomColors()
        }

        if(board[i + width].src === blank){
            board[i + width] = board[i]
            board[i] = {src:blank, color:"blank", type:"blank"}
        }
    }
}