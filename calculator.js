const display = document.getElementById('calc-display');

const calculator = {
    total: '',
    nextNum: '',
    operator: null,
}

const add = () => parseFloat(calculator.total) + parseFloat(calculator.nextNum);
const subtract = () => calculator.total - calculator.nextNum;
const multiply = () => calculator.total * calculator.nextNum;
const divide = () => calculator.total / calculator.nextNum;

function displayLimit() {
    if (display.textContent.length > 10) {
        calculator.total = calculator.total.substring(0,10);
        display.textContent = calculator.total
    }
}

window.addEventListener('keydown', (event) => {
    const numberKey = document.querySelector(`button[data-key="${event.keyCode}"]`)
    if(!numberKey) return;
    numberKey.click();
    displayLimit();
})

function numberButtons() {
    const calcNumbers = document.querySelectorAll('[data-number]');
    calcNumbers.forEach(numbers => numbers.addEventListener('click', () => {
        if(calculator.operator == null){
            calculator.total += numbers.dataset.number;
            display.textContent = calculator.total;
        } else {
            calculator.nextNum += numbers.dataset.number;
            display.textContent = calculator.nextNum;
        }
        displayLimit()
    }))
}

function operatorButtons() {
    const calcOperators = document.querySelectorAll('[data-operator]');
    calcOperators.forEach(operators => operators.addEventListener('click', () => {
        calculator.operator = operators.dataset.operator;
        if (calculator.nextNum != '') {
            calculator.total = operate();
            display.textContent = calculator.total;
            displayLimit();
        }
        calculator.nextNum = '';
    }))
}

function decimalButton() {
    const decimal = document.getElementById('button-decimal');
    decimal.addEventListener('click', () => {
        if (!calculator.total.includes('.') && calculator.operator == null) {
            if (calculator.total == '') calculator.total += '0';
            calculator.total += '.';
            display.textContent = calculator.total;
        } else if (!calculator.nextNum.includes('.')) {
            if (calculator.nextNum == '') calculator.nextNum += '0';
            calculator.nextNum = calculator.nextNum + '.';
            display.textContent = calculator.nextNum;
        }
        displayLimit();
    })
}

function equalButton() {
    const equal = document.getElementById('button-equal');
    equal.addEventListener('click', () => {
        calculator.total = operate();
        display.textContent = calculator.total;
        displayLimit();
        calculator.nextNum = '';
        calculator.operator = null;
    })
}

function clearButton() {
    const clear = document.getElementById('button-clear');
    clear.addEventListener('click', () => {
        calculator.total = '';
        calculator.nextNum = '';
        calculator.operator = null;
        display.textContent = '0';
    })
}

function negativeButton() {
    const negative = document.getElementById('button-negative');
    negative.addEventListener('click', () => {
        calculator.total = (calculator.total * -1).toString();
        display.textContent = calculator.total;
    })
}

function percentButton(){
    const percent = document.getElementById('button-percent');
    percent.addEventListener('click', () => {
        const percentage = (calculator.total/100).toString();
        calculator.total = percentage;
        display.textContent = calculator.total;
        displayLimit();
    })
}

function operate() {
    if (calculator.operator == '+') total = add().toString();
    if (calculator.operator == '-') total = subtract().toString();;
    if (calculator.operator == '*') total = multiply().toString();;
    if (calculator.operator == '/') total = divide().toString();;
    return total
}

numberButtons();
operatorButtons();
decimalButton();
equalButton();
clearButton();
negativeButton();
percentButton();