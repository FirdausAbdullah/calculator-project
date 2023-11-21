const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-clear]');
const equalButton = document.querySelector('[data-equal]');
const topDisplay = document.querySelector('[data-topDisplay]');
const bottomDisplay = document.querySelector('[data-bottomDisplay]');
let operation = undefined;
let operandOne = '';
let operandTwo = '';
let result = 0;
let state = 0;

function operate(){
    if (operation == undefined) return;
  switch(operation) {
    case '+':
      result = Math.round((Number(operandOne) + Number(operandTwo))*1000000)/1000000;
      break;
    case '-':
      result = Math.round((Number(operandOne) - Number(operandTwo))*1000000)/1000000;
      break;
    case 'x':
      result = Math.round((Number(operandOne) * Number(operandTwo))*1000000)/1000000;
      break;
    case '÷':
      result = Math.round((Number(operandOne) / Number(operandTwo))*1000000)/1000000;
      
      break;  
    default:
        return  
  }

  return result;
}

function initial_state(){
    operandOne = '';
    operation = '';
    operandTwo = '';
    topDisplay.innerText = '';
    bottomDisplay.innerText = '';
}

function state_one(event){
    if(operandOne.includes('.') && event == '.')return;
    operandOne += event ;
    operandTwo= 0;
    operation= undefined;
    topDisplay.innerText+=event;
    bottomDisplay.innerText='';
}

function state_two(event){
    operation = event.toString();
    topDisplay.innerText+=operation;
    result = operate();
    bottomDisplay.innerText=result.toString();
}

function state_three(event){
    if(typeof operandTwo == 'number') operandTwo = '';
    operandTwo += event;
    topDisplay.innerText+=event;
    result = operate();
    bottomDisplay.innerText=result.toString();
}

function state_four(event){
    operandOne = result.toString();
    operandTwo= '';
    operation= event;
    result = operate();
    topDisplay.innerText+=event;
    bottomDisplay.innerText=result;
}

function calculatorStatehandler(event){
    switch (state) {
        case 0:
            initial_state();
            break;
        case 1:
            state_one(event);
            break;
        case 2:
            state_two(event);
            break;
        case 3:
            state_three(event);
            break;
        case 4:
            state_four(event);
            break;
        default:
            break;
    }
}

// -------------------------- events ------------------------------------

numberButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        switch (state) {
            case 0:
                state = 1;
                calculatorStatehandler(button.innerText);
                break;
            case 1:
                calculatorStatehandler(button.innerText);
                break;
            case 2:
                state = 3;
                calculatorStatehandler(button.innerText);
                break;
            case 3:
                calculatorStatehandler(button.innerText);
                break;
            case 4:
                state = 3;
                calculatorStatehandler(button.innerText);
                break;
            default:
                break;
        }
    });
});

operatorButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        switch (state) {
            case 0:
                break;
            case 1:
                state = 2;
                calculatorStatehandler(button.innerText);
                break;
            case 2:
                break;
            case 3:
                state = 4;
                calculatorStatehandler(button.innerText);
                break;
            case 4:
                break;

            default:
                break;
        }
    });
});

clearButton.addEventListener('click',()=>{
    state = 0;
    calculatorStatehandler();
});

deleteButton.addEventListener('click',()=>{
  deleteEntry();
});