let num1 = undefined;
let display1 = "0";
let num2 = undefined;
let display2 = "";
let operator = undefined;
let operator_flag = false;
let result = undefined;
let resultShowed = false;
let errorFlag = false;

// addition
function add(num_1,num_2){
    return num_1+num_2;
}
// subtraction
function sub(num1,num2){
    return num1-num2;
}
// multiply
function multiply(num1,num2){
    return num1*num2;
}
// division
function divide(num1,num2){
    if(num2===0){
        return "ERROR";
    } 
    else {
        return num1/num2;
    }
}
// operator function that calls the respective operator function
function operation(first,second,op){
    if(op==='+') result = add(first,second);
    else if(op==='-') result = sub(first,second);
    else if(op==='x') result = multiply(first,second);
    else if(op==='/') result = divide(first,second);
    // if after any operation, the output became too large,the trim it, because only the display1 string is trimmed, not the actual number stored in num1,2 or result
    let temp = `${result}`;
    if(temp.length>4 && result!=="ERROR"){
        result = +result.toFixed(4);  // to fixed take number as i/p and returns a string
// to fix only works on decimals, will not work on big numbers that don't have decimals, like 1988387185838, i need 'e' for them
    }
    if(result==="ERROR") errorFlag = true;
}

// -------- display -----------
let firstDisplay = document.querySelector("#current_number");
let secondDisplay = document.querySelector("#whole_operation");

// show 0 by default
firstDisplay.textContent = "0";

// function to update display 1 also update num1 
function updateDisplay1(){
    // clears the previous number that was shown on the display and then shows the new number
    firstDisplay.textContent = display1;
}

// funciton to update display 2 also update num2
function updateDisplay2(){
    if(num1!==undefined && !operator_flag){   // case 1- num1 entered and equal pressed
        display2 = `${num1} =`;
    }
    else if(num1!==undefined && num2!==undefined && operator_flag){  // case 2 - num1,num2,operator all enetered, perform the operation and show me result
        display2 = `${num1} ${operator} ${num2} = `;
        display1 = `${result}`;
        firstDisplay.textContent = display1;
        num2 = undefined;
        num1 = +result;
        operator = undefined;
        operator_flag = false;
        // check all the values 
        console.table(num1,num2,operator,operator_flag,result,display1,display2);
    }
    else if(num1!==undefined && operator_flag){ // result is showed and now i clicked on anohter opertor to chain the operation using previous result
// this has to come after the second case because if i put this before case 2 then case 2 will never execute  
        display2 = `${num1} ${operator} `;   // case 3 num1 entered, operator selected and num2 is being given in input
    }
    secondDisplay.textContent = display2;
}

// case 2 - when enter is pressed - show whole equation with "="
function enterPressed(){
    if(!errorFlag){
        // if the user enters the second number as 0 explicitely or if he doesn't even add any number, just use 0 as the number
        if(num1!==undefined && !operator_flag){  // num1 enter and then equals to
            // firstDisplay shows the number as it is
            updateDisplay2() // second display shows "num1 ="
            resultShowed = true; 
        } 
        else if(num1!==undefined && num2!==undefined && operator_flag){ 
        // num1 , num2, operator -- all entered and then equals to
            operation(num1,num2,operator);
            updateDisplay2();
            resultShowed = true;
        }   
        else if(num1!==undefined && operator_flag){
            updateDisplay2();
        }
    }
}

// function to remove last input digit
function removeLast(){
    if(!errorFlag){
        // remove nothing if the display1 is empty -- means there is no number entered and remove nothing 
        // when the operator is given but the second number is not mentioned yet 
        if((display1==="0") || (operator_flag && num2===undefined)){}
        else{  // num1 is not undefined OR operator flag is true and num 2 is not zero
            // change the display variable
            let len = display1.length;
            if(len>1){
                if(num1<0 && len===2){  // negative single digit like : -5, when backspace clicked, should become 0 instead of removing 5 and leaving just "-"
                    display1="0";
                    num1=0;
                    updateDisplay1();
                }
                else if(num2<0 && len===2){
                    display1 = "0";
                    num2=0;
                    updateDisplay1();
                }
                else{
                    display1 = display1.slice(0,len-1);
                    updateDisplay1();
                    // update num 1 and num2 accordingly
                    if(operator_flag) num2 = +display1; 
                    else num1 = +display1;
                }
            }
            else if(len===1){
                display1 = "0";
                if(operator_flag) num2 = 0; 
                else num1 = 0;
                updateDisplay1();
            }
        }
    }

}

