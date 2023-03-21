import { WORDLIST } from "/scripts/fiveLetter.js";


//let words = ["hukuk", "malik"];
let guessCount = 0; //current guess number of user
const TOTAL_GUESS = 5; //total possible guess number is 5
let currentWord; //word that user will try to guess
let currentIndex = 0; //current letter of the current try

//color orange
let orange = "#c9b458";
let green = "#6aaa64";
let gray = "#787c7e";
let white = "#ffffff";

(function chooseRandomWord() {
    let wordIndex = Math.floor(Math.random() * WORDLIST.length)
    currentWord = WORDLIST[wordIndex]
    //!TEMP
    console.log(currentWord)
})();


function insertLetter(keyEvent) {
    if (currentIndex == currentWord.length) {
        return;
    }

    let row = document.getElementsByClassName("boxRow")[guessCount]
    let box = row.getElementsByClassName("box")[currentIndex]
    box.textContent = keyEvent.toUpperCase()
    currentIndex++
}

function deleteLetter() {
    if (currentIndex == 0) {
        return;
    }


    currentIndex--;
    let row = document.getElementsByClassName("boxRow")[guessCount]
    let box = row.getElementsByClassName("box")[currentIndex]
    box.textContent = ""

}

function isFound() {
    let row = document.getElementsByClassName("boxRow")[guessCount];

    for (let i = 0; i < currentWord.length; i++) { //iterate through user guess
        let box = row.getElementsByClassName("box")[i]
        if (box.style.backgroundColor == gray || box.style.backgroundColor == orange)
            return false;
    }

    return true;
}

function checkAnswer() {
    //if tried to check answer before completing the word
    if (currentIndex < currentWord.length) {
        window.alert("CAN U COUNT? YOU NEED " + currentWord.length + " LETTERS FOR GOD'S SAKE!")
        return;
    }

    let row = document.getElementsByClassName("boxRow")[guessCount];

    for (let i = 0; i < currentWord.length; i++) { //iterate through user guess
        let box = row.getElementsByClassName("box")[i]
        let letter = box.textContent
        let doesExist = false;

        if (letter == currentWord.toUpperCase().charAt(i)) { //correct letter, right place
            box.style.backgroundColor = green;
            box.style.color = white;
            doesExist = true;
            continue;
        }


        for (let j = 0; j < currentWord.length; j++) { //iterate through answer

            //if letter exists in somewhere but not in this specific index
            //and also if it's not already found by user, make it orange
            if (letter == currentWord.toUpperCase().charAt(j)
                && row.getElementsByClassName("box")[j].style.backgroundColor != green) {
                box.style.backgroundColor = orange;
                box.style.color = white;
                doesExist = true;
                break;
            }
        }


        if (!doesExist) {
            box.style.backgroundColor = gray;
            box.style.color = white;
        }


    }




    //if this was the last chance and still not found
    if (!isFound() && guessCount == TOTAL_GUESS - 1) {
        window.alert("YOU'RE A FUCKIN' MORON LOL")
        return;
    }

    guessCount++;
    currentIndex = 0;

}

document.addEventListener("keyup", (keyEvent) => {
    let char = keyEvent.key

    if (char == "Backspace") {
        deleteLetter()
    }

    else if (char == "Enter") {
        checkAnswer()
    }


    //!needs a better control for char >= "a" && char <= "z" 
    //!needs a better control for turkish characters
    else if (char >= "a" && char <= "z" || char == "ğ" || char == "ü" ||
        char == "ç" || char == "ö" || char == "ş" || char == "ı" || char == "i" || char == "İ") {
        insertLetter(char)
    }

})





