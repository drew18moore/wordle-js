const keys = [
    "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", 
    "A", "S", "D", "F", "G", "H", "J", "K", "L", 
    "ENTER", "Z", "X", "C", "V", "B", "N", "M", "DELETE"
];

window.onload = function() {
    createBoard();
    createKeyboard();
}

function createBoard() {
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            let tile = document.createElement("div");
            tile.classList.add("tile");
            document.getElementById("board").appendChild(tile);
        }
    }
}

function createKeyboard() {
    for (let i = 0; i < keys.length; i++) {
        let key = document.createElement("div");
        key.classList.add("key");
        key.innerHTML = keys[i];
        document.getElementById("keyboard").appendChild(key);
    }
}