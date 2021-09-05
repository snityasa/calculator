const numButton = document.querySelectorAll('.numButton');
const opButton = document.querySelectorAll('.opButton');
const displayText = document.querySelector('.displayText');
const equalButt = document.querySelector('.operateButt');
const delButt = document.querySelector('.delButt');
const clearButt = document.querySelector('.clearButt');
const lastDisplay = document.querySelector('.lastDisplay');

let shouldReset = false;
let operator = null;
let lastNumber = '';
let newNumber ='';


clearButt.addEventListener('click', clear);
delButt.addEventListener('click', del);
equalButt.addEventListener('click', evaluate);

opButton.forEach((button) => {
    button.addEventListener('click', () => {
        setOperation(button.textContent);
    });
});

numButton.forEach((button1) => {
    button1.addEventListener('click', () => {
        appendNumber(button1.textContent);
    });
});

function clear() {
    lastDisplay.textContent = '';
    displayText.textContent = '0';
    lastNumber = '';
    newNumber = '';
    operator = null;
    shouldReset = false;
}

function del() {
    displayText.textContent = displayText.textContent.toString().slice(0, -1);
}

function setOperation(op) {
    if (operator != null) {
        evaluate();
    } 
    operator = op;
    lastNumber = parseFloat(displayText.textContent);
    lastDisplay.textContent = `${lastNumber} ${operator}`;
    shouldReset = true;
    
}

function evaluate() {
    if (operator == null || shouldReset) return
    if (operator == '/' && displayText.textContent == '0') {
        alert("Error");
        return
    }

    newNumber = parseFloat(displayText.textContent);
    displayText.textContent = operate(lastNumber, newNumber, operator);
    lastDisplay.textContent = `${lastNumber} ${operator} ${newNumber} =`;
    operator = null;
}

function operate(lastNum, newNum, op) {
    let result = 0.00;
    if (op == 'x') {
        result = lastNum*newNum;
    } else if (op == '/') {
        result = lastNum/newNum;
    } else if (op == '-') {
        result = lastNum - newNum;
    } else if (op == '+') {
        result = lastNum + newNum;
    }

    return(result);
}


function appendNumber(num) {
    if (displayText.textContent === '0' || shouldReset) {
        resetDisplayText();
    }

    if (num === '.') {
        appendPoint();
    } else {
        displayText.textContent += num;
    }
}

function appendPoint() {
    if (displayText.textContent === '') {
        displayText.textContent = '0';
    }
    if (displayText.textContent.includes('.')) return;
    displayText.textContent += '.';
}

function resetDisplayText() {
    displayText.textContent = '';
    shouldReset = false;
}


