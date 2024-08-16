const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class calculator{
  constructor(previousOperationText, currentOperationText){
    this.previousOperationText = previousOperationText
    this.currentOperationText = currentOperationText
    this.currentOperation = ""
  }

  // add digit to calculator screen
  addDigit(digit){
    // Check if current operation already has a dot
    if(digit === "." && this.currentOperationText.innerText.includes(".")){
      return;
    }


    this.currentOperation = digit
    this.updateScreen()
  }

  //Process all calculator operations
  processOperation(operation){
    // Check if current is empty
    if(this.currentOperationText.innerText === "" && operation != "C"){
      //Change operation
      if(this.previousOperationText.innerText !== ""){
        this.changeOperation(operation);
      }
      return;
    }

    // Get current and previous value
    let operationValue
    let previous = +this.previousOperationText.innerText.spli(" ")[0];
    let current = +this.currentOperationText.innerText;

    switch(operation) {
      case "+":
        operationValue = previous + current
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "-":
        operationValue = previous - current
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "/":
        operationValue = previous / current
        this.updateScreen(operationValue, operation, current, previous);
        break; 
      case "*":
        operationValue = previous * current
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "DEL":
        this.processDelOperation();
        break;  
      case "CE":
        this.processClearCurrentOperatio();
        break;
      case "C":
        this.processClearoperation();
        break;
      case "=":
        this.processEqualOperator();
        break;         
      default:
        return;
    }
  }

  // change values of the calculator screen
  updateScreen(
    operationValue = null, 
    operation = null, 
    current = null, 
    previous = null){
    console.log(operationValue, operation, current, previous);

    if(operationValue === null){
      this.currentOperation.innerText += this.currentOperation;
    } else{
      //Check if value is zero, if it is just add current value
      if(previous === 0){
        operationValue = current
      }

      // Add current value to previous
      this.previousOperationText.innerText = `${operationValue} ${operation}`;
      this.currentOperationText.innerText = "";
    }
  }


  //Change math operation
  changeOperation(operation){
    const mathOperation = ["*", "/", "+", "-"];
    if(!mathOperation.includes(operation)){
      return
    }
    this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0,-1) + operation;
  }
  

  //Delete the last digit
  processDelOperator(){
    this.currentOperation.innerText =
     this.currentOperationText.innerText.slice(0, -1);
  }

  // clear current operation
  processClearCurrentOperatio(){
    this.currentOperationText.innerText = "";
  }

  //Clear all operations
  processClearoperation(){
    this.currentOperationText.innerText = "";
    this.previousOperationText.innerText = "";
  }

  //Process an operation
  processEqualOperator(){

    const operation = previousOperationText.innerText.split("")[1]

    this.processOperation(operation);
  }
}

const calc = new calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEvenListener("click", (e) =>{

        const value = e.target.innerText;

        if(+value >=0 || value === "."){
            console.log(value);
        }else{
            calc.processOperation(value);
        }
    });
})
