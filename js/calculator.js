var keys = document.querySelectorAll(".calculator button");
var operators = ["x", "+", "-", "÷"];
var decimalAdded = false; //Flag to know when a decimal is added in a number


for (var i = 0; i < keys.length; i++){
    keys[i].onclick = function(){
        var display = document.getElementById("display");
        var displayVal = display.innerHTML;
        var btnVal = this.innerHTML;

        //Clear the input box if C button is pressed
        if (btnVal == 'C'){
            display.innerHTML = '';
            decimalAdded = false;
        }
        else if (btnVal == '='){
            var equation = displayVal;
            var lastChar = equation[equation.length - 1];

            //Replace 'x' and '÷' for * and / respectively
            equation = equation.replace(/x/g, '*').replace(/÷/g, '/');

            //If the last character of the input is a operator or a decimal point
            //then remove it
            if (operators.indexOf(lastChar) > -1 || lastChar == '.'){
                equation = equation.replace(/.$/, '');
            }

            //Evaluate the equation in the display box and show the result
            display.innerHTML = eval(equation);
        }

        //When a operator key is pressed
        else if (operators.indexOf(btnVal) > -1) {

            var lastChar = displayVal[displayVal.length-1];

            //Don't add operator if another operator is already the last char
            if (displayVal != "" && operators.indexOf(lastChar) == -1){
                display.innerHTML += btnVal;
            }

            //Add "-" if pressed when display is empty
            else if(display.innerHTML == "" && btnVal == "-"){
                display.innerHTML += btnVal;
            }

            //Replace an operator already in the display with the one pressed
            else if (operators.indexOf(lastChar) > -1 && displayVal.length > 1){
                display.innerHTML = displayVal.replace(/.$/, btnVal);
            }

            decimalAdded = false;
        }

        //Don't add another decimal point in a number that already has it
        else if (btnVal == "."){
            if (!decimalAdded){
                display.innerHTML += btnVal;
                decimalAdded = true;
            }
        }
        else{
            display.innerHTML += btnVal;
        }
    }
}