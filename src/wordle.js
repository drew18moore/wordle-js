const keys = [
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "ENTER",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
  "DELETE",
];

let word = "crane";
let user_input = [];
let numGreenTiles = 0;
let turn = 0;

window.onload = function () {
  createBoard();
  createKeyboard();
  fetchWord();
};

async function fetchWord() {
  const data = await fetch("https://wordleapi.azurewebsites.net/api/random?size=5")
  word = await data.text()
}

function createBoard() {
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 5; j++) {
      let tile = document.createElement("div");
      tile.classList.add("tile");
      tile.innerHTML = user_input;
      document.getElementById("board").appendChild(tile);
    }
  }
}

function createKeyboard() {
  // Row1
  let row1 = document.createElement("div");
  row1.setAttribute("id", "row1");
  row1.classList.add("row");
  for (let i = 0; i < 10; i++) {
    let key = document.createElement("div");
    key.classList.add("key");
    key.setAttribute("id", "key" + i);
    key.innerHTML = keys[i];
    key.addEventListener("click", selectKey);
    document.getElementById("keyboard").appendChild(row1);
    document.getElementById("row1").appendChild(key);
  }

  // Row2
  let row2 = document.createElement("div");
  row2.setAttribute("id", "row2");
  row2.classList.add("row");
  for (i = 10; i < 19; i++) {
    key = document.createElement("div");
    key.classList.add("key");
    key.setAttribute("id", "key" + i);
    key.innerHTML = keys[i];
    key.addEventListener("click", selectKey);
    document.getElementById("keyboard").appendChild(row2);
    document.getElementById("row2").appendChild(key);
  }

  // Row3
  let row3 = document.createElement("div");
  row3.setAttribute("id", "row3");
  row3.classList.add("row");
  for (i = 19; i < keys.length; i++) {
    key = document.createElement("div");
    key.classList.add("key");
    key.setAttribute("id", "key" + i);
    key.innerHTML = keys[i];
    key.addEventListener("click", selectKey);
    document.getElementById("keyboard").appendChild(row3);
    document.getElementById("row3").appendChild(key);
  }
}

function selectKey() {
  console.log("USER PRESSED", this.innerHTML);
  if (
    this.innerHTML != "ENTER" &&
    this.innerHTML != "DELETE" &&
    user_input.length < 5
  ) {
    user_input.push(this.innerHTML);
    updateBoard();
  } else if (this.innerHTML == "DELETE") {
    let val = user_input.pop();
    updateBoard();
  } else if (this.innerHTML == "ENTER" && user_input.length == 5) {
    checkWord();
  }
}

function updateBoard() {
  let allTiles = document.querySelectorAll(".tile");
  allTiles = [...allTiles];
  for (let i = 0; i < 5; i++) {
    allTiles[i + turn * 5].innerHTML =
      user_input.length - 1 < i ? "" : user_input[i];
  }
}

function checkWord() {
  fetch(
    `https://wordleapi.azurewebsites.net/api/check?input=${user_input
      .join("")
      .toLowerCase()}`
  )
    .then((response) => response.text())
    .then((data) => {
      if (data === "not_found") {
        alert("NOT A WORD");
        user_input = [];
        updateBoard();
        return;
      } else if (data === "OK") {
        let allTiles = document.querySelectorAll(".tile");
        allTiles = [...allTiles];
        let key;
        for (let i = 0; i < user_input.length; i++) {
          key = document.querySelector(`#key${keys.indexOf(user_input[i])}`);
          if (word.toUpperCase()[i] == user_input[i]) {
            allTiles[i + turn * 5].classList.add("green");
            key.classList.remove("yellow");
            key.classList.add("green");
            numGreenTiles++;
          } else if (
            word.toUpperCase().includes(user_input[i]) &&
            word.toUpperCase()[i] != user_input[i]
          ) {
            allTiles[i + turn * 5].classList.add("yellow");
            if (!key.classList.contains("green")) key.classList.add("yellow");
          } else {
            allTiles[i + turn * 5].classList.add("gray");
            key.classList.add("gray");
          }
        }

        if (numGreenTiles == 5) {
          alert("YOU WIN");
          freezeKeyboard();
        } else {
          numGreenTiles = 0;
          turn++;
          user_input = [];
        }
      } else {
        console.log("ERROR")
      }
    })
    .then(() => {
      if (turn > 5) {
        alert("YOU LOSE");
        freezeKeyboard();
      }
    });
}

function freezeKeyboard() {
  let allKeys = document.querySelectorAll(".key");
  allKeys = [...allKeys];
  for (let i = 0; i < keys.length; i++) {
    allKeys[i].removeEventListener("click", selectKey);
  }
}