// function to clear everything
function clear(){
    num1 = undefined;
    num2 = undefined;
    operator = undefined;
    operator_flag = false;
    display1 = "0";
    display2 = "";
    result = undefined;
    updateDisplay1();
    secondDisplay.textContent = "";
    resultShowed=false;
    errorFlag = false;
}

// function to update numbers, both num1 AND num2
function updateNumbers(digit){
    // what happens if there is a negative sign before the number
        if(resultShowed || errorFlag){  
// if the result is showed and i press on any number but no operator before it - start a new operation
// if the previous calculation was an error and i press a number, clear everything & start new calculation
            clear();
            display1 = digit;
            num1 = +digit;
            updateDisplay1();
        }
        else if(!operator_flag){  // operator not selected, means input is for num1
            if(display1 === "0") display1 = ""; // remove zero otherwise it will get in front of number string
            display1 = display1 + digit;
            num1 = +display1;
            // function call to display the display1 value in the display1 as current number
            updateDisplay1()
        }
        else{
            // operator flag selected, means input is for num2, num2 will still be shown in display 1.
            if(num2===undefined){
                display1 = digit;
            }
            else{
                display1 = display1 + digit;
            }
            num2 = +display1;
            updateDisplay1();
        }
}

function updateOperator(op){
// if prev operation produced no error, only then proceed
    if(!errorFlag){
        // trying to enter negative number as num1 and add irresponsiveness to other operators being pressed before num1
        if(num1===undefined && op==="-"){
            display1 = "-";
            firstDisplay.textContent=display1;
        }
        else if(resultShowed){
            result = undefined;
            operator = op;
            operator_flag = true;
            updateDisplay2();
            resultShowed = false;
        }
        else if(num2===undefined){
            operator = op;
            operator_flag = true;
            updateDisplay2();
            console.log(`${operator} operator is selected`);
        }
// after entering num1,op,num2 when i press any operator again, perform the previous calculation, use its result as num1,then use currently pressed opertor , update display 2, emtpy display1, make it like middle of entering operands like operand 1 is gained from result,op is also given in input and now enter num2 then press enter or just press another operator to update things - if = pressed, show final result and update displays, if another operator pressed, repeat the previous actions
        else if(num1!==undefined && num2!==undefined && operator!==undefined){
        // perform operation based on operator
            operation(num1,num2,operator);
            num1 = result;
            num2 = undefined;
            result = undefined;
            operator = op;
            updateDisplay2();
            firstDisplay.textContent = "";
        }
    }
}


// select elements ------------------------------------------:
// -------- clear and backspace ------------
let clearrEverything = document.querySelector("#clear"); 
clearrEverything.addEventListener('click',clear);

let backspace = document.querySelector("#backspace");
backspace.addEventListener('click', removeLast);

//  ------ numbers ------------ store and attach eventlistener to all numbers in one go instead of manually adding event listener to all 10 numbers
let numberList = document.querySelectorAll(".number");
numberList.forEach((currNumber) =>{ 
    currNumber.addEventListener('click',()=>{
        updateNumbers(currNumber.textContent)
    });
});

// ----------- operators --------------- store and add event listener
let operatorList = document.querySelectorAll(".operator");
operatorList.forEach((currOperator)=>{
    currOperator.addEventListener('click', ()=>{
        updateOperator(currOperator.textContent)
    });
});

// add event listener to = and enter button
let equalsTo = document.querySelector("#equals_to");
equalsTo.addEventListener('click',enterPressed);

// add event listener to decimal


