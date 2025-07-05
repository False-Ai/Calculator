let container = document.querySelector('.container');

let display = document.querySelector('.display');
let expression = '';

let keypad = document.createElement('div');
keypad.classList.add('keypad');
container.appendChild(keypad);

let buttons = [
  '7', '8', '9', '/',
  '4', '5', '6', 'X',
  '1', '2', '3', '-',
  '.',  '0', '=', '+'
];

function handleNumber(val) {
  expression += val;
  display.textContent += val;
}

function handleDecimal() {
  if (!display.textContent.includes('.')) {
    expression += '.';
    display.textContent += '.';
  } else {
    console.log('Decimal point already exists');
  }
}

function handleOperator(val) {
  if (expression === '' && val !== '-') return;

  if (['+', '-', 'X', '/'].includes(expression.slice(-1))) {
    expression = expression.slice(0, -1);
    display.textContent = display.textContent.slice(0, -1);
  } else if (['+', '-', 'X', '/'].some(op => expression.includes(op))){
    handleEquals();
  }

  expression += val;
  display.textContent += val;
}

function handleEquals() {
  try {
    if (expression.includes('+')) {
      let parts = expression.split('+');
      let total = parts.reduce((sum, part) => sum + Number(part), 0);
      display.textContent = total;
      expression = total.toString();
    } else if (expression.includes('-')) {
      let parts = expression.split('-');
      let total = parts.reduce((diff, part) => diff - Number(part));
      display.textContent = total;
      expression = total.toString();
    } else if (expression.includes('X')) {
      let parts = expression.split('X');
      let total = parts.reduce((prod, part) => prod * Number(part), 1);
      display.textContent = total;
      expression = total.toString();
    } else if (expression.includes('/')) {
      let parts = expression.split('/');
      let total = parts.reduce((quot, part) => quot / Number(part));
      if (isNaN(total)) {
        display.textContent = 'Cannot Divide zero by zero';
        expression = '';
      } else {
        display.textContent = total;
        expression = total.toString();
      }
    } else {
      display.textContent = expression;
    }
  } catch {
    display.textContent = 'Error';
    expression = '';
  }
}


buttons.forEach(val => {
  let btn = document.createElement('button');
  btn.classList.add('btn');
  btn.textContent = val;

  if (val === '') {
    btn.style.visibility = 'hidden';
    keypad.appendChild(btn);
    return;
  }

  btn.addEventListener('click', () => {
    if (!isNaN(val)) {
      handleNumber(val);
    } else if (val === '.') {
      handleDecimal();
    } else if (['+', '-', 'X', '/'].includes(val)) {
      handleOperator(val);
    } else if (val === '=') {
      handleEquals();
    }
  });
  keypad.appendChild(btn);
});