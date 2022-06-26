import { width, wrappedCandyColors } from "./Candy"
import blank from '../images/blank.png'
import { checkHorizonColor, checkVerticalColor } from "./CheckBoard"

export const checkColorForSix = ({board, setScore, isDragged}) => {
  for(let i = 0; i < (width - 2) * width - 2; i++){
    const colorForSix = [
      [i, i + width, i + width * 2, i + 1 + width * 2, i + 2 + width * 2],
      [i, i + 1, i + 2, i + width, i + width * 2],
      [i, i + 1, i + 2, i + 1 + width, i + 1 + width * 2],
      [i, i + 1, i + 2, i + 2 + width, i + 2 + width * 2],
      [i, i + width, i - 2 + width * 2, i - 1 + width * 2, i + width * 2],
      [i , i + width, i + 1 + width, i + 2 + width, i + width * 2],
      [i, i - 2 + width, i - 1 + width, i + width, i + width * 2],
      [i, i + width, i - 1 + width * 2, i + width * 2, i + 1 + width * 2],
    ]
    const chosenColor = board[i].color
    const isBlank = board[i].src === blank
    let isContainedWrapped
    let arrForSix

    for(let j = 0; j < colorForSix.length; j++) {
      const arr = colorForSix[j]
      if(arr.every(square => board[square].color === chosenColor && !isBlank)){
        console.log("loop in checkWrap");
        let row = 0
        let preserverRow = -1
        let count = 0
        for(let k = 0; k < arr.length; k++) {
          row = parseInt(arr[k] / width)
          if(preserverRow !== row){
            count++
          }
          if(count > 3){
            console.log("count > 3");
            isContainedWrapped = false
            break
          }
          preserverRow = row
        }
        if(count === 3){
          console.log("count = 3");
          isContainedWrapped = true
          arrForSix = arr
          break
        }
      }
    }

    if(isContainedWrapped && !isBlank){
      if(arrForSix.some(square => board[square].type === "horizon")){
        checkHorizonColor({indexArr: arrForSix, board, setScore})
      }else if(arrForSix.some(square => board[square].type === "vertical")){
        checkVerticalColor({indexArr: arrForSix, board, setScore})
      }
      const index = wrappedCandyColors.color.indexOf(chosenColor)
      setScore(prev => prev + 200)
      arrForSix.forEach(square => board[square] = {
        src:blank, color:"blank", type: "blank"
      })
      if(!isDragged){
        board[arrForSix[0]] = {
        src: wrappedCandyColors.src[index], color: chosenColor, type: "wrapped"
        }
      }
      console.log("checkWrap-inside");
      return {isTrue: true, color: chosenColor, indexArr: arrForSix}
    }
  }
}

export const checkWrappedCandy = ({board, setScore, indexArr}) => {
  // const start = indexArr[0]
  // const end = indexArr[indexArr.length-1]
  // const interval = indexArr[1] - indexArr[0]
  let wrapIndex
  indexArr.forEach(square => {
    if(board[square].type === "wrapped"){
      console.log("checkwrappedCandy");
      wrapIndex = square
    }
  })

  let coefficientForRow
  let countForRow
  let coefficientForCol
  let countForColumn

  const arr = [
    wrapIndex - width - 1, wrapIndex - width, wrapIndex - width + 1,
    wrapIndex - 1, wrapIndex, wrapIndex + 1,
    wrapIndex + width - 1, wrapIndex + width, wrapIndex + width + 1
  ]
  console.log(arr);
  for(let i = 0; i < arr.length; i++){
    if(board[arr[i]].type === "vertical") {
      console.log("find-vertical in wrap");
      checkVerticalColor({indexArr: [arr[i]], board, setScore})
    }else if(board[arr[i]].type === "horizon") {
      console.log("find-horizon in wrap")
      checkHorizonColor({indexArr: [arr[i]], board, setScore})
    }
    console.log("clear");
    setScore(prev => prev + 60)
    board[arr[i]] = {
      src: blank, color: "blank", type: "blank"
    }
  }
}