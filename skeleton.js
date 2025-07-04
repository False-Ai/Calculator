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

buttons.forEach(val => {
  let btn = document.createElement('button');
  btn.textContent = val;

  if (val === '') {
      btn.style.visibility = 'hidden';
      keypad.appendChild(btn);
      return;
    }
  btn.addEventListener('click', ()=>{
    if (!isNaN(val)) {
      expression += val;
      display.textContent += val;
    }
    else if (val === '.') {
      if (!display.textContent.includes('.')) {
        expression += val;
        display.textContent += val;
      } else {
        console.log('Decimal point already exists');
      }
    }
    else if (['+', '-', 'X', '/'].includes(val)) {
      // Prevent starting with +, /, X
      if (expression === '' && val !== '-') return;

      // Replace last operator if needed
      if (['+', '-', 'X', '/'].includes(expression.slice(-1))) {
        expression = expression.slice(0, -1);
        display.textContent = display.textContent.slice(0, -1);
      }

      expression += val;
      display.textContent += val;
      return;
    }

    else if (val === '=') {
                console.log('Evaluating expression:', expression);

      try {
        if(expression.includes('+')){
          console.log('Evaluating expression:', expression);

          let parts = expression.split('+');
          let total = parts.reduce((sum,part) => sum+Number(part),0);
          display.textContent = total;
          expression = total.toString();
        }
        else{
          console.log('Evaluating expression:', expression);
          display.textContent = expression;
        }
      } catch {
        display.textContent = 'Error';
        expression = '';
      }
    }
    else {
      if (['+', '-', 'X', '/'].includes(val) && expression === '') return;
      if (['+', '-', 'X', '/'].includes(val) && ['+', '-', 'X', '/'].includes(expression.slice(-1))) return;

      expression += val;
      display.textContent = expression;
    }
  });
  keypad.appendChild(btn);
});