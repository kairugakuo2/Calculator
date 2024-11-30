//global variables
let operand1 = null;
let operand2 = null;
let operator = null;
let result = null;
let currentNumber = document.querySelector(".currentScreen");
let previousNumber = document.querySelector(".previousScreen");

const numBtn = document.querySelectorAll(".number");
const opBtn = document.querySelectorAll(".operator");
const eqBtn = document.querySelector(".equals");
const clearBtn = document.querySelector("#clear");
const deleteBtn = document.querySelector("#delete"); //delete button

numBtn.forEach((btn) =>{ //passes value of each value to setOperand
    btn.addEventListener("click", () => {
        if (operator === null){
            setOperand1(btn.textContent);
        } else {
            setOperand2(btn.textContent);
        }
    });
});
opBtn.forEach((btn) =>{ //passes value of each value to setOperand
    btn.addEventListener("click", () => {
        setOperation(btn.textContent);
    });
});
eqBtn.addEventListener("click", evaluate);
clearBtn.addEventListener("click", clearScreen);
// deleteBtn

//setters
function setOperand1(num){
    if(operand1 === 0 ){
        operand1 = num;
        currentNumber.textContent = operand1;
    } else{
        operand1 += num;
        currentNumber.textContent = operand1;
    }
}
function setOperand2(num){
    if(operand2 === null){
        operand2 = num;
        currentNumber.textContent = operand2;
    } else {
        operand2 += num;
        currentNumber.textContent = operand2;
    }
}
function setOperation(operation){
    operator = operation;
    if (result !== null){
        previousNumber.textContent = result + " " + operator;
        operand1 = result;
        operand2 = null;
    } else {
        previousNumber.textContent = operand1 + " " + operator;
    }
}
function evaluate(){
    previousNumber.textContent = operand1 + " " + operator + " " + operand2 + " =";
    result = getResult(operator, operand1, operand2);
    if (result === null) clearScreen()
    else currentNumber.textContent = result;
}

/* clear button and the function to clear screen when presses */
function clearScreen(){
    operand1 = 0; //reset operand 1 and 2 to null
    operand2 = null;
    operator = null;
    result = null;
    currentNumber.textContent = '0';
    previousNumber.textContent = '0';
}

/* delete button and the function to delete last digit from current number */
function deleteDigit(){}

/////// Math Section ////////

function add(a,b){
    return a + b;
}
function subtract(a,b){
    return a - b;
}
function multiply(a,b){
    return a * b;
}
function divide(a,b){
    return a / b;
}

function getResult(operator, a, b){
    a = Number(a);
    b = Number(b)
    switch(operator){
        case '+':
            return add(a,b);
        case '-':
            return subtract(a,b);
        case 'x':
            return multiply(a,b);
        case '÷':
            if (b === 0){
                alert("You can't divide by zero!");
                return null
            }
            else return divide(a,b);
        default:
            return null
    }
}