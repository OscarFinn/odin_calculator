let num1 = 0;
let num2 = 0;
let currentEquation = [];
let operatorIndex = 0;
let operator = '';
let result = '';
let num1IsResult = false;

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
function handleEquation(array) {
    if (array.length === 0) {
        result = operate(0,0,'');
    } else {
        console.log(operatorIndex);
        num1 = parseInt(array.slice(0,operatorIndex).join(''));
        num2 = parseInt(array.slice(operatorIndex+1).join(''));
        console.log(typeof num2);
        operator = array[operatorIndex];
        if(typeof operator !== "string"){
            result = operate(num1,0,'');
        } else {
            result = operate(num1,num2,operator);
        }
        //console.log(num1 + ` ` + operator + ` ` + num2);
    }
    
    console.log(`Result = `+result + ` typeof:` + typeof result);
    if (typeof result == "number") {
        currentEquation = Array.from(String(result),Number);
        operatorIndex=currentEquation.length;
        num1IsResult = true;
    } else {
        currentEquation = [];
        operatorIndex = 0;
    }
}
function handleInput(id) {
     //if a number is pressed it should be concatenated onto current number being built
    //if an operator is pressed it should save the current number and then start num2
    //if an operator is followed by another operator it should replace that operator
    //if num2 is followed by an operator the previous equation should be completed and the result should be set to num1
    //equals sign should calculate result
    //if a . is present in the current number no more . can be added
    if(id === '=') {
        handleEquation(currentEquation);
    } else if(id === `/`|| id === `*`|| id === `-`|| id === `+`){
        //if the current string is empty set num1 to 0 and add operator to string
        if(currentEquation.length === 0){
            currentEquation.push(0);
            currentEquation.push(id);
            operatorIndex = currentEquation.length-1;
        //if final character of current string is an operator replace it
        } else if (currentEquation.slice(-1).includes(`/`)||currentEquation.slice(-1).includes(`*`)||currentEquation.slice(-1).includes(`-`)||currentEquation.slice(-1).includes(`+`)) {
            console.log(`replacing operator`);
            currentEquation.pop();
            currentEquation.push(id);
        //if the current equation already includes an operator 
        } else if (currentEquation.includes(`/`)||currentEquation.includes(`*`)||currentEquation.includes(`-`)||currentEquation.includes(`+`)) {
            handleEquation(currentEquation);
            currentEquation.push(id);
        //otherwise add operator
        } else {
            currentEquation.push(id);
            operatorIndex = currentEquation.length-1;
        }
        num1IsResult = false;
    //if type is number push onto equation
    } else if(typeof parseInt(id) == "number") {
        if (num1IsResult){
            currentEquation = []
            currentEquation.push(id);
            num1IsResult = false;
        } else {
            currentEquation.push(id);
        }

    }
    //if no operator place operator index at end of equation
    if (!currentEquation.includes(`/`)&&!currentEquation.includes(`*`)&&!currentEquation.includes(`-`)&&!currentEquation.includes(`+`)) {
        operatorIndex = currentEquation.length;
    }
   
}
const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
    button.addEventListener("click",() => {
        handleInput(button.id);
    })
})