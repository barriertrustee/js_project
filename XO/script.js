const buttons = Array.from(document.querySelectorAll('.square'))
const killScreen = document.querySelector('.end');
const subKillScreen = document.querySelector('.kill-screen');
const resetButton = document.querySelector('.kill-screen button');

let buttonsMap = []
buttons.forEach((button) => {
    let object = {
        element: button,
        value: 0
    }
    buttonsMap.push(object)
})

let counters = 0
buttonsMap.forEach((object) => {
    object.element.addEventListener('click', () => {
        if (counters % 2 === 0) {
            object.element.innerHTML = 'X'
            object.value = 1
        }
        if (counters % 2 === 1) {
            object.element.innerHTML = 'O'
            object.value = -1
        }
        counters++;
        object.element.disabled = true
        if (buttonsMap.every(object => object.element.innerText !== '')) {
            killScreen.style.display = 'flex';
            let killScreenH1 = document.createElement('h1')
            killScreenH1.innerText = `It's a draw`
            subKillScreen.append(killScreenH1)
        }
        let indexNumber = buttonsMap.indexOf(object)
        let winning = [
            [buttonsMap[indexNumber - 56], buttonsMap[indexNumber - 42], buttonsMap[indexNumber - 28], buttonsMap[indexNumber - 14], buttonsMap[indexNumber]],
            [buttonsMap[indexNumber - 42], buttonsMap[indexNumber - 28], buttonsMap[indexNumber - 14], buttonsMap[indexNumber], buttonsMap[indexNumber + 14]],
            [buttonsMap[indexNumber - 28], buttonsMap[indexNumber - 14], buttonsMap[indexNumber], buttonsMap[indexNumber + 14], buttonsMap[indexNumber + 28]],
            [buttonsMap[indexNumber - 14], buttonsMap[indexNumber], buttonsMap[indexNumber + 14], buttonsMap[indexNumber + 28], buttonsMap[indexNumber + 42]],
            [buttonsMap[indexNumber], buttonsMap[indexNumber + 14], buttonsMap[indexNumber + 28], buttonsMap[indexNumber + 42], buttonsMap[indexNumber + 56]],
            [buttonsMap[indexNumber - 4], buttonsMap[indexNumber - 3], buttonsMap[indexNumber - 2], buttonsMap[indexNumber - 1], buttonsMap[indexNumber]],
            [buttonsMap[indexNumber - 3], buttonsMap[indexNumber - 2], buttonsMap[indexNumber - 1], buttonsMap[indexNumber], buttonsMap[indexNumber + 1]],
            [buttonsMap[indexNumber - 2], buttonsMap[indexNumber - 1], buttonsMap[indexNumber], buttonsMap[indexNumber + 1], buttonsMap[indexNumber + 2]],
            [buttonsMap[indexNumber - 1], buttonsMap[indexNumber], buttonsMap[indexNumber + 1], buttonsMap[indexNumber + 2], buttonsMap[indexNumber + 3]],
            [buttonsMap[indexNumber], buttonsMap[indexNumber + 1], buttonsMap[indexNumber + 2], buttonsMap[indexNumber + 3], buttonsMap[indexNumber + 4]],
            [buttonsMap[indexNumber - 48], buttonsMap[indexNumber - 36], buttonsMap[indexNumber - 24], buttonsMap[indexNumber - 12], buttonsMap[indexNumber]],
            [buttonsMap[indexNumber - 36], buttonsMap[indexNumber - 24], buttonsMap[indexNumber - 12], buttonsMap[indexNumber], buttonsMap[indexNumber + 12]],
            [buttonsMap[indexNumber - 24], buttonsMap[indexNumber - 12], buttonsMap[indexNumber], buttonsMap[indexNumber + 12], buttonsMap[indexNumber + 24]],
            [buttonsMap[indexNumber - 12], buttonsMap[indexNumber], buttonsMap[indexNumber + 12], buttonsMap[indexNumber + 24], buttonsMap[indexNumber + 36]],
            [buttonsMap[indexNumber], buttonsMap[indexNumber + 12], buttonsMap[indexNumber + 24], buttonsMap[indexNumber + 36], buttonsMap[indexNumber + 48]],
            [buttonsMap[indexNumber - 52], buttonsMap[indexNumber - 39], buttonsMap[indexNumber - 26], buttonsMap[indexNumber - 13], buttonsMap[indexNumber]],
            [buttonsMap[indexNumber - 39], buttonsMap[indexNumber - 26], buttonsMap[indexNumber - 13], buttonsMap[indexNumber], buttonsMap[indexNumber + 13]],
            [buttonsMap[indexNumber - 26], buttonsMap[indexNumber - 13], buttonsMap[indexNumber], buttonsMap[indexNumber + 13], buttonsMap[indexNumber + 26]],
            [buttonsMap[indexNumber - 13], buttonsMap[indexNumber], buttonsMap[indexNumber + 13], buttonsMap[indexNumber + 26], buttonsMap[indexNumber + 39]],
            [buttonsMap[indexNumber], buttonsMap[indexNumber + 13], buttonsMap[indexNumber + 26], buttonsMap[indexNumber + 39], buttonsMap[indexNumber + 52]],
        ]
        if (indexNumber % 13 === 0) {
            winning.splice(0, 4)
            winning.splice(1, 4)
            winning.splice(3, 4)
        }
        if (indexNumber % 13 === 1) {
            winning.splice(0, 3)
            winning.splice(2, 3)
            winning.splice(6, 3)
        }
        if (indexNumber % 13 === 2) {
            winning.splice(0, 2)
            winning.splice(3, 2)
            winning.splice(9, 2)
        }
        if (indexNumber % 13 === 3) {
            winning.splice(0, 1)
            winning.splice(4, 1)
            winning.splice(12, 1)
        }

        if (indexNumber % 13 === 12) {
            winning.splice(1, 4)
            winning.splice(2, 4)
            winning.splice(2, 4)
        }
        if (indexNumber % 13 === 11) {
            winning.splice(2, 3)
            winning.splice(4, 3)
            winning.splice(4, 3)
        }
        if (indexNumber % 13 === 10) {
            winning.splice(3, 2)
            winning.splice(6, 2)
            winning.splice(6, 2)
        }
        if (indexNumber % 13 === 9) {
            winning.splice(4, 1)
            winning.splice(8, 1)
            winning.splice(8, 1)
        }
        winning.forEach((scenario) => {
            if (scenario.includes(undefined)) return
            if (scenario.every(object => object.value === 1)) {
                killScreen.style.display = 'flex';
                let killScreenH1 = document.createElement('h1')
                killScreenH1.innerText = `X wins`
                subKillScreen.append(killScreenH1);
                return
            }
            if (scenario.every(object => object.value === -1)) {
                killScreen.style.display = 'flex';
                let killScreenH1 = document.createElement('h1')
                killScreenH1.innerText = `O wins`
                subKillScreen.append(killScreenH1)
                return
            }
        })
    })
})

resetButton.addEventListener('click', () => {
    counters = 0
    buttonsMap.forEach((object) => {
        object.element.innerText = ''
        object.value = 0
        object.element.disabled = false
    })
    killScreen.style.display = 'none'
    let killScreenH1 = subKillScreen.children[1]
    subKillScreen.removeChild(killScreenH1)
})