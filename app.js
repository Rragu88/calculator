let newValue = 0;
let numberArray = [];
let firstOperand = ''
let secondOperand = ''
let currentOperation = null
let shouldResetScreen = false

const lastOperationScreen = document.getElementById('lastOperationScreen');
const currentOperationScreen = document.getElementById('currentOperationScreen');
const btns = document.querySelectorAll('button');
const numberButtons = document.querySelectorAll('.btn.number');
const clearButton = document.querySelector('.btn.action.clear');
const signButton = document.querySelector('.btn.action.sign');
const percentButton = document.querySelector('.btn.action.percent');
const pointButton = document.getElementById('pointBtn');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('.btn.operator.equals');


btns.forEach(btn => btn.addEventListener('mousedown', function() {
    btn.classList.add('btn-on');  
}));

btns.forEach(btn => btn.addEventListener('mouseup', function() {
    btn.classList.remove('btn-on');
  }));

numberButtons.forEach(btn => btn.addEventListener('click', () => appendNumber(btn.textContent)));

clearButton.addEventListener('click', () => {
    clear();
});

signButton.addEventListener('click', () => changeSign(currentOperationScreen.textContent));

percentButton.addEventListener('click', () => toPercent(currentOperationScreen.textContent));

operatorButtons.forEach(btn => btn.addEventListener('click', () => setOperation(btn.textContent)));

equalsButton.addEventListener('click', evaluate);

pointButton.addEventListener('click', appendPoint);

function appendNumber(number) {
    if (currentOperationScreen.textContent === '0' || shouldResetScreen) {
        resetScreen();
    }
    currentOperationScreen.textContent += number;
}

function appendPoint() {
    if (shouldResetScreen) resetScreen();
    if (currentOperationScreen.textContent === '') {
        currentOperationScreen.textContent = '0';
    }
    if (currentOperationScreen.textContent.includes('.')) return;

    currentOperationScreen.textContent += '.';
}

const resetScreen = () => {
    currentOperationScreen.textContent = '';
    shouldResetScreen = false;
}

function clear() {
    currentOperationScreen.textContent = '0';
    lastOperationScreen.textContent = '';
    firstOperand = '';
    secondOperand = '';
    currentOperation = null;
  }
  

const changeSign = (number) => {
    numberArray = number.split('');
    if (numberArray[0].match(/-/)) {
        numberArray.shift();
        let displayNumber = numberArray.join('');
        currentOperationScreen.textContent = displayNumber;
    } else {
        numberArray.unshift('-');
        let displayNumber = numberArray.join('');
        currentOperationScreen.textContent = displayNumber;
    }
}

function toPercent(number) {
    firstArg = (parseFloat(number)/100);
    firstArg = firstArg.toString();
    currentOperationScreen.textContent = firstArg;
}

function setOperation(operator) {
    if (currentOperation !== null) evaluate();
    firstOperand = currentOperationScreen.textContent;
    currentOperation = operator;
    lastOperationScreen.textContent = `${firstOperand} ${currentOperation}`;
    shouldResetScreen = true;
}

function evaluate() {
    if (currentOperation === null || shouldResetScreen) return;
    if (currentOperation === '÷' && currentOperationScreen.textContent === '0') {
        alert("You can't divide by 0!");
        return;
    }
    secondOperand = currentOperationScreen.textContent;
    currentOperationScreen.textContent = roundResult(operate(currentOperation, firstOperand, secondOperand));
    lastOperationScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`;
    currentOperation = null;
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000;
}

function add(a, b) {
    return a + b;
}
    
function substract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
        switch (operator) {
        case '+':
        return add(a, b);
        case '-':
        return substract(a, b);
        case 'x':
        return multiply(a, b);
        case '÷':
        if (b === 0) return null;
        else return divide(a, b);
        default:
        return null;
    }
}