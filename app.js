let operand1;
let operand2;
let operator = '';
const currentNumber = document.querySelector(".currentScreen");
const previousNumber = document.querySelector(".previousScreen");

/* function to set operands */
let numBtn = document.querySelectorAll(".number");
function setOperand(num){
    if(operand1 === undefined || operand1 === null){
        operand1 = num;
        alert(operand1);
        operand1 = null;
    }
}
numBtn.forEach((btn) =>{ //passes value of each value to setOperand
    btn.addEventListener("click", () => {
        setOperand(parseInt(btn.textContent));
    });
});


/* clear button and the function to clear screen when presses */
const clearBtn = document.querySelector("#clear");
function clearScreen(){
    currentNumber.textContent = "0";
    previousNumber.textContent = "0";
}
clearBtn.addEventListener("click", clearScreen);

/* delete button and the function to delete last digit from current number */
const deleteBtn = document.querySelector("#delete"); //delete button
function deleteDigit(){

}