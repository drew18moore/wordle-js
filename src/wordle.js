window.onload = function() {
    createBoard();
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