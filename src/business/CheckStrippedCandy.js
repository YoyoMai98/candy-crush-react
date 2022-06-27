import { width, strippedTypes } from "./Candy"
import { checkWrappedCandy } from "./CheckWrappedCandy"
import blank from '../images/blank.png'

export const checkHorizonColor = ({indexArr, board, setScore}) => {
    // let horIndexArr
    let rowArr = []
    let verArr = []

    indexArr.forEach(square => {
        if(board[square].type === "horizon") {
            // horIndexArr.push(square)
          rowArr.push(parseInt(square / width))
        }else if(board[square].type === "vertical"){
          verArr.push(square)
        }
    })

    if(verArr.length !== 0){
      checkVerticalColor({indexArr: verArr, board, setScore})
    }
    if(rowArr.length === 0){
      return
    }

    console.log(indexArr);
    console.log("rowArr: "+rowArr);
    rowArr.forEach(row => {
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
        // if(parseInt(j / width) !== row && board[j].type === "horizon"){
        //   checkHorizonColor({indexArr: [j], board, setScore})
        // }
        if(board[j].type === "wrapped"){
          console.log("find-wrapped in horizon");
          checkWrappedCandy({board, setScore, indexArr: [j]})
        }
        board[j] = {
            src:blank, color:"blank", type: "blank"
            }
      }
    })
    console.log("clear horizontal");
}

export const checkVerticalColor = ({indexArr, board, setScore}) => {
    // let verIndex
    let colArr = []
    let horArr = []

    indexArr.forEach(square => {
        if(board[square].type === "vertical") {
            // verIndex = square
          colArr.push(square % width)
        }else if(board[square].type === "horizon"){
          horArr.push(square)
        }
    })

    if(horArr.length !== 0){
      checkHorizonColor({indexArr: horArr, board, setScore})
    }
    if(colArr.length === 0){
      return
    }

console.log(indexArr);
console.log("colArr: "+ colArr);
    colArr.forEach(col => {
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
        // if(j % width !== col && board[j].type === "vertical"){
        //   console.log("find another vertical");
        //   checkVerticalColor({indexArr: [j], board, setScore})
        // }
        if(board[j].type === "wrapped"){
            console.log("find-wrapped in vertical");
            checkWrappedCandy({board, setScore, indexArr: [j]})
        }
        board[j] = {
            src:blank, color:"blank", type: "blank"
            }
      }
    })
    console.log("clear vertical");
}

export const checkSpecialColor = ({
    firstSquareType, secondSquareType, firstSquareId, secondSquareId, board, setScore,
    pauseTime
  }) => {
    if(strippedTypes.includes(firstSquareType) && strippedTypes.includes(secondSquareType)){
      pauseTime()
      console.log("firstSquareId: " + firstSquareId + " secondSquareId: " + secondSquareId);
      const row = parseInt(secondSquareId / width)
      const col = secondSquareId % width
      for(let i = row * width; i < row * width + width; i++){
        if(board[i].type === "vertical" && (
          i !== secondSquareId && i !== firstSquareId
        )){
                  // horOrVerColor({
                  //     board,
                  //     specialColorId: i,
                  //     isVer: true,
                  //     isHor: false,
                  //     setScore
                  // })
          console.log("i: "+i+"row: "+row);
          console.log("find vertical in specialColor");
          checkVerticalColor({indexArr: [i], board, setScore})
        }
        setScore(prev => prev + 60)
        board[i] = {
          src:blank, color:"blank", type: "blank"
        }
      }
      for(let j = col; j < width * width; j = j+width){
        if(board[j].src !== blank){
          if(board[j].type === "horizon" && 
            (j !== secondSquareId && j !== firstSquareId)
          ){
                      // horOrVerColor({
                      //     board,
                      //     specialColorId: j,
                      //     isVer: false,
                      //     isHor: true,
                      //     setScore
                      // })
            console.log("j: " + j + "col: "+col);
            console.log("find horizon in specialColor");
            checkHorizonColor({indexArr: [j], board, setScore})
          }
          setScore(prev => prev + 60)
          board[j] = {
            src:blank, color:"blank", type: "blank"
          }
        }
      }
      console.log("--two stripped candy--");
      return true
    }
    
    else if((strippedTypes.includes(firstSquareType) && secondSquareType === "wrapped") ||
      (strippedTypes.includes(secondSquareType) && firstSquareType === "wrapped")
    ){
      pauseTime()
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

    else if(firstSquareType === "wrapped" && secondSquareType === "wrapped"){
    }
}