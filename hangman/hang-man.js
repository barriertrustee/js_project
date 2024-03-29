const originalword = 'crooked suit blow pretend equable dusty black abundant joyous faucet forgive nice support dusty spotty grow cent dime chair frame truculent cute tricky funny smooth hunt cobweb reminiscent conspire stranger children ocean nose rain magnify plucky chase apply anxious birds meal recollect magnify fight crown advice able apathetic clever eager accurate border branch wicked state dazzling wool pointless hard ring men impartial yarn hat detach milk lose irate porter hug stop snails boats haircut sheep sight overjoyed abusive noise calculator collect night scandalous perfect read order point abiding collect reply tremendous productive church awesome disuse fly political aboriginal crush skirt vague permit inlay succinct nifty guiltless chemical progress set simple cars damp bells humor act work apples magical panoramic bashful disease stranger successful committee fresh balance match vast comment implant difficult price lick weigh head trouble pumped circle car bad shiver frantic delirious limp wall bells drawer classify aromatic educat jealous coal integrate rambunctious pastoral threatening guide efficient squeamish spotted plot somber flame preside moaning common babies curtain cause mountain quilt able unwritten imply come wet frightened incredible exotic convince polish connect shivering berry wholesale motion overconfident bent sick classy boys long blood bubble yarn leave snail plain money clock hapless planes simple examine early gray scary appliance clumsy eight tiger axiomatic swift late selection same pine rod wacky watch tall development swanky faulty loutish rock paint awesome communicate cough stretch frogs slim energetic adjustment private better fortunate miniature limit "mess up" instrument truthful lethal mate noxious probable dependent nifty mice incandescent school check note little domineering eye square knee cumbersome flash party toad scarf rabid rake waste activity driving damaging fly hideous fancy stamp visitor name long-term lighten purple morning dramatic tub recognise synonymous thread steady moor available rude milk meat beds boiling grateful suggest living aloof jazzy comparison punishment busy sable itch visit wrathful next four acoustics past fool bomb admire wriggle rambunctious mist superficial expect whispering lush industrious oval battle educated badge regret dynamic temporary release violet nostalgic rush grin organic scorch yarn awful utopian perform cultured obese racial likeable obsequious eight lumpy injure edge sore bloody untidy bathe excuse book delightful shrill oven apparatus windy powerful redundant summer cheerful playground agreement succinct design profuse puncture acoustic development scream cloudy mug fantastic north report whimsical income tin sweater pumped bedroom sour rude describe eager terrific flat imported modern mundane film cakes nut box chin steam whine magnificent mammoth fasten wrench invention arrogant radiate rotten live girl wander wobble spectacular unable cub smash tricky string oranges beef profuse overwrought reject distinct desert pleasure knee cultured whole dreary sordid huge close squeal income reproduce organic cruel cheat outrageous untidy hollow useless known subtract interfere name reason reply childlike beginner greet command spotted film mice flood longing quartz dramatic abhorrent engine deer daughter cut laborer harsh dashing painful scrub anxious exercise kaput preserve basketball irritating quiet moaning accidental true vase porter retire seat thunder unadvised distribution damage whistle dinosaurs pale cold grate jellyfish safe cup hurt strip uninterested sheet';
const word = originalword.split(' ');
const guessingWordArea = document.querySelector('.guessing-word');
const letterButtons = document.querySelectorAll('[data-letter]');
const resetArea = document.querySelector('.container')
const resetZone = document.querySelector('.kill-screen');
const resetButton = document.querySelector('[data-reset]')
const bodyPart = document.querySelectorAll('[data-part]');
const partArray = Array.from(bodyPart);

const guessNumber = Math.floor(Math.random() * word.length);
const guessingWord = word[guessNumber]
const letters = guessingWord.split('')
letters.forEach((letter) => {
    let h1 = document.createElement('h1')
    h1.innerHTML = letter;
    guessingWordArea.append(h1);
})


const h1Letter = document.querySelectorAll('h1')
const h1Array = Array.from(h1Letter);
let letterArray = new Array;
h1Array.forEach((h1) => {
    letterArray.push(h1.innerText)
})

function loseCondition() {
    if (losingCounter >= partArray.length) {
        let loseH1 = document.createElement('h1');
        loseH1.innerText = 'You lose 🙁'
        let answer = document.createElement('h2');
        answer.innerText = `"${guessingWord}" is the answer`
        resetZone.appendChild(answer)
        resetZone.appendChild(loseH1)
        resetZone.style.display = 'flex';
        resetArea.style.display = 'flex';
    }
}

function winCondition() {
    if (winningCounter >= letterArray.length) {
        let winH1 = document.createElement('h1')
        winH1.innerText = 'You win 😀'
        resetZone.appendChild(winH1);
        resetZone.style.display = 'flex';
        resetArea.style.display = 'flex';
    }
}

let losingCounter = 0
let winningCounter = 0
letterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        button.disabled = 'true'
        if (letterArray.includes(button.innerText)) {
            for (i = 0; i <= letterArray.length; i++) {
                if (letterArray[i] === button.innerText) {
                    h1Array[i].style.color = 'black'
                    winningCounter++;
                    winCondition();
                }
            }
        }
        if (letterArray.includes(button.innerText) === false) {
            partArray[losingCounter].style.display = 'block'
            losingCounter++
            loseCondition()
        }
    })
})

resetButton.addEventListener('click', () => {
    document.location.reload()
})