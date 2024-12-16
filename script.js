const buttons = document.querySelectorAll("button");

let currentInput = ''; // Holds first clicked input 
let firstNumber = '';
let operand = '';;
let secondNumber = '';
let result = null;
let currentDisplay = document.getElementById("currentNumber");
let previousDisplay = document.getElementById("previousNumber");

let fullCal = []; // Checks all inputs

buttons.forEach(button => {
    button.addEventListener('click' , (e) =>{
        let value = e.target.textContent;
        fullCal.push(value);
        if (!isNaN(value) || value === "."){
            currentInput += value
            console.log("current Input: " + currentInput)
            document.getElementById("currentNumber").innerHTML = currentInput;
        } else if (value === "+" || value === "-" || value === "/" || value === "*") {
            if (firstNumber === ""){
                firstNumber = currentInput; // If no first number, set the current input as the first number
                currentInput = ""; // Reset current input for next number
                document.getElementById("currentNumber").innerHTML = "";
            }
            else if (result !== null && currentInput === ''){
                //  If there is a result && no currentInput from previous calculation set currentInput as firstNumber
                firstNumber = result.toString();
                document.getElementById("previousNumber").innerHTML = firstNumber;
                console.log("There is a result and the first number is " + firstNumber)
            }
            if (currentInput !== ''){  //  If there is a result && currentInput has a number, set currentInput as secondNumber
                secondNumber = currentInput;
                calculate();
            }
            operand = value;
        } 
        else if (value === "="){
            if (firstNumber && currentInput && operand){
                secondNumber = currentInput;
                calculate();
            }
        } 
        else if (value ==="AC"){
            resetCalculator();
        }
        else if (value ==="DEL"){
            deleteNum();
        }
        console.log(fullCal.join(" ") + " " + result);
        document.getElementById("previousNumber").innerHTML = firstNumber;
    });
}
);

let calculate = () =>{
    if (operand === '+') {
        result = parseFloat(firstNumber) + parseFloat(secondNumber);
    } else if (operand === '-') {
        result = parseFloat(firstNumber) - parseFloat(secondNumber);
    } else if (operand === '/') {
        if (secondNumber === "0") {
            console.log("Cant divide by zero");
            result = "ERROR";
        } else {
            result = parseFloat(firstNumber) / parseFloat(secondNumber);
        }
    } else if(operand === '*') {
        result = parseFloat(firstNumber) * parseFloat(secondNumber);   
    }
        if (result === "ERROR") {
            document.getElementById("currentNumber").innerHTML = "ERROR";
        } else {
            console.log("Result: " + result);
            currentInput = "";
            operand = "";
            firstNumber = result;
            document.getElementById("previousNumber").innerHTML = firstNumber;
            document.getElementById("currentNumber").innerHTML = "";
        }

}   

function resetCalculator() {
    firstNumber = '';
    secondNumber = '';
    operand = '';
    currentInput = '';
    result = null;
    fullCal = [];
    console.log("Calculator reset.");
    document.getElementById("previousNumber").innerHTML = '';
    document.getElementById("currentNumber").innerHTML = '';
}

function deleteNum() {
    currentInput = currentInput.slice(0,-1);
    document.getElementById("currentNumber").innerHTML = currentInput;
    console.log("New current input is: " + currentInput);
}
