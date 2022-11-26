const board = document.querySelector('.board')
const controlBoard = document.querySelector('.control-board')
const playButton = document.querySelector('.play')
const nextButton = document.querySelector('.next')
const stopButton = document.querySelector('.stop')
const resetButton = document.querySelector('.reset')
let raf

function settingUp(numberOfRows = new Number, numberOfColumns = new Number, board = new Element, controlBoard = new Element) {
    let gameGrid = []
    for (let i = 0; i < numberOfRows * numberOfColumns; i++) {
        let button = document.createElement('button')
        board.appendChild(button)
    }
    board.style.gridTemplateColumns = `repeat(${numberOfColumns}, 1fr)`
    board.style.gridTemplateRows = `repeat(${numberOfRows}, 1fr)`
    let boardHeight = getComputedStyle(board).height
    controlBoard.style.height = `calc(100vh - ${boardHeight})`
    const buttons = Array.from(document.querySelectorAll('.board button'))
    for (let i = 0; i < numberOfRows; i++) {
        let row = []
        for (let j = 0; j < numberOfColumns; j++) {
            let obj = {
                element: buttons[i * numberOfColumns + j],
                rowIndex: i,
                colIndex: j,
                isAlive: false,
            }
            row.push(obj)
        }
        gameGrid.push(row)
    }
    return gameGrid
}

let numberOfColumns = 175
let numberOfRows = 70
let gameGrid = settingUp(numberOfRows, numberOfColumns, board, controlBoard)

gameGrid.forEach(row => {
    row.forEach(obj => {
        obj.element.addEventListener('click', _e => {
            if (obj.isAlive === true) {
                obj.isAlive = false
                obj.element.style.backgroundColor = ''
                return
            }
            if (obj.isAlive === false) {
                obj.isAlive = true
                obj.element.style.backgroundColor = 'black'
                return
            }
        })
    })
})

function checkingNeighbor(obj = {}, gridMap = []) {
    let pos = {
        col: obj.colIndex,
        row: obj.rowIndex,
    }
    gridMap[-1] = gridMap[numberOfRows - 1]
    gridMap[numberOfRows] = gridMap[0]
    gridMap.forEach(row => {
        row[-1] = row[numberOfColumns - 1]
        row[numberOfColumns] = row[0]
    })
    let neighbors = [
        gridMap[pos.row - 1][pos.col - 1], gridMap[pos.row - 1][pos.col], gridMap[pos.row - 1][pos.col + 1],
        gridMap[pos.row][pos.col - 1], gridMap[pos.row][pos.col + 1],
        gridMap[pos.row + 1][pos.col - 1], gridMap[pos.row + 1][pos.col], gridMap[pos.row + 1][pos.col + 1]
    ]
    neighbors = neighbors.filter(obj1 => obj1 !== undefined)
    let isAliveArr = neighbors.filter(obj1 => obj1.isAlive === true)
    return isAliveArr.length
}

function cancelRaf() {
    window.cancelAnimationFrame(raf)
    gameGrid.forEach(row => {
        row.forEach(obj => {
            obj.element.disabled = false
        })
    })
    resetButton.disabled = false
    nextButton.disabled = false
    playButton.disabled = false
}

playButton.addEventListener('click', () => {
    gameGrid.forEach(row => {
        row.forEach(obj => {
            obj.element.disabled = true
        })
    })
    playButton.disabled = true
    nextButton.disabled = true
    resetButton.disabled = true

    function play() {
        if (gameGrid.every(row => row.every(obj => obj.isAlive === false))) {
            cancelRaf()
            return
        }
        let prevGameGrid = JSON.parse(JSON.stringify(gameGrid));
        gameGrid.forEach(row => {
            row.forEach(obj => {
                let aliveNeighbors = checkingNeighbor(obj, prevGameGrid)
                switch (obj.isAlive) {
                    case true:
                        if (aliveNeighbors >= 2 && aliveNeighbors <= 3) break
                        obj.isAlive = false
                        obj.element.style.backgroundColor = ''
                        break
                    case false:
                        if (aliveNeighbors === 3) {
                            obj.isAlive = true
                            obj.element.style.backgroundColor = 'black'
                            break
                        }
                        break
                }
            })
        })
        let doesNotChange = gameGrid.every(row => row.every(obj => obj.isAlive === prevGameGrid[obj.rowIndex][obj.colIndex].isAlive))
        console.log(doesNotChange)
        if (doesNotChange) {
            cancelRaf()
            return
        }
        raf = window.requestAnimationFrame(play)
    }
    raf = window.requestAnimationFrame(play)
})

nextButton.addEventListener('click', () => {
    function play() {
        let prevGameGrid = JSON.parse(JSON.stringify(gameGrid));
        gameGrid.forEach(row => {
            row.forEach(obj => {
                let aliveNeighbors = checkingNeighbor(obj, prevGameGrid)
                switch (obj.isAlive) {
                    case true:
                        if (aliveNeighbors >= 2 && aliveNeighbors <= 3) break
                        obj.isAlive = false
                        obj.element.style.backgroundColor = ''
                        break
                    case false:
                        if (aliveNeighbors === 3) {
                            obj.isAlive = true
                            obj.element.style.backgroundColor = 'black'
                            break
                        }
                        break
                }
            })
        })
    }
    play()
})

stopButton.addEventListener('click', () => {
    cancelRaf()
})

resetButton.addEventListener('click', () => {
    gameGrid.forEach(row => {
        row.forEach(obj => {
            obj.element.style.backgroundColor = ''
            obj.isAlive = false
        })
    })
})