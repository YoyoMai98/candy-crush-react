import blueCandy from '../images/blue-candy.png'
import greenCandy from '../images/green-candy.png'
import orangeCandy from '../images/orange-candy.png'
import purpleCandy from '../images/purple-candy.png'
import redCandy from '../images/red-candy.png'
import yellowCandy from '../images/yellow-candy.png'

export const width = 8

export const candyColors = [
    blueCandy,
    orangeCandy,
    purpleCandy,
    yellowCandy,
    redCandy,
    greenCandy
]

export const randomColors = () => {
    const randomIndex = Math.floor(Math.random() * candyColors.length)
    return candyColors[randomIndex]
}