const keys = [
    "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", 
    "A", "S", "D", "F", "G", "H", "J", "K", "L", 
    "ENTER", "Z", "X", "C", "V", "B", "N", "M", "DELETE"
];

let word = "crane";
let user_input = [];
let numGreenTiles = 0;
let turn = 0;

window.onload = function() {
    createBoard();
    createKeyboard();
}

function createBoard() {
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 5; j++) {
            let tile = document.createElement("div");
            tile.classList.add("tile");
            tile.innerHTML = user_input
            document.getElementById("board").appendChild(tile);
        }
    }
}

function createKeyboard() {
    for (let i = 0; i < keys.length; i++) {
        let key = document.createElement("div");
        key.classList.add("key");
        key.innerHTML = keys[i];
        key.addEventListener("click", selectKey);
        document.getElementById("keyboard").appendChild(key);
    }
}

function selectKey() {
    console.log("USER PRESSED", this.innerHTML);
    if (this.innerHTML != "ENTER" && this.innerHTML != "DELETE" && user_input.length < 5) {
        user_input.push(this.innerHTML);
        console.log(user_input);
        updateBoard();
    } else if (this.innerHTML == "DELETE") {
        let val = user_input.pop();
        console.log(user_input);
        updateBoard();
    } else if (this.innerHTML == "ENTER" && user_input.length == 5) {
        checkWord();
        user_input = [];
        turn++;
        if (turn > 5) {
            console.log("YOU LOSE");
            freezeKeyboard();
        }
    }
}

function updateBoard() {
    let allTiles = document.querySelectorAll(".tile");
    allTiles = [...allTiles];
    for(let i = 0; i < 5; i++) {
        allTiles[i + turn*5].innerHTML = ((user_input.length -1 < i) ? "" : user_input[i]);
    }
}

function checkWord() {
    let allTiles = document.querySelectorAll(".tile");
    allTiles = [...allTiles];
    for (let i = 0; i < user_input.length; i++) {
        if (word.toUpperCase()[i] == user_input[i]) {
            allTiles[i + turn*5].classList.add("green");
            numGreenTiles++;
            console.log("NUM GREEN TILES", numGreenTiles);
        } else if (word.toUpperCase().includes(user_input[i]) && word.toUpperCase()[i] != user_input[i]) {
            allTiles[i + turn*5].classList.add("yellow");
        }
    }

    if (numGreenTiles == 5) {
        console.log("YOU WIN");
        freezeKeyboard();

    } else {
        numGreenTiles = 0;
    }
}

function freezeKeyboard() {
    let allKeys = document.querySelectorAll(".key");
    allKeys = [...allKeys];
    for (let i = 0; i < keys.length; i++) {
        allKeys[i].removeEventListener("click", selectKey);
    }
}