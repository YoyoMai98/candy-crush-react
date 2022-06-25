import blueCandy from '../images/blue-candy.png'
import greenCandy from '../images/green-candy.png'
import orangeCandy from '../images/orange-candy.png'
import purpleCandy from '../images/purple-candy.png'
import redCandy from '../images/red-candy.png'
import yellowCandy from '../images/yellow-candy.png'
import verblueCandy from '../images/speical candy/vertical-blue-candy.png'
import verorangeCandy from '../images/speical candy/vertical-orange-candy.png'
import verpurpleCandy from '../images/speical candy/vertical-purple-candy.png'
import verredCandy from '../images/speical candy/vertical-red-candy.png'
import vergreenCandy from '../images/speical candy/vertical-green-candy.png'
import veryellowCandy from '../images/speical candy/vertical-yellow-candy.png'
import horblueCandy from '../images/speical candy/horizon-blue-candy.png'
import hororangeCandy from '../images/speical candy/horizon-orange-candy.png'
import horpurpleCandy from '../images/speical candy/horizon-purple-candy.png'
import horredCandy from '../images/speical candy/horizon-red-candy.png'
import horgreenCandy from '../images/speical candy/horizon-green-candy.png'
import horyellowCandy from '../images/speical candy/horizon-yellow-candy.png'

export const width = 8

export const candyColors = {
    src: [
    blueCandy,
    orangeCandy,
    purpleCandy,
    yellowCandy,
    redCandy,
    greenCandy
    ],
    color: ["blue", "orange", "purple", "yellow", "red", "green"],
    type: "normal"
}

export const verticalCandyColors = {
    src: [
    verblueCandy,
    verorangeCandy,
    verpurpleCandy,
    veryellowCandy,
    verredCandy,
    vergreenCandy
    ],
    color: ["blue", "orange", "purple", "yellow", "red", "green"],
    type: "vertical"
}

export const horizonCandyColors = {
    src:[
    horblueCandy,
    hororangeCandy,
    horpurpleCandy,
    horyellowCandy,
    horredCandy,
    horgreenCandy
    ],
    color: ["blue", "orange", "purple", "yellow", "red", "green"],
    type: "horizon"
}

export const specialTypes = ["horizon", "vertical"]

export const randomColors = () => {
    const randomIndex = Math.floor(Math.random() * candyColors.src.length)
    const src = candyColors.src[randomIndex]
    const color = candyColors.color[randomIndex]
    const type = "normal"
    return {src, color, type}
}