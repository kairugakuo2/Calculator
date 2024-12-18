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

/////// Standard Math Section ////////

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

/// Scientific calculator  //
const toggleScientificBtn = document.querySelector("#toggle-scientific");
const scientificButtons = document.querySelector(".scientific-buttons");

toggleScientificBtn.addEventListener("click", () => {
    scientificButtons.classList.toggle("hidden");
});

scientificButtons.querySelectorAll("button").forEach( (btn) => {
    btn.addEventListener("click", () => {
        const func = btn.dataset.func;
        getScientificResult(func);
    })
})

function getScientificResult(func){
    let value = parseFloat(currentNumber.textContent) || 0;
    switch(func){
        case "sin":
            value = Math.sin(toRadians(value));
            break;
        case "cos":
            value = Math.cos(toRadians(value));
            break;
        case "tan":
            value = Math.tan(toRadians(value));
            break;
        case "sqrt":
            value = Math.sqrt(value);
            break;
        case "cbrt": //cube root
            value = Math.cbrt(value);
            break;
        case "pow":
            const exponent = prompt("Enter exponent: ");
            if(exponent === null || isNaN(exponent)) {
                alert("Invalid input for exponent");
                return;
            }
            value = Math.pow (value, parseFloat(exponent));
            break;
        case "tenPow":
            value = Math.pow (10 , value);
            break;
        case "ln":
            value = Math.log(value);
            break;
        case "log":
            value = Math.log10(value);
            break;
        case "factorial":
            value = factorial(value);
            break;
        case "pi":
            value = Math.PI;
            break;
        case "e":
            value = Math.E;
            break;
        default:
            value = value;
        }
    if(operator === null){
        result = value;
    } else {
        operand2 = value;
    }
    currentNumber.textContent = roundResult(value);
}

function factorial(number){ //recursive function to find factorial
    if (number < 0) return NaN;
    if (number === 0 || number === 1) return 1;

    return number * factorial(number - 1);
}
function toRadians(degrees){
    return degrees * (Math.PI / 180);
}

//speech to text implementation

//display transcript and result
const updateUI = (transcription,result) => {
    document.querySelector(".previousScreen").textContent = transcription;
    document.querySelector(".currentScreen").textContent = result;
};

//process response from backend
const handleAudioTranscript = (audioBlob) => {
    const formData = new FormData();
    formData.append("file", audioBlob, "audio.wav");

    fetch("http://localhost:5000/transcribe", {
        method: "POST",
        body: formData,
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.error) {
                alert(data.error);
                return;
            }

            const { transcript, result } = data;
            updateUI(transcript, result);
        })
        .catch((error) => {
            console.error("Error processing transcription:", error);
        });
};

// record audio + send it to  backend
const recordAudio = () => {
    const constraints = { audio: true };
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();

        mediaRecorder.ondataavailable = (e) => {
            const audioBlob = e.data;
            handleAudioTranscription(audioBlob);
        };
    });
};

// Timer variables
let mediaRecorder;
let timerInterval;
let elapsedTime = 0;

// Start the timer
const startTimer = () => {
    elapsedTime = 0;
    const timerDisplay = document.querySelector("#timer");
    timerDisplay.textContent = "Recording: 0s";
    timerInterval = setInterval(() => {
        elapsedTime++;
        timerDisplay.textContent = `Recording: ${elapsedTime}s`;
    }, 1000);
};

// Stop the timer
const stopTimer = () => {
    clearInterval(timerInterval);
    const timerDisplay = document.querySelector("#timer");
    timerDisplay.textContent = "Recording stopped.";
};

// Start recording audio
const startRecording = () => {
    const constraints = { audio: true };
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();
        startTimer();

        mediaRecorder.ondataavailable = (e) => {
            const audioBlob = e.data;
            handleAudioTranscription(audioBlob);
        };
    });
};

// Stop recording audio
const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === "recording") {
        mediaRecorder.stop();
        stopTimer();
    }
};

// Toggle recording when the button is pressed
let isRecording = false;
const toggleRecording = () => {
    const recordButton = document.querySelector("#recordButton");
    if (isRecording) {
        stopRecording();
        recordButton.textContent = "Start Recording";
    } else {
        startRecording();
        recordButton.textContent = "Stop Recording";
    }
    isRecording = !isRecording;
};

// Add the button and timer display to the UI
const recordButton = document.createElement("button");
recordButton.id = "recordButton";
recordButton.textContent = "Start Recording";
recordButton.addEventListener("click", toggleRecording);
document.body.appendChild(recordButton);

const timerDisplay = document.createElement("p");
timerDisplay.id = "timer";
timerDisplay.textContent = "Press the button to start recording.";
document.body.appendChild(timerDisplay);
