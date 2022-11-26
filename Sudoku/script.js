const squares = Array.from(document.querySelectorAll('.square'))
const numberButtons = Array.from(document.querySelectorAll('.number'))
const checkingButton = document.querySelector('.checking')
const resetButton = document.querySelector('.reset')
const rightAnswers = document.querySelector('.right-answer')
const rightAudio = document.querySelector('audio.right-answer')
const wrongAnswer = document.querySelector('.wrong-answer')
const wrongAudio = document.querySelector('audio.wrong-answer')
const retryButton = document.createElement('button')

let numberOfRows = 9
let numberOfColumns = 9

let rowGrid = []
let columnGrid = []
let squareGrid = []
for (let i = 0; i < numberOfRows; i++) {
    rowGrid.push([])
    columnGrid.push([])
}
for (let i = 0; i < numberOfColumns / 3; i++) {
    squareGrid.push([
        [],
        [],
        []
    ])
}

squares.forEach((square, index) => {
    let indexOfRow = Math.floor(index / numberOfRows)
    let indexOfColumn = index % numberOfColumns
    let indexOfSquareRow = Math.floor(indexOfRow / 3)
    let indexOfSquareColumn = Math.floor(indexOfColumn / 3)
    let object = {
        element: square,
        value: 0,
    }
    columnGrid[indexOfColumn].push(object)
    rowGrid[indexOfRow].push(object)
    squareGrid[indexOfSquareRow][indexOfSquareColumn].push(object)
})
rowGrid.forEach((row, rowIndex) => {
    let possibleValue = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    row.forEach((object, objectIndex) => {
        let possibleObjectValue = Array.from(possibleValue)
        columnGrid[objectIndex].forEach((square) => {
            if (square.value === 0) return
            if (possibleObjectValue.includes(square.value) === false) return
            let index = possibleObjectValue.indexOf(square.value)
            possibleObjectValue.splice(index, 1)
        })
        let squareRow = Math.floor(objectIndex / 3)
        let squareColumn = Math.floor(rowIndex / 3)
        squareGrid[squareColumn][squareRow].forEach((square) => {
            if (square.value === 0) return
            if (possibleObjectValue.includes(square.value) === false) return
            let index = possibleObjectValue.indexOf(square.value)
            possibleObjectValue.splice(index, 1)
        })
        let randomValue = Math.floor(Math.random() * possibleObjectValue.length)
        object.value = possibleObjectValue[randomValue]
        let index = possibleValue.indexOf(object.value)
        possibleValue.splice(index, 1)
        if (object.value === undefined) object.value = 0
        object.element.innerText = object.value
        object.element.disabled = true
    })
})

function ifTheSudokuWasNotComplete() {
    if (rowGrid.every((row) => row.every((object) => object.value !== 0))) return
    rowGrid.forEach((row, index) => {
        if (index === 0) return
        row.forEach(object => object.value = 0)
    })
    rowGrid.forEach((row, rowIndex) => {
        if (rowIndex === 0) return
        let possibleValue = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        row.forEach((object, objectIndex) => {
            let possibleObjectValue = Array.from(possibleValue)
            columnGrid[objectIndex].forEach((square) => {
                if (square.value === 0) return
                if (possibleObjectValue.includes(square.value) === false) return
                let index = possibleObjectValue.indexOf(square.value)
                possibleObjectValue.splice(index, 1)
            })
            let squareRow = Math.floor(objectIndex / 3)
            let squareColumn = Math.floor(rowIndex / 3)
            squareGrid[squareColumn][squareRow].forEach((square) => {
                if (square.value === 0) return
                if (possibleObjectValue.includes(square.value) === false) return
                let index = possibleObjectValue.indexOf(square.value)
                possibleObjectValue.splice(index, 1)
            })
            let randomValue = Math.floor(Math.random() * possibleObjectValue.length)
            object.value = possibleObjectValue[randomValue]
            let index = possibleValue.indexOf(object.value)
            possibleValue.splice(index, 1)
            if (object.value === undefined) object.value = 0
            object.element.innerText = object.value
        })
    })
    ifTheSudokuWasNotComplete()
}

if (rowGrid.some((row) => row.some((object) => object.value === 0))) {
    ifTheSudokuWasNotComplete()
}

for (let i = 0; i < 41; i) {
    let randomRow = Math.floor(Math.random() * numberOfRows)
    let randomColumn = Math.floor(Math.random() * numberOfColumns)
    if (rowGrid[randomRow][randomColumn].value !== 0) {
        rowGrid[randomRow][randomColumn].value = 0
        rowGrid[randomRow][randomColumn].element.innerText = ''
        rowGrid[randomRow][randomColumn].element.disabled = false
        i++
    }
}

