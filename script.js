
//1. cannot delete properly
//2. add cannot divide by 0
//3. equal button - must insert a full expression




//get all necessary elements
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-clear]');
const equalButton = document.querySelector('[data-equal]');
const topDisplay = document.querySelector('[data-topDisplay]');
const bottomDisplay = document.querySelector('[data-bottomDisplay]');
let operation = undefined;
let operandOne = 0;
let operandTwo = 0;
let result = 0;

function clear(){
    topDisplay.innerText = '';
    bottomDisplay.innerText = '';
    result = 0;
    operandOne =0;
    operandTwo = 0;
    operation = undefined;
}

function deleteEntry(){
  topDisplay.innerText=topDisplay.innerText.slice(0,-1);
}

function appendElement(number){
  topDisplay.innerText += number.toString();
}

function currentOperation(operator){
  operation = operator;
  if(operandTwo!=0){
    operandOne = result;
    operandTwo = 0;
  }

  appendElement(operator);
}

function operate(num1,num2,op){
  if (op == undefined) return;
  switch(op) {
    case '+':
      result = Number(num1) + Number(num2);
      break;
    case '-':
      result = Number(num1) - Number(num2);
      break;
    case 'x':
      result = Math.round((Number(num1) * Number(num2))*1000000)/1000000;
      break;
    case '÷':
      result = Math.round((Number(num1) / Number(num2))*1000000)/1000000;
      
      break;  
    default:
        return  
  }
  
  if (bottomDisplay.innerText!='') bottomDisplay.innerText = '';
  bottomDisplay.innerText = result;
}


numberButtons.forEach(button=>{
    button.addEventListener('click',()=>{ 
      if (operation!= undefined){
        operandTwo += button.innerText.toString();
      }
      else{
      operandOne += button.innerText.toString();
      }
      appendElement(button.innerText);
      operate(operandOne,operandTwo,operation);
    });
});

operatorButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        if(topDisplay.innerText.slice(-1)=='+'||
        topDisplay.innerText.slice(-1)=='-'||
        topDisplay.innerText.slice(-1)=='x'||
        topDisplay.innerText.slice(-1)=='÷') return;
        currentOperation(button.innerText);
    });
});

clearButton.addEventListener('click',()=>{
    clear();
});

deleteButton.addEventListener('click',()=>{
  deleteEntry();
});

