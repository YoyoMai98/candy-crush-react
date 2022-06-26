import { width, wrappedCandyColors } from "./Candy"
import blank from '../images/blank.png'

export const checkColorForSix = ({board, setScore, isDragged}) => {
  for(let i = 0; i < (width - 2) * width - 2; i++){
    const colorForSix = [
      [i, i + width, i + width * 2, i + 1 + width * 2, i + 2 + width * 2],
      [i, i + 1, i + 2, i + width, i + width * 2],
      [i, i + 1, i + 2, i + 1 + width, i + 1 + width * 2],
      [i, i + 1, i + 2, i + 2 + width, i + 2 + width * 2],
      [i, i + width, i - 2 + width * 2, i - 1 + width * 2, i + width * 2],
      [i, i + width, i - 1 + width * 2, i + width * 2, i + 1 + width * 2]
    ]
    const chosenColor = board[i].color
    const isBlank = board[i].src === blank
    let isContainedWrapped
    let arrForSix
    // colorForSix.some(row => (
    //   row.every(square => board[square].color === chosenColor)
    // ))

    for(let j = 0; j < colorForSix.length; j++) {
      const arr = colorForSix[j]
      if(arr.every(square => board[square].color === chosenColor && !isBlank)){
        console.log("loop in checkWrap");
        console.log(arr);
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