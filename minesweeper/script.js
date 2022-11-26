const container = document.querySelector('.container')
const killScreen = document.querySelector('.kill-screen-container')
const h1killScreen = document.querySelector('.kill-screen h1')
const resetButton = document.querySelector('.kill-screen button')

let numberOfRows = 23
let numberOfColumns = 48

// set the width and height of the container
let containerWidth = window.innerWidth;
let containerHeight = window.innerHeight;
container.style.width = `${containerWidth}px`
container.style.height = `${containerHeight}px`

//make the grid
container.style.gridTemplateColumns = `repeat(${numberOfColumns}, 1fr)`
container.style.gridTemplateRows = `repeat(${numberOfRows}, 1fr)`


// make grid blocks
for (i = 0; i < numberOfRows * numberOfColumns; i++) {
    let containerBlocki = document.createElement('button')
    containerBlocki.className = 'grid-block'
    container.append(containerBlocki)
}
const containerBlock = document.querySelectorAll('.grid-block')
let containerBlockWidth = Number(getComputedStyle(containerBlock[1]).width.replace('px', ''))


// making and putting mines
let numberOfMines = 50
for (i = 0; i < numberOfMines; i) {
    let positionX = Math.ceil(Math.random() * numberOfColumns); // set the column number it's in
    let positionY = Math.ceil(Math.random() * numberOfRows); // set the row number it's in
    if (containerBlock[(positionY - 1) * numberOfColumns + positionX - 1].className !== 'grid-block mines') {
        i++
        containerBlock[(positionY - 1) * numberOfColumns + positionX - 1].className = 'grid-block mines'
        containerBlock[(positionY - 1) * numberOfColumns + positionX - 1].values = -1
    }
}
const mines = document.querySelectorAll('.mines');

let gridMap = [];
for (i = 0; i < numberOfColumns * numberOfRows; i++) {
    let object = {
        block: containerBlock[i],
        values: 0
    }
    if (containerBlock[i].className === 'grid-block mines') {
        object.values = -1;
    }
    gridMap.push(object);
}

//creating a map of all of the neighbouring blocks
function creatingSurroundingMap(map = [], indexNumber, arrayToModified) {
    arrayToModified = [
        map[indexNumber - numberOfColumns - 1], map[indexNumber - numberOfColumns], map[indexNumber - numberOfColumns + 1],
        map[indexNumber - 1], map[indexNumber], map[indexNumber + 1],
        map[indexNumber + numberOfColumns - 1], map[indexNumber + numberOfColumns], map[indexNumber + numberOfColumns + 1]
    ]
    if (indexNumber % numberOfColumns === 0) {
        arrayToModified.forEach((button) => {
            if (button === map[indexNumber - numberOfColumns - 1] || button === map[indexNumber - 1] || button === map[indexNumber + numberOfColumns - 1]) {
                let posNumber = arrayToModified.indexOf(button);
                arrayToModified.splice(posNumber, 1)
            }
        })
    }
    if (indexNumber % numberOfColumns === numberOfColumns - 1) {
        arrayToModified.forEach((button) => {
            if (button === map[indexNumber - numberOfColumns + 1] || button === map[indexNumber + 1] || button === map[indexNumber + numberOfColumns + 1]) {
                let posNumber = arrayToModified.indexOf(button);
                arrayToModified.splice(posNumber, 1)
            }
        })
    }
    return arrayToModified
}

// calculating the number of bombs in the surrounding 3 x 3 area
gridMap.forEach((object) => {
    if (object.values === -1) return;
    let surroundingBlockArr = []
    surroundingBlockArr = creatingSurroundingMap(gridMap, gridMap.indexOf(object), surroundingBlockArr)
    let surroundingBomb = 0;
    surroundingBlockArr.forEach((object) => {
        if (object === undefined) return;
        if (object.values === -1) {
            surroundingBomb++
        }
    })
    object.values = surroundingBomb
    object.block.innerHTML = object.values
})

let recordPos = [] // for recording the position of the object

