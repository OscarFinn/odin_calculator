let num1 = 0;
let num2 = 0;
let currentEquation = [];
let operatorIndex = 0;
let operator = '';
let result = '';
let num1IsResult = false;

let neg1 = false;
let neg2 = false;

const calcOutput = document.querySelector(".calc-output");

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
        num1 = parseFloat(array.slice(0,operatorIndex).join(''));
        if (neg1) {
            num1 = -num1;
        }
        num2 = parseFloat(array.slice(operatorIndex+1).join(''));
        if (neg2) {
            num2 = -num2;
        }
        console.log(typeof num2);
        operator = array[operatorIndex];
        if(typeof operator !== "string"){
            result = operate(num1,0,'');
        } else {
            result = operate(num1,num2,operator);
        }
        //console.log(num1 + ` ` + operator + ` ` + num2);
    }
    neg2 = false;
    //console.log(`Result = `+result + ` typeof:` + typeof result);
    if (typeof result == "number") {
        if (result < 0) {
            neg1 = true;
            result = -result;
        } else {
            neg1 = false;
        }
        currentEquation = Array.from(String(result));
        operatorIndex=currentEquation.length;
        num1IsResult = true;
    } else {
        currentEquation = [];
        operatorIndex = 0;
        neg1 = false;
    }
}
function handleInput(id) {
    
     //if a number is pressed it should be concatenated onto current number being built
    //if an operator is pressed it should save the current number and then start num2
    //if an operator is followed by another operator it should replace that operator
    //if num2 is followed by an operator the previous equation should be completed and the result should be set to num1
    //equals sign should calculate result
    //if a . is present in the current number no more . can be added
    
    
    if(id==="clear"){
        currentEquation = [];
        neg1 = false;
        neg2 = false;
    } else if (id === 'undo'){
        currentEquation.pop();
    } else if (id === '=') {
        handleEquation(currentEquation);
    } else if (id === '.'){
        if (num1IsResult){
            currentEquation = []
            num1IsResult = false;
        }
        if (currentEquation.includes(`/`)||currentEquation.includes(`*`)||currentEquation.includes(`-`)||currentEquation.includes(`+`)) {
            if (!currentEquation.slice(operatorIndex+1).includes('.')){
                currentEquation.push(id);
            }
        } else {
            if (!currentEquation.slice(0,operatorIndex).includes('.')) {
                currentEquation.push(id);
            } 
        }
    } else if(id===`+/-`){
        //add +/- identifier to current string
        if (currentEquation.includes(`÷`)||currentEquation.includes(`*`)||currentEquation.includes(`-`)||currentEquation.includes(`+`)) {
            if (neg2) {
                neg2 = false;
            } else {
                neg2 = true;
            }
        } else {
            if (neg1) {
                neg1 = false;
            } else {
                neg1 = true;
            }
        }
    } else if(id === `÷`|| id === `*`|| id === `-`|| id === `+`){
        //if the current string is empty set num1 to 0 and add operator to string
        if(currentEquation.length === 0){
            currentEquation.push(0);
            currentEquation.push(id);
            operatorIndex = currentEquation.length-1;
        //if final character of current string is an operator replace it
        } else if (currentEquation.slice(-1).includes(`÷`)||currentEquation.slice(-1).includes(`*`)||currentEquation.slice(-1).includes(`-`)||currentEquation.slice(-1).includes(`+`)) {
            //console.log(`replacing operator`);
            currentEquation.pop();
            currentEquation.push(id);
        //if the current equation already includes an operator 
        } else if (currentEquation.includes(`÷`)||currentEquation.includes(`*`)||currentEquation.includes(`-`)||currentEquation.includes(`+`)) {
            handleEquation(currentEquation);
            currentEquation.push(id);
        //otherwise add operator
        } else {
            currentEquation.push(id);
            operatorIndex = currentEquation.length-1;
        }
        num1IsResult = false;
    //if type is number push onto equation
    } else {
        if (num1IsResult){
            currentEquation = []
            currentEquation.push(id);
            num1IsResult = false;
        } else {
            currentEquation.push(id);
        }

    }
    
    //if no operator place operator index at end of equation
    if (!currentEquation.includes(`÷`)&&!currentEquation.includes(`*`)&&!currentEquation.includes(`-`)&&!currentEquation.includes(`+`)) {
        operatorIndex = currentEquation.length;
    }
    console.log(currentEquation);
    if(currentEquation.length === 0){
        calcOutput.textContent = '0';
    } else {
        let textEquation = currentEquation.slice(0,currentEquation.length);
        if (neg1) {
            textEquation.splice(0,0,"-");
        } 
        if (neg2) {
            textEquation.splice(operatorIndex+1,0,"-");
        }
        calcOutput.textContent = textEquation.join('');
    }
}
const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
    button.addEventListener("click",() => {
        handleInput(button.id);
    })
})