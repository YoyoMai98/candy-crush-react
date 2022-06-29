import { width, strippedTypes, specialTypes } from "./Candy"
import { checkWrappedCandy } from "./CheckWrappedCandy"
import blank from '../images/blank.png'
import { checkFishCandy, randomSquare } from "./CheckFishCandy"

export const checkHorizonColor = ({indexArr, board, setScore, isRandom}) => {
    // let rowArr = []
    let horArr = []
    let verArr = []
    let preservedRow

    indexArr.forEach(square => {
        if(board[square].type === "horizon") {
          horArr.push(square)
          // rowArr.push(parseInt(square / width))
        }else if(board[square].type === "vertical"){
          verArr.push(square)
        }
    })

    if(verArr.length !== 0){
      checkVerticalColor({indexArr: verArr, board, setScore})
    }
    if(horArr.length === 0){
      if(isRandom){
        horArr = indexArr
      }else{
        return
      }
    }

    console.log(indexArr);
    console.log("horArr: "+horArr);
    for(let id = 0; id < horArr.length; id++){
      const square = horArr[id]
      const row = parseInt(square / width)

      if(id === 0){
        preservedRow = row
      }else if(preservedRow === row) continue

      for(let j = row * width; j < row * width + width; j++){
        if(board[j].type === "vertical") {
            console.log("find-vertical");
            checkVerticalColor({indexArr: [j], board, setScore})
            continue
        }
        // if(parseInt(j / width) !== row && board[j].type === "horizon"){
        //   checkHorizonColor({indexArr: [j], board, setScore})
        // }
        if(board[j].type === "wrapped"){
          console.log("find-wrapped in horizon");
          checkWrappedCandy({board, setScore, indexArr: [j], strippedIndex: square})
          continue
        }
        if(board[j].type === "fish"){
          console.log("find-fish in horizon");
          checkFishCandy({board, setScore, indexArr: [j]})
          continue
        }
        if(board[j].src !== blank){
          setScore(prev => prev + 60)
          board[j] = {
            src:blank, color:"blank", type: "blank"
            }
        }
      }
    }
    // rowArr.forEach(row => {
    //   for(let j = row * width; j < row * width + width; j++){
    //     if(board[j].type === "vertical") {
    //         console.log("find-vertical");
    //         checkVerticalColor({indexArr: [j], board, setScore})
    //         continue
    //     }
    //     // if(parseInt(j / width) !== row && board[j].type === "horizon"){
    //     //   checkHorizonColor({indexArr: [j], board, setScore})
    //     // }
    //     if(board[j].type === "wrapped"){
    //       console.log("find-wrapped in horizon");
    //       checkWrappedCandy({board, setScore, indexArr: [j], strippedIndex: j})
    //       continue
    //     }
    //     if(board[j].src !== blank){
    //       setScore(prev => prev + 60)
    //       board[j] = {
    //         src:blank, color:"blank", type: "blank"
    //         }
    //     }
    //   }
    // })
    console.log("clear horizontal");
}

