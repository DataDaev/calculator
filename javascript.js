const display = document.getElementById('calc-display');

const calculator = {
    total: '',
    nextNum: '',
    operator: null,
}

const add = () => parseInt(calculator.total) + parseInt(calculator.nextNum);
const subtract = () => calculator.total - calculator.nextNum;
const multiply = () => calculator.total * calculator.nextNum;
const divide = () => calculator.total / calculator.nextNum;

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
        console.log(calculator.total);
        console.log(calculator.nextNum);
    }))
}

function operatorButtons() {
    const calcOperators = document.querySelectorAll('[data-operator]');
    calcOperators.forEach(operators => operators.addEventListener('click', () => {
        calculator.operator = operators.dataset.operator;
        calculator.nextNum = '';
        console.log(calculator.operator);
    }))
}

function equalButton() {
    const equal = document.getElementById('button-equal');
    equal.addEventListener('click', () => {
        calculator.total = operate();
        display.textContent = calculator.total;
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
        display.textContent = '';
    })
}

function negativeButton() {
    const negative = document.getElementById('button-negative');
    negative.addEventListener('click', () => {
        const negativeCurrentNumber = "-" + calculator.total;
        if (display.textContent == '0' || display.textContent == '') {
            display.textContent = calculator.total;
        } else if (calculator.total.includes('-')){
            display.textContent = calculator.total;
        } else if (calculator.operator != null) {
            const negativeNextNumber = '-' + calculator.nextNum;
            calculator.nextNum = negativeNextNumber;
            display.textContent = calculator.nextNum;
        } else {
            calculator.total = negativeCurrentNumber;
            display.textContent = calculator.total;
        }
    })
}

function percentButton(){
    const percent = document.getElementById('button-percent');
    percent.addEventListener('click', () => {
        if (display.textContent.length == 1) {
            const percentOneDigit = '00' + calculator.total;
            const arrayTotal = percentOneDigit.split('');
            arrayTotal.splice(1, 0, '.');
            const newTotal = arrayTotal.join('');
            calculator.total = newTotal
            display.textContent = calculator.total
            console.log(calculator.total);
        }
        // const arrayTotal = calculator.total.split('');
        // arrayTotal.splice(2, 0, '.');
        // const newTotal = arrayTotal.join('');
        // display.textContent = newTotal
    })
}

function operate() {
    if (calculator.operator == '+') total = add()
    if (calculator.operator == '-') total = subtract()
    if (calculator.operator == '*') total = multiply()
    if (calculator.operator == '/') total = divide()
    console.log(total);
    return total
}

numberButtons()
operatorButtons()
equalButton()
clearButton()
negativeButton()
percentButton()