// when click on a non-bomb block then reveal all the 
function revealZeroValue(map = [], object = new Object) {
    let i = map.indexOf(object);
    if (recordPos.includes(i)) return // skipping all the recorded blocks 
    recordPos.push(i); // recording the position of the object
    let surroundingBlockArr = []
    surroundingBlockArr = creatingSurroundingMap(gridMap, i, surroundingBlockArr)
    surroundingBlockArr.forEach((button) => {
        if (button === undefined) return
        button.block.style.border = '1px solid rgb(0, 0, 0)'
        button.block.style.fontSize = `${containerBlockWidth * 70 / 100}px`
        button.block.disabled = 'true'
        let dangerColor = ['lightgray', 'hsl(240, 100%, 50%)', 'hsl(120,100%,20.8%)', 'hsl(42.7,100%,23.1%)', 'hsl(19.4,100%,32.2%)', 'hsl(0,100%,36.5%)', 'hsl(0, 100%, 35%)', 'hsl(0, 100%, 10%)', 'black']
        for (i = 0; i < dangerColor.length; i++) {
            if (button.block.innerHTML == i) {
                button.block.style.color = dangerColor[i]
            }
        }
        if (nonMinesBomb.includes(button.block)) return
        nonMinesBomb.push(button.block)
    })
    surroundingBlockArr.forEach((button) => {
        if (button === undefined) return
        if (button.values !== 0) return
        if (button === object) return
        revealZeroValue(gridMap, button)
    })
    // winning condition
    if (nonMinesBomb.length === containerBlock.length - mines.length) {
        killScreen.style.display = 'flex'
        h1killScreen.innerHTML = 'You win 😊'
    }
}

let nonMinesBomb = [] // recording the number of regular block being revealed

let mistakenFlags = []
gridMap.forEach((object) => {
    object.block.addEventListener('click', () => {
        if (object.values === -1) return
        if (object.values === 0) {
            revealZeroValue(gridMap, object);
            return
        }
        nonMinesBomb.push(object.block);
        object.block.style.fontSize = `${containerBlockWidth * 70 / 100}px`
        object.block.style.border = '.5px solid rgb(0, 0, 0)'
        let dangerColor = ['lightgray', 'hsl(240, 100%, 50%)', 'hsl(120,100%,20.8%)', 'hsl(42.7,100%,23.1%)', 'hsl(10,100%,32.2%)', 'hsl(0,100%,36.5%)', 'hsl(0, 100%, 35%)', 'hsl(0, 100%, 10%)', 'black']
        for (i = 0; i < dangerColor.length; i++) {
            if (object.block.innerHTML == i) {
                object.block.style.color = dangerColor[i]
            }
        }
        object.block.disabled = 'true'
        // winning condition
        if (nonMinesBomb.length === containerBlock.length - mines.length) {
            killScreen.style.display = 'flex'
            h1killScreen.innerHTML = 'You win 😊'
        }
    })
    object.block.addEventListener('contextmenu', e => {
        e.preventDefault()
        object.block.innerText = '';
        let flagImg = document.createElement('img')
        flagImg.src = 'flag.png'
        object.block.append(flagImg)
        object.block.disabled = 'true'
        object.block.style.border = '.5px solid rgb(0, 0, 0)'
        if (object.values === -1) return
        mistakenFlags.push(object.block)
    })
})

mines.forEach((block) => {
    block.addEventListener('click', () => {
        mines.forEach((block) => {
            if (block.disabled === true) return;
            block.innerHTML = ''
            block.style.border = '.5px solid rgb(0, 0, 0)'
            block.style.backgroundColor = 'red'
            let mineBombImg = document.createElement('img')
            mineBombImg.src = 'bomb.png'
            block.appendChild(mineBombImg)
            killScreen.style.display = 'flex'
            h1killScreen.innerHTML = 'You lose 😢'
        })
        mistakenFlags.forEach((block) => {
            block.innerHTML = ''
            block.style.backgroundColor = 'red'
            let mineBombImg = document.createElement('img')
            mineBombImg.src = 'bomb.png'
            block.appendChild(mineBombImg)
            block.innerHTML = ''
            block.className = 'grid-block mines mistaken-flags'
        })
    })
})

resetButton.addEventListener('click', () => {
    window.location.reload();
})