// let num1 = +prompt("Enter First Number :");
// let num2 = +prompt("Enter Second Number :");
// let operator = prompt("Enter The Operator :");

// addition
function add(num_1,num_2){
    console.log(num_1+num_2);
    return num_1+num_2;
}
// subtraction
function sub(num1,num2){
    console.log(num1-num2);
    return num1-num2;
}
// multiply
function multiply(num1,num2){
    console.log(num1*num2);
    return num1*num2;
}
// division
function divide(num1,num2){
    if(num2===0){
        console.log("ERROR: Division by 0");
        return "ERROR: Division by 0";
    } 
    else {
        console.log(num1/num2);
        return num1/num2;
    }
}
// operator function that calls the respective operator function
function operation(){
    let num1 = +prompt("Enter First Number :");
    let num2 = +prompt("Enter Second Number :");
    let operator = prompt("Enter The Operator :");
    if(operator==='+') add(num1,num2);
    else if(operator==='-') sub(num1,num2);
    else if(operator==='*') multiply(num1,num2);
    else divide(num1,num2);
}
// function call for operator function
operation();