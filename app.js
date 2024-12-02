//global variables
let operand1 = 0;
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
const decimalBtn = document.querySelector(".decimal");

numBtn.forEach((btn) =>{ //passes value of each value to setOperand
    btn.addEventListener("click", () => {
        if(!btn.textContent.trim()) return;
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
deleteBtn.addEventListener("click", deleteDigit)
decimalBtn.addEventListener("click", addDecimal);

//setters
function setOperand1(num) {
    if(result !== null){
        operand1 = num;
        result = null;
    } else if(operand1 === 0 ){
        operand1 = num;
    } else{
        operand1 = parseFloat(operand1.toString() + num);
    }
    currentNumber.textContent = operand1;
}

function setOperand2(num){
    if(operand2 === null){
        operand2 = num;
    } else {
        operand2 = parseFloat(operand2.toString() + num);
    }
    currentNumber.textContent = operand2;
}

function setOperation(operation){
    if (operator !== null && operand2 !== null) {
        evaluate();
    }
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
    if (operator === null || operand2 === null) return
    previousNumber.textContent = operand1 + " " + operator + " " + operand2 + " =";
    result = getResult(operator, operand1, operand2);
    if (result === null) clearScreen();
    else currentNumber.textContent = result;

    operand1 = result;
    operand2 = null;
    operator = null;
}

/* clear button and the function to clear screen when presses */
function clearScreen(){
    operand1 = 0; //reset operand 1 and 2 to null
    operand2 = null;
    operator = null;
    result = null;
    currentNumber.textContent = "0";
    previousNumber.textContent = "";
}

/* delete button and the function to delete last digit from current number */
function deleteDigit(){
    let temp = currentNumber.textContent.toString();
    currentNumber.textContent = temp.slice(0,-1) || "0";
    //update operand1, operand2, operator

    if (operator === null){
        operand1 = Number(currentNumber.textContent);
        result = null;
    } else {
        operand2 = Number(currentNumber.textContent);
    }
}

function addDecimal(){
    if (operator === null) {
        if (!operand1.toString().includes(".")){ // add decimal if not already present
            operand1 = operand1.toString() + ".";
            currentNumber.textContent = operand1;
        }
    } else {
        if(operand2 === null){
            operand2 = "0."
        } else if (!operand2.toString().includes(".")) {
            operand2 = operand2.toString() + ".";
        }
        currentNumber.textContent = operand2;
    }
}

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
function roundResult(value, decimals = 5){ //adjust for decimal accuracy
    if(value === null) return null //for divide by zero
    return Math.round(value * Math.pow(10,decimals)) / Math.pow(10,decimals);
}
function getResult(operator, a, b){
    a = Number(a);
    b = Number(b)

    let result;
    switch(operator){
        case '+':result= add(a,b); break;
        case '-':result = subtract(a,b); break;
        case 'x':result = multiply(a,b); break;
        case '÷':
            if (b === 0){
                alert("Error: You can't divide by zero!");
                clearScreen();
                return 0;
            }
            result = divide(a,b);
            break;
        default: return 0;
    }
    return roundResult(result);
}