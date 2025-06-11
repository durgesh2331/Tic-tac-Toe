let boxes = document.querySelectorAll(".box");
let resetBtn = document.getElementById("Btn-reset");
let newGameBtn = document.querySelector("#Btn-new");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#message");

let turnO = true; 
let count = 0; 

const array = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

let resetGame = function() {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

boxes.forEach(function(box) {
  box.addEventListener("click", function(){
    if (turnO) {
      
      box.innerText = "O";
      turnO = false;
    } else {
      
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

let gameDraw = function() {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

let disableBoxes = function() {
  for (let box of boxes) {
    box.disabled = true;
  }
};

let enableBoxes = function() {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

let showWinner = function(winner) {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

let checkWinner = function() {
  for (let pattern of array) {
    let Value1 = boxes[pattern[0]].innerText;
    let Value2 = boxes[pattern[1]].innerText;
    let Value3 = boxes[pattern[2]].innerText;

    if (Value1 != "" && Value2 != "" && Value3 != "") {
      if (Value1 === Value2 && Value2 === Value3) {
        showWinner(Value1);
        return true;
      }
    }
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);