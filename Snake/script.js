const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const body = document.querySelector('body')
const startingArea = document.querySelector('.starting-point')
const startingBtn = document.querySelector('button#starting-btn')
const killScreen = document.querySelector('.kill-screen')
const h1Score = document.querySelector('.kill-screen h1')
const resetButton = document.querySelector('.reset-button')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let numberOfRows = 25
let numberOfColumns = 50

let squareWidth = canvas.width / numberOfColumns
let squareHeight = canvas.height / numberOfRows

body.style.borderLeft = `${squareWidth}px solid hsl(21, 100%, 20%)`
body.style.borderRight = `${squareWidth}px solid hsl(21, 100%, 20%)`
body.style.borderTop = `${squareHeight}px solid hsl(21, 100%, 20%)`
body.style.borderBottom = `${squareHeight}px solid hsl(21, 100%, 20%)`

let posX = Math.floor(numberOfColumns / 2)
let posY = Math.floor(numberOfRows / 2)

let positions = []
let snakeLength = 2

let leftInterval
let rightInterval
let upInterval
let downInterval


let checkLeftRightInterval = false
let checkUpDownInterval = false

let randomPosX = 0
let randomPosY = 0


function pushingPosition() {
    let position = {
        positionX: posX,
        positionY: posY
    }
    positions.push(position)
}

function drawingTheTail() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'hsl(0, 100%, 40%)'
    positions.forEach((position, index) => {
        if (positions.length - 1 - index >= snakeLength) return
        ctx.fillRect(position.positionX * squareWidth, position.positionY * squareHeight, squareWidth, squareHeight)
    })
    // ctx.fillRect(posX * squareWidth, posY * squareHeight, squareWidth, squareHeight)
}

function checkingForIntersection(interval, aFunction) {
    let inIntersection = positions.some((position, index) => {
        if (positions.length - 1 - index >= snakeLength) return false
        if (posX !== position.positionX) return false
        if (posY !== position.positionY) return false
        return true
    })
    if (inIntersection) {
        clearInterval(interval)
        window.removeEventListener('keydown', aFunction)
        losing()
    }
}

function creatingFood() {
    randomPosX = Math.ceil(Math.random() * (numberOfColumns - 2))
    randomPosY = Math.ceil(Math.random() * (numberOfRows - 2))
    let inSnakeBody = positions.some((position, index) => {
        if (positions.length - 1 - index >= snakeLength) return false
        if (randomPosX !== position.positionX) return false
        if (randomPosY !== position.positionY) return false
        return true
    })
    if (inSnakeBody) {
        randomPosX = Math.ceil(Math.random() * (numberOfColumns - 2))
        randomPosY = Math.ceil(Math.random() * (numberOfRows - 2))
    }
    let apple = document.createElement('img')
    apple.src = './apple.svg'
    apple.width = squareWidth
    apple.height = squareHeight
    apple.style.top = `${randomPosY * squareHeight}px`
    apple.style.left = `${randomPosX * squareWidth}px`
    body.append(apple)
}

let score = 0

function eatingFood() {
    if (posX !== randomPosX) return
    if (posY !== randomPosY) return
    let apple = document.querySelector('img')
    body.removeChild(apple)
    snakeLength++
    creatingFood()
    score++
}

function losing() {
    killScreen.style.display = 'flex'
    h1Score.innerText = `Your score is ${score}`
}

startingBtn.addEventListener('click', () => {
    let buttonWidth = getComputedStyle(startingBtn).width
    startingBtn.style.opacity = 0
    startingBtn.style.left = `calc(100% - ${buttonWidth})`
    startingArea.style.opacity = 0
    let timeOut = setTimeout(() => {
        creatingFood()
        rightInterval = setInterval(() => {
            pushingPosition()
            posX++
            if (posX === numberOfColumns - 1) {
                clearInterval(rightInterval)
                losing()
                return
            }
            drawingTheTail()
            ctx.beginPath()
            ctx.moveTo(posX * squareWidth, posY * squareHeight)
            ctx.lineTo((posX + 1) * squareWidth, (posY + 1 / 2) * squareHeight)
            ctx.lineTo(posX * squareWidth, (posY + 1) * squareHeight)
            ctx.closePath()
            ctx.fill()
            eatingFood()
        }, 60)
    }, 500)
})

window.addEventListener('keydown', function listener(e) {
    switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            if (checkUpDownInterval) break
            checkUpDownInterval = true
            checkLeftRightInterval = false
            clearInterval(rightInterval)
            clearInterval(leftInterval)
            upInterval = setInterval(() => {
                pushingPosition()
                posY--
                checkingForIntersection(upInterval, listener)
                if (posY === 0) {
                    window.removeEventListener('keydown', listener)
                    clearInterval(upInterval)
                    losing()
                    return
                }
                drawingTheTail()
                ctx.beginPath()
                ctx.moveTo(posX * squareWidth, (posY + 1) * squareHeight)
                ctx.lineTo((posX + 1 / 2) * squareWidth, posY * squareHeight)
                ctx.lineTo((posX + 1) * squareWidth, (posY + 1) * squareHeight)
                ctx.fill()
                eatingFood()
            }, 60)
            break
        case 'ArrowLeft':
        case 'A':
        case 'a':
            if (checkLeftRightInterval) break
            checkLeftRightInterval = true
            checkUpDownInterval = false
            clearInterval(upInterval)
            clearInterval(downInterval)
            leftInterval = setInterval(() => {
                pushingPosition()
                posX--
                checkingForIntersection(leftInterval, listener)
                if (posX === 0) {
                    window.removeEventListener('keydown', listener)
                    clearInterval(leftInterval)
                    losing()
                    return
                }
                drawingTheTail()
                ctx.beginPath()
                ctx.moveTo((posX + 1) * squareWidth, posY * squareHeight)
                ctx.lineTo(posX * squareWidth, (posY + 1 / 2) * squareHeight)
                ctx.lineTo((posX + 1) * squareWidth, (posY + 1) * squareHeight)
                ctx.fill()
                eatingFood()
            }, 60)
            break
        case 'ArrowDown':
        case 'S':
        case 's':
            if (checkUpDownInterval) break
            checkUpDownInterval = true
            checkLeftRightInterval = false
            clearInterval(leftInterval)
            clearInterval(rightInterval)
            downInterval = setInterval(() => {
                pushingPosition()
                posY++
                checkingForIntersection(downInterval, listener)
                if (posY === numberOfRows - 1) {
                    window.removeEventListener('keydown', listener)
                    clearInterval(downInterval)
                    losing()
                    return
                }
                drawingTheTail()
                ctx.beginPath()
                ctx.moveTo(posX * squareWidth, posY * squareHeight)
                ctx.lineTo((posX + 1 / 2) * squareWidth, (posY + 1) * squareHeight)
                ctx.lineTo((posX + 1) * squareWidth, posY * squareHeight)
                ctx.fill()
                eatingFood()
            }, 60)
            break
        case 'ArrowRight':
        case 'D':
        case 'd':
            if (checkLeftRightInterval) break
            checkLeftRightInterval = true
            checkUpDownInterval = false
            clearInterval(upInterval)
            clearInterval(downInterval)
            rightInterval = setInterval(() => {
                pushingPosition()
                posX++
                checkingForIntersection(rightInterval, listener)
                if (posX === numberOfColumns - 1) {
                    window.removeEventListener('keydown', listener)
                    clearInterval(rightInterval)
                    losing()
                    return
                }
                drawingTheTail()
                ctx.beginPath()
                ctx.moveTo(posX * squareWidth, posY * squareHeight)
                ctx.lineTo((posX + 1) * squareWidth, (posY + 1 / 2) * squareHeight)
                ctx.lineTo(posX * squareWidth, (posY + 1) * squareHeight)
                ctx.fill()
                eatingFood()
            }, 60)
            break
    }
})

resetButton.addEventListener('click', () => {
    window.location.reload()
})