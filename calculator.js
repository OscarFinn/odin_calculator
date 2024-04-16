let num1 = 0;
let num2 = 0;
let operator = '';
let lastInput = '';

function add(a,b){
    return a + b;
}
function subtract(a,b){
    return a - b;
}
function multiply(a,b){
    return a * b;
}
function divide(a,b){
    if (b === 0) {
        return "ERR";
    }
    return a/b;
}
function operate(num1,num2,operator){
    switch(operator) {
        case '+':
            return add(num1,num2);
        case `-`:
            return subtract(num1,num2);
        case `*`:
            return multiply(num1,num2);
        case `/`:
            return divide(num1,num2);
        case '':
            return num1;
    }
}

const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
    button.addEventListener("click",() => {
        alert(button.id);
    })
})