let selectedObject = {}

rowGrid.forEach((row, indexRow) => {
    row.forEach((object, indexColumn) => {
        object.element.addEventListener('click', () => {
            squares.forEach(square => square.style.backgroundColor = '')
            row.forEach((square) => square.element.style.backgroundColor = 'rgba(0, 0, 255, 0.15)')
            columnGrid[indexColumn].forEach((square) => square.element.style.backgroundColor = 'rgba(0, 0, 255, 0.15)')
            let squareRow = Math.floor(indexRow / 3)
            let squareColumn = Math.floor(indexColumn / 3)
            squareGrid[squareRow][squareColumn].forEach((square) => square.element.style.backgroundColor = 'rgba(0, 0, 255, 0.1)')
            object.element.style.backgroundColor = 'rgba(0, 0, 255, 0.3)'
            selectedObject.row = indexRow
            selectedObject.column = indexColumn
        })
    })
})

numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (selectedObject.row === undefined) return
        let rowIndex = selectedObject.row
        let columnIndex = selectedObject.column
        rowGrid[rowIndex][columnIndex].value = Number(button.innerText)
        rowGrid[rowIndex][columnIndex].element.innerText = button.innerText
    })
})

checkingButton.addEventListener('click', () => {
    function equalArray(arr1 = [], arr2 = []) {
        if (arr1.length !== arr2.length) return false
        if (arr1.every((element, index) => element === arr2[index])) return true
        return false
    }
    let allArray = [rowGrid, columnGrid, squareGrid[0], squareGrid[1], squareGrid[2]]
    let isItSolved = allArray.every(arr => arr.every(element => equalArray(element.map(object => object.value).sort(), [1, 2, 3, 4, 5, 6, 7, 8, 9])))
    if (isItSolved) {
        squares.forEach(element => {
            element.disabled = true
            element.style.backgroundColor = ''
        })
        rightAudio.play()
        rightAnswers.style.display = 'flex'
        setTimeout(() => {
            retryButton.classList.add('retry-button')
            retryButton.innerText = 'Another puzzle!'
            rightAnswers.append(retryButton)
        }, 2000)
        return
    }
    wrongAudio.play()
    wrongAnswer.style.display = 'flex'
    setTimeout(() => {
        wrongAnswer.style.display = 'none'
    }, 2000)
})

resetButton.addEventListener('click', () => {
    rowGrid.forEach(row => {
        row.forEach(object => {
            object.element.style.backgroundColor = ''
            if (object.element.disabled === true) return
            object.element.innerText = ''
            object.value = 0
            selectedObject = {}
        })
    })
})

retryButton.addEventListener('click', () => {
    rightAnswers.style.display = 'none'
    rowGrid.forEach((row, index) => {
        if (index === 0) return
        row.forEach(object => object.value = 0)
    })
    rowGrid.forEach((row, rowIndex) => {
        let possibleValue = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        row.forEach((object, objectIndex) => {
            let possibleObjectValue = Array.from(possibleValue)
            columnGrid[objectIndex].forEach((square) => {
                if (square.value === 0) return
                if (possibleObjectValue.includes(square.value) === false) return
                let index = possibleObjectValue.indexOf(square.value)
                possibleObjectValue.splice(index, 1)
            })
            let squareRow = Math.floor(objectIndex / 3)
            let squareColumn = Math.floor(rowIndex / 3)
            squareGrid[squareColumn][squareRow].forEach((square) => {
                if (square.value === 0) return
                if (possibleObjectValue.includes(square.value) === false) return
                let index = possibleObjectValue.indexOf(square.value)
                possibleObjectValue.splice(index, 1)
            })
            let randomValue = Math.floor(Math.random() * possibleObjectValue.length)
            object.value = possibleObjectValue[randomValue]
            let index = possibleValue.indexOf(object.value)
            possibleValue.splice(index, 1)
            if (object.value === undefined) object.value = 0
            object.element.innerText = object.value
            object.element.disabled = true
        })
    })
    if (rowGrid.some((row) => row.some((object) => object.value === 0))) {
        ifTheSudokuWasNotComplete()
    }
    for (let i = 0; i < 41; i) {
        let randomRow = Math.floor(Math.random() * numberOfRows)
        let randomColumn = Math.floor(Math.random() * numberOfColumns)
        if (rowGrid[randomRow][randomColumn].value !== 0) {
            rowGrid[randomRow][randomColumn].value = 0
            rowGrid[randomRow][randomColumn].element.innerText = ''
            rowGrid[randomRow][randomColumn].element.disabled = false
            i++
        }
    }
})