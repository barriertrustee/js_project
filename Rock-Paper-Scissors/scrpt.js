const buttons = Array.from(document.querySelectorAll('.card'));
const firstH1 = document.querySelector('h1')
const choosingDiv = document.querySelector('.you');
const computerDiv = document.querySelector('.computer');
const killScreen = document.querySelector('.kill-screen');
const resetButton = document.querySelector('.kill-screen button')
const selector = Math.floor(Math.random() * 3);
const chosenButton = buttons[selector];
const computerButton = chosenButton.cloneNode(true);

function displayComputerChoice() {
    choosingDiv.style.width = '49%';
    choosingDiv.style.display = 'inline-flex';
    computerDiv.style.display = 'inline-flex';
    computerDiv.append(computerButton);
    computerButton.disabled = 'true';
}

function winCondition() {
    let winH1 = document.createElement('h1');
    winH1.innerText = 'You win 😃'
    killScreen.append(winH1)
    killScreen.style.display = 'flex'
}

function drawCondition() {
    let drawH1 = document.createElement('h1');
    drawH1.innerText = `It's a draw`
    killScreen.append(drawH1)
    killScreen.style.display = 'flex'
}

function loseCondition() {
    let loseH1 = document.createElement('h1');
    loseH1.innerText = 'You lose 😢'
    killScreen.append(loseH1)
    killScreen.style.display = 'flex'
}



buttons.forEach((button) => {
    button.addEventListener('click', () => {
        displayComputerChoice();
        let h1YourChoice = button.children[1];
        let h1ComputerChoice = computerButton.children[1];
        if (button === chosenButton) {
            drawCondition();
        } else if ((h1YourChoice.innerText === 'Rock' && h1ComputerChoice.innerText === 'Scissors') || (h1YourChoice.innerText === 'Scissors' && h1ComputerChoice.innerText === 'Paper') || (h1YourChoice.innerText === 'Paper' && h1ComputerChoice.innerText === 'Rock')) {
            winCondition();
        } else {
            loseCondition();
        }
        for (i = 0; i <= buttons.length; i++) {
            if (buttons[i] !== button) {
                buttons[i].style.display = 'none'
            }
            button.style.margin = 'auto'
            button.disabled = 'true';
        }
    })
})

resetButton.addEventListener('click', () => {
    document.location.reload();
})