export const checkVerticalColor = ({indexArr, board, setScore, isRandom}) => {
    // let colArr = []
    let horArr = []
    let verArr = []
    let preservedCol

    indexArr.forEach(square => {
        if(board[square].type === "vertical") {
          verArr.push(square)
          // colArr.push(square % width)
        }else if(board[square].type === "horizon"){
          horArr.push(square)
        }
    })

    if(horArr.length !== 0){
      checkHorizonColor({indexArr: horArr, board, setScore})
    }
    if(verArr.length === 0){
      if(isRandom){
        verArr = indexArr
      }else{
        return
      }
    }

    for(let id = 0; id < verArr.length; id++){
      const square = verArr[id]
      const col = square % width
      
      if(id === 0){
        preservedCol = col
      }else if(preservedCol === col) continue

      for(let j = col; j < width * width; j = j+width){
        if(board[j].type === "horizon"){
            console.log("find-horizon");
            checkHorizonColor({indexArr: [j], board, setScore})
            continue
        }
        // if(j % width !== col && board[j].type === "vertical"){
        //   console.log("find another vertical");
        //   checkVerticalColor({indexArr: [j], board, setScore})
        // }
        if(board[j].type === "wrapped"){
            console.log("find-wrapped in vertical");
            checkWrappedCandy({board, setScore, indexArr: [j], strippedIndex: square})
            continue
        }
        if(board[j].type === "fish"){
          console.log("find-fish in vertical");
          checkFishCandy({board, setScore, indexArr: [j]})
        }
        if(board[j].src === blank) continue
        setScore(prev => prev + 60)
        board[j] = {
          src:blank, color:"blank", type: "blank"
        }
      }
    }

console.log(indexArr);
console.log("verArr: "+ verArr);
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
          console.log("i: "+i+" row: "+row);
          console.log("find vertical in specialColor");
          checkVerticalColor({indexArr: [i], board, setScore})
          continue
        }
        if(board[i].type === "fish"){
          console.log("find fish in specialColor");
          checkFishCandy({indexArr: [i], board, setScore})
          continue
        }
        if(board[i].type === "wrapped" && (
          i !== secondSquareId && i !== firstSquareId
        )){
          console.log("find wrapped in specialColor");
          checkWrappedCandy({indexArr: [i], board, setScore})
          continue
        }
        if(board[i].src === blank) continue
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
            continue
          }
          if(board[j].type === "fish"){
            console.log("find fish in specialColor");
            checkFishCandy({indexArr: [j], board, setScore})
            continue
          }
          if(board[j].type === "wrapped" && (
            j !== secondSquareId && j !== firstSquareId
          )){
            console.log("find wrapped in specialColor");
            checkWrappedCandy({indexArr: [j], board, setScore})
            continue
          }
          if(board[j].src === blank) continue
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
                (countForColumn === 3 && i % width !== coefficientForCol+2)
            ){
              checkVerticalColor({indexArr: [i], board, setScore})
              continue
            }
          }
        }
        if(board[i].type === "wrapped" && (
          i !== secondSquareId && i !== firstSquareId
        )){
          checkWrappedCandy({indexArr: [i], board, setScore})
          continue
        }
        if(board[i].type === "fish"){
          console.log("find fish in wrapped & stripped");
          checkFishCandy({indexArr: [i], board, setScore})
          continue
        }
        if(board[i].src === blank) continue
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
                  continue
                }
              }
            }
            if(board[k].type === "wrapped" && (
              k !== secondSquareId && k !== firstSquareId
            )){
              checkWrappedCandy({indexArr: [k], board, setScore})
              continue
            }
            if(board[k].type === "fish"){
              console.log("find fish in wrapped & stripped");
              checkFishCandy({indexArr: [k], board, setScore})
              continue
            }
            if(board[k].src === blank) continue
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
      pauseTime()
      console.log("wrapped + wrapped");
      return true
    }

    else if(firstSquareType === "fish" && secondSquareType === "fish"){
      pauseTime()
      board[firstSquareId] = {
        src: blank, color:"blank", type: "blank"
      }
      board[secondSquareId] = {
        src: blank, color:"blank", type: "blank"
      }

      for(let i = 0; i < 3; i++){
        const randomIndex = randomSquare()
        console.log("randomIndex" + randomIndex);
        board[randomIndex].className = "special"
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
            board[randomIndex] = {
                src: blank, color:"blank", type: "blank"
            }
        }
        board[randomIndex].className = ""
      }
      console.log("fish+fish");
      return true
    }

    else if(firstSquareType === "fish" && specialTypes.includes(secondSquareType)){
      pauseTime()
      board[firstSquareId] = {
        src: blank, color:"blank", type: "blank"
      }
      board[secondSquareId] = {
        src: blank, color:"blank", type: "blank"
      }
      const randomIndex = randomSquare()
      board[randomIndex].className = "special"
      console.log("randomIndex: "+randomIndex);
      console.log(board[randomIndex]);
      if(secondSquareType === "horizon"){
        console.log("fish + horizon");
        checkHorizonColor({indexArr: [randomIndex], board, setScore, isRandom: true});
      }else if(secondSquareType === "vertical"){
        console.log("fish + vertical");
        checkVerticalColor({indexArr: [randomIndex], board, setScore, isRandom: true})
      }else if(secondSquareType === "wrapped"){
        console.log("fish + wrapped");
        checkWrappedCandy({indexArr: [randomIndex], board, setScore, isRandom: true})
      }
      board[randomIndex].className = ""
      return true
    }

    else if(secondSquareType === "fish" && specialTypes.includes(firstSquareType)){
      pauseTime()
      board[firstSquareId] = {
        src: blank, color:"blank", type: "blank"
      }
      board[secondSquareId] = {
        src: blank, color:"blank", type: "blank"
      }
      const randomIndex = randomSquare()
      board[randomIndex].className = "special"
      if(firstSquareType === "horizon"){
        console.log("fish + horizon");
        checkHorizonColor({indexArr: [randomIndex], board, setScore, isRandom: true})
      }else if(firstSquareType === "vertical"){
        console.log("fish + vertical");
        checkVerticalColor({indexArr: [randomIndex], board, setScore, isRandom: true})
      }else if(firstSquareType === "wrapped"){
        console.log("fish + wrapped");
        checkWrappedCandy({indexArr: [randomIndex], board, setScore, isRandom: true})
      }
      board[randomIndex].className = ""
      return true
    }
}