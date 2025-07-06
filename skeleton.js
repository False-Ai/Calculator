let container = document.querySelector('.container');

let display = document.querySelector('.display');
let expression = '';

let keypad = document.createElement('div');
keypad.classList.add('keypad');
container.appendChild(keypad);

let buttons = [
  'Hist','', 'Clr', 'Bksp',
  '7', '8', '9', '/',
  '4', '5', '6', '*',
  '1', '2', '3', '-',
  '.',  '0', '=', '+'
];

const historyPanel = document.createElement('div');
historyPanel.classList.add('history-panel');
historyPanel.style.display = 'none';
container.appendChild(historyPanel);

let history = [];

function handleNumber(val) {
  expression += val;
  display.textContent += val;
}

function handleDecimal() {

  if (expression === '') {
    expression += '0.';
    display.textContent += '0.';
  } else{
      let lastOperatorIndex = Math.max(
      expression.lastIndexOf('+'),
      expression.lastIndexOf('-'),
      expression.lastIndexOf('*'),
      expression.lastIndexOf('/')
    );

    let currentNumber = expression.slice(lastOperatorIndex+1)
    
    if (currentNumber === '') {
      expression += '0.';
      display.textContent += '0.';
    } else if (!currentNumber.includes('.')) {
      expression += '.';
      display.textContent += '.';
    } else {
      console.log('Decimal point already exists');
    }
  }
  
}

function handleOperator(val) {
  if (expression === '' && val !== '-') return;

  if (['+', '-', '*', '/'].includes(expression.slice(-1))) {
    expression = expression.slice(0, -1);
    display.textContent = display.textContent.slice(0, -1);
  } else if (['+', '-', '*', '/'].some(op => expression.includes(op))){
    handleEquals();
  }

  expression += val;
  display.textContent += val;
}

function handleEquals() {
  try {
    const originalExpression = expression; // 🟡 Save before overwriting
    let total;

    if (expression.includes('+')) {
      let parts = expression.split('+');
      total = parts.reduce((sum, part) => sum + Number(part), 0);
    } else if (expression.includes('-')) {
      let parts = expression.split('-');
      total = parts.reduce((diff, part) => diff - Number(part));
    } else if (expression.includes('*')) {
      let parts = expression.split('*');
      total = parts.reduce((prod, part) => prod * Number(part), 1);
    } else if (expression.includes('/')) {
      let parts = expression.split('/');
      total = parts.reduce((quot, part) => quot / Number(part));
    } else {
      display.textContent = expression;
      return;
    }

    // ✅ Handle NaN (e.g., 0/0 or ∞ * 0)
    if (isNaN(total)) {
      display.textContent = 'Invalid operation';
      expression = '';
      return;
    }

    // ✅ Fix floating-point rounding
    total = parseFloat(total.toFixed(10));

    // ✅ Update display and expression
    display.textContent = Number(total.toFixed(6));;
    expression = total.toString();

    // ✅ Add to history and render it
    history.push(`${originalExpression} = ${total}`);
    renderHistory();

  } catch {
    display.textContent = 'Error';
    expression = '';
  }
}

buttons.forEach(val => {
  let btn = document.createElement('button');
  btn.classList.add('btn');
  btn.textContent = val;

  if (!isNaN(val) || val === '.') {
    btn.classList.add('number');
  } else if (['+', '-', '*', '/'].includes(val)) {
    btn.classList.add('operator');
  } else if (val === '=') {
    btn.classList.add('equals');
  } else if (['Clr', 'Bksp', 'Hist'].includes(val)) {
    btn.classList.add('utility');
  }
  
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
    } else if (['+', '-', '*', '/'].includes(val)) {
      handleOperator(val);
    } else if (val === '=') {
      handleEquals();
    } else if (val === 'Clr') {
      expression = '';
      display.textContent = '';
    }
    else if (val === 'Bksp') {
      expression = expression.slice(0, -1);
      display.textContent = display.textContent.slice(0, -1);
    } else if (val === 'Hist') {
      if (historyPanel.style.display === 'none') {
        renderHistory();
        historyPanel.style.display = 'block';
      } else {
        historyPanel.style.display = 'none';
      }
    }

  });
  keypad.appendChild(btn);
});

function renderHistory() {
  historyPanel.innerHTML = '<h3>History</h3>' + history.map(item => `<div>${item}</div>`).join('');
}

document.addEventListener('click', (e) => {
  if (!historyPanel.contains(e.target) && e.target.textContent !== 'Hist') {
    historyPanel.style.display = 'none';
  }
});
