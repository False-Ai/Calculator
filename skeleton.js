let container = document.querySelector('.container');
let btnbox = document.createElement('div');
btnbox.setAttribute('class','btnbox');
container.appendChild(btnbox);
for(let i=0;i<=9;i++){
  let buttons = document.createElement('button');
  buttons.textContent=`${i}`;
  btnbox.appendChild(buttons);
}

let opsbox = document.createElement('div');
opsbox.classList.add('opsbox');
let add = document.createElement('button');
add.textContent="+";
opsbox.appendChild(add);
let sub = document.createElement('button');
sub.textContent='-';
opsbox.appendChild(sub);
let mul = document.createElement('button');
mul.textContent='X';
opsbox.appendChild(mul);
let divi = document.createElement('button');
divi.textContent='/';
opsbox.appendChild(divi);
let equals = document.createElement('button');
equals.textContent='=';
opsbox.appendChild(equals);
let back = document.createElement('button');
back.textContent='<-';
opsbox.appendChild(back);
container.appendChild(opsbox);