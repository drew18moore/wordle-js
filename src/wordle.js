const keys = [
    "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", 
    "A", "S", "D", "F", "G", "H", "J", "K", "L", 
    "ENTER", "Z", "X", "C", "V", "B", "N", "M", "DELETE"
];

let user_input = [];
let turn = 0;

window.onload = function() {
    createBoard();
    createKeyboard();
}

function createBoard() {
    for (let i = 0; i < 5; i++) {
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
    }
}

function updateBoard() {
    for(let i = 0; i < 5; i++) {
        let a = document.querySelectorAll(".tile");
        let b = [...a];
        b[i + turn*5].innerHTML = ((user_input.length -1 < i) ? "" : user_input[i]);
    }
}