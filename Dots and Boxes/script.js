const boxes = Array.from(document.querySelectorAll('.box'))
const lines = Array.from(document.querySelectorAll('.horizontal-line, .vertical-line'))
const elements = Array.from(document.querySelectorAll('.game *'))
const xTurn = document.querySelector('.x-turn')
const oTurn = document.querySelector('.o-turn')
const xSquare = document.querySelector('.x-square')
const oSquare = document.querySelector('.o-square')
const killScreen = document.querySelector('.kill-screen')
const killScreenH1 = document.querySelector('.kill-screen h1')
const resetButton = document.querySelector('.kill-screen button')

let count = 0
let xCounter = 0
let oCounter = 0
let checking = true // when a square is taken, make sure that the current player continues to play
lines.forEach((line) => {
    line.addEventListener('click', () => {
        checking = true
        line.disabled = true
        line.style.backgroundColor = 'grey'
        let index = elements.indexOf(line)
        if (count % 2 === 0) {
            if (line.className === 'horizontal-line') {
                let squares = [elements[index - 21], elements[index + 21]]
                squares.forEach((square) => {
                    if (square === undefined) return
                    if (boxes.includes(square) === false) return
                    let indexNumber = elements.indexOf(square)
                    let surroundingLines = [elements[indexNumber - 21], elements[indexNumber - 1], elements[indexNumber + 1], elements[indexNumber + 21]]
                    if (surroundingLines.every(surroundingline => surroundingline.style.backgroundColor !== '')) {
                        square.innerHTML = 'X'
                        square.style.color = 'red'
                        xCounter++
                        xSquare.innerHTML = xCounter
                        checking = false
                    }
                })

            }
            if (line.className === 'vertical-line') {
                let squares = [elements[index - 1], elements[index + 1]]
                squares.forEach((square) => {
                    if (square === undefined) return
                    if (boxes.includes(square) === false) return
                    let indexNumber = elements.indexOf(square)
                    let surroundingLines = [elements[indexNumber - 21], elements[indexNumber - 1], elements[indexNumber + 1], elements[indexNumber + 21]]
                    if (surroundingLines.every(surroundingLine => surroundingLine.style.backgroundColor !== '')) {
                        square.innerHTML = 'X'
                        square.style.color = 'red'
                        xCounter++
                        checking = false
                        xSquare.innerHTML = xCounter
                    }
                })
            }
            if (checking) {
                xTurn.style.opacity = '0'
                xTurn.style.right = '100%'
                let xTurnChildren = Array.from(xTurn.children)
                xTurnChildren.forEach((element) => {
                    element.style.display = 'none'
                })
                oTurn.style.left = '75%'
                oTurn.style.opacity = '1'
                let oTurnChildren = Array.from(oTurn.children)
                oTurnChildren.forEach((element) => {
                    element.style.display = 'block'
                })
            }
        }
        if (count % 2 === 1) {
            if (line.className === 'horizontal-line') {
                let squares = [elements[index - 21], elements[index + 21]]
                squares.forEach((square) => {
                    if (square === undefined) return
                    if (boxes.includes(square) === false) return
                    let indexNumber = elements.indexOf(square)
                    let surroundingLines = [elements[indexNumber - 21], elements[indexNumber - 1], elements[indexNumber + 1], elements[indexNumber + 21]]
                    if (surroundingLines.every(surroundingLine => surroundingLine.style.backgroundColor !== '')) {
                        square.innerHTML = 'O'
                        square.style.color = 'hsl(210, 100%, 40%)'
                        oCounter++
                        checking = false
                        oSquare.innerHTML = oCounter
                    }
                })

            }
            if (line.className === 'vertical-line') {
                let squares = [elements[index - 1], elements[index + 1]]
                squares.forEach((square) => {
                    if (square === undefined) return
                    if (boxes.includes(square) === false) return
                    let indexNumber = elements.indexOf(square)
                    let surroundingLines = [elements[indexNumber - 21], elements[indexNumber - 1], elements[indexNumber + 1], elements[indexNumber + 21]]
                    if (surroundingLines.every(surroundingLine => surroundingLine.style.backgroundColor !== '')) {
                        square.innerHTML = 'O'
                        square.style.color = 'hsl(210, 100%, 40%)'
                        oCounter++
                        checking = false
                        oSquare.innerHTML = oCounter
                    }
                })

            }
            if (checking) {
                oTurn.style.left = '100%'
                oTurn.style.opacity = '0'
                let oTurnChildren = Array.from(oTurn.children)
                oTurnChildren.forEach((element) => {
                    element.style.display = 'none'
                })
                xTurn.style.right = '75%'
                xTurn.style.opacity = '1'
                let xTurnChildren = Array.from(xTurn.children)
                xTurnChildren.forEach((element) => {
                    element.style.display = 'block'
                })
            }
        }
        if (checking) count++
        if (xCounter + oCounter === 100) {
            xTurn.style.right = '75%'
            xTurn.style.opacity = '1'
            let xTurnChildren = Array.from(xTurn.children)
            xTurnChildren.forEach((element) => {
                element.style.display = 'block'
            })
            oTurn.style.left = '75%'
            oTurn.style.opacity = '1'
            let oTurnChildren = Array.from(oTurn.children)
            oTurnChildren.forEach((element) => {
                element.style.display = 'block'
            })
            killScreen.style.display = 'flex'
            if (xCounter > oCounter) {
                killScreenH1.innerHTML = 'X wins'
                return
            }
            if (oCounter < xCounter) {
                killScreenH1.innerHTML = 'O wins'
                return
            }
            killScreenH1.innerHTML = `It's a draw`
        }
    })
})

resetButton.addEventListener('click', () => {
    boxes.forEach((box) => {
        box.innerHTML = ''
    })
    lines.forEach((line) => {
        line.style.backgroundColor = 'white'
    })
    oTurn.style.left = '100%'
    oTurn.style.opacity = '0'
    let oTurnChildren = Array.from(oTurn.children)
    oTurnChildren.forEach((element) => {
        element.style.display = 'none'
    })
    count = 0
    xCounter = 0
    oCounter = 0
    checking = true
    killScreenH1.innerHTML = ''
    killScreen.style.display = 'none'
})