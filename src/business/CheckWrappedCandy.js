import { width, wrappedCandyColors } from "./Candy"
import blank from '../images/blank.png'
import { checkHorizonColor, checkVerticalColor } from "./CheckStrippedCandy"
import { checkFishCandy } from "./CheckFishCandy"

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
        let col = 0
        let preserverRow = -1
        let count = 0
        let minCol = 0
        let maxCol = 0
        for(let k = 0; k < arr.length; k++) {
          row = parseInt(arr[k] / width)
          col = arr[k] % width
          if(k === 0){
            minCol = col
          }else{
            minCol = Math.min(minCol, col)
          }
          maxCol = Math.max(maxCol, col)
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
        console.log(arr);
        console.log(minCol);
        console.log(maxCol);
        if((maxCol - minCol) !== 2){
          console.log("maxCol - minCol: " + (maxCol - minCol));
          isContainedWrapped = false
          break
        }
        if(count === 3){
          console.log("maxCol - minCol: " + (maxCol - minCol));
          console.log("count = 3");
          isContainedWrapped = true
          arrForSix = arr
          console.log("arrForSix = " + arrForSix);
          break
        }
      }
    }

    if(isContainedWrapped && !isBlank){
      if(arrForSix.some(square => board[square].type === "horizon")){
        checkHorizonColor({indexArr: arrForSix, board, setScore})
      }else if(arrForSix.some(square => board[square].type === "vertical")){
        checkVerticalColor({indexArr: arrForSix, board, setScore})
      }else if(arrForSix.some(square => board[square].type === "wrapped")){
        checkWrappedCandy({indexArr: arrForSix, board, setScore, strippedIndex: null})
      }else if(arrForSix.some(square => board[square].type === "fish")){
        checkFishCandy({indexArr: arrForSix, board, setScore})
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

export const checkWrappedCandy = ({board, setScore, indexArr, strippedIndex, isRandom, wrappedIndex}) => {
  let wrapIndex
  indexArr.forEach(square => {
    if(board[square].type === "wrapped"){
      console.log("checkwrappedCandy");
      wrapIndex = square
    }
  })

  if(!wrapIndex){
    if(isRandom){
      wrapIndex = indexArr[0]
    }else{
      return
    }
  }
console.log("wrapIndex: " + wrapIndex);
  const row = parseInt(wrapIndex / width)
  const col = wrapIndex % width

  const arrAll = [
    wrapIndex - width - 1, wrapIndex - width, wrapIndex - width + 1,
    wrapIndex - 1, wrapIndex, wrapIndex + 1,
    wrapIndex + width - 1, wrapIndex + width, wrapIndex + width + 1
  ]

  let arr = arrAll

  if(row === 0){
    arr = arr.slice(3)
  }else if(row === width-1){
    arr = arr.slice(0, 6)
  }

  const firstArr = arr.slice(0, 3)
  const secondArr = arr.slice(3, 6)
  const thirdArr = arr.slice(6)

  if(col === 0){
    arr = firstArr.slice(1).concat(secondArr.slice(1).concat(thirdArr.slice(1)))
  }else if(col === width-1){
    arr = firstArr.slice(0,2).concat(secondArr.slice(0,2).concat(thirdArr.slice(0,2)))
  }

  console.log(arr);
  console.log(strippedIndex);
  for(let i = 0; i < arr.length; i++){
    // if(board[arr[i]].type === "bomb") {
    //   console.log("find-bomb in wrap");
    //   checkColorBomb({
    //     firstSquareType: "bomb", secondSquareType: board[i+1].type,
    //     firstSquareColor: "colorBomb", secondSquareColor: board[i+1].color,
    //     firstSquareId: i, secondSquareId: i+1,
    //     board, setScore
    //   })
    //   continue
    // }
    if(board[arr[i]].type === "vertical" && 
      (strippedIndex === null || (strippedIndex !== null && arr[i] !== strippedIndex))
    ) {
      console.log("find-vertical in wrap");
      checkVerticalColor({indexArr: [arr[i]], board, setScore})
      continue
    }else if(board[arr[i]].type === "horizon" && 
      (strippedIndex === null || (strippedIndex !== null && arr[i] !== strippedIndex))
    ) {
      console.log("find-horizon in wrap")
      checkHorizonColor({indexArr: [arr[i]], board, setScore})
      continue
    }else if(board[arr[i]].type === "fish"){
      console.log("find-fish in wrap");
      checkFishCandy({indexArr: [arr[i]], board, setScore})
      continue
    }else if(arr[i] !== wrapIndex && board[arr[i]].type === "wrapped" &&
      (wrappedIndex === null || (wrappedIndex !== null && arr[i] !== wrappedIndex))
    ){
      console.log("find-wrapped in wrap");
      checkWrappedCandy({indexArr: [arr[i]], board, setScore, wrappedIndex: wrapIndex})
      continue
    }else if(board[i].src !== blank){
      setScore(prev => prev + 60)
      board[arr[i]] = {
        src: blank, color: "blank", type: "blank"
      }
    }
  }
  console.log("--clear wrapped candy--");
}