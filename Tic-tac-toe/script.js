const choosingFirstPlayerButton = document.querySelectorAll('.beginning button');
const choosingFirstPlayerZone = document.querySelector('.beginning')
const gameButtons = Array.from(document.querySelectorAll('.square'));
const killScreen = document.querySelector('.end');
const subKillScreen = document.querySelector('.kill-screen');
const resetButton = document.querySelector('.kill-screen button');
let firstPlayer
let counter = 0;
let recordX = [];
let recordO = [];
let win = new Array;
win = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 5, 9],
    [3, 5, 7],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9]
]


choosingFirstPlayerButton.forEach((button) => {
    button.addEventListener('click', () => {
        choosingFirstPlayerZone.style.display = 'none';
        if (button.innerHTML === 'X') return firstPlayer = button.innerHTML;
        if (button.innerHTML === 'O') return firstPlayer = button.innerHTML;
    })
})

gameButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (firstPlayer === 'X') {
            if (counter % 2 === 0) {
                button.innerHTML = 'X';
            }
            if (counter % 2 === 1) {
                button.innerHTML = 'O';
            }
        }
        if (firstPlayer === 'O') {
            if (counter % 2 === 0) {
                button.innerHTML = 'O';
            }
            if (counter % 2 === 1) {
                button.innerHTML = 'X';
            }
        }
        counter++;
        button.disabled = 'true'
        if (button.innerHTML === 'X') {
            let indexNumber = gameButtons.indexOf(button)
            recordX.push(indexNumber + 1)
            for (i = 0; i < win.length; i++) {
                let result = win[i].every(item => recordX.includes(item));
                if (result === true) {
                    killScreen.style.display = 'flex';
                    let killScreenH1 = document.createElement('h1');
                    killScreenH1.innerText = 'X wins'
                    subKillScreen.append(killScreenH1);
                    return
                }
            }
        }
        if (button.innerHTML === 'O') {
            for (i = 0; i < gameButtons.length; i++) {
                if (gameButtons[i] === button) {
                    recordO.push(i + 1);
                }
            }
            for (i = 0; i < win.length; i++) {
                let result = win[i].every(item => recordO.includes(item));
                if (result === true) {
                    killScreen.style.display = 'flex';
                    let killScreenH1 = document.createElement('h1');
                    killScreenH1.innerText = 'O wins'
                    subKillScreen.append(killScreenH1);
                    return
                }
            }
        }
        if (counter === gameButtons.length) {
            console.log('1111111111111')
            killScreen.style.display = 'flex';
            let killScreenH1 = document.createElement('h1');
            killScreenH1.innerText = `It's a draw`
            subKillScreen.append(killScreenH1);
        }
    })
})

resetButton.addEventListener('click', () => {
    document.location.reload();
})