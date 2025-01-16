// Selecting elements
const previousOperation = document.getElementById("previous-operation");
const currentOperation = document.getElementById("current-operation");
const buttons = document.querySelectorAll(".calculator-buttons button");

let currentInput = ""; // Stores the current input
let previousInput = ""; // Stores the previous input
let operator = ""; // Stores the current operator

// Function to update the display
function updateDisplay() {
  // Limit input to fit the screen (e.g., 10 characters max)
  const maxLength = 10;

  // Only show "0" if there's no previous input or current input is empty
  currentOperation.textContent = currentInput === "" && !previousInput
    ? "0"
    : currentInput.length > maxLength
      ? currentInput.slice(0, maxLength)
      : currentInput;

  previousOperation.textContent = previousInput; // Show previous input 
}

// Function to handle button clicks
function handleButtonClick(event) {
  const value = event.target.dataset.value;

  if (!value) return; // Ignore clicks without a valid value

  if (!isNaN(value) || value === ".") {
    // Handle numbers and decimals
    if (value === "." && currentInput.includes(".")) return; // Prevent multiple decimals
    if (value === "." && currentInput === "") {
      currentInput = "0."; // Add "0." if "." is the first character
    } else {
      currentInput += value; // Append number or decimal
    }
    updateDisplay();
  } else if (value === "clear") {
    // AC button: Clear all inputs
    currentInput = "";
    previousInput = "";
    operator = "";
    updateDisplay();
  } else if (value === "delete") {
    // DEL button: Delete the last character
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
  } else if (value === "=") {
    // "=" button: Perform the calculation
    if (previousInput && operator && currentInput) {
      try {
        const result = calculate(previousInput, operator, currentInput);
        previousInput = ""; // Clear previous input after calculation
        currentInput = result.toString(); // Show result on the lower screen
        operator = ""; // Clear the operator
        updateDisplay(); 
      } catch (error) {
        currentOperation.textContent = "Error";
      }
    }
  } else if (value === "sqrt") {
    // Square root function
    if (currentInput) {
      try {
        const result = Math.sqrt(parseFloat(currentInput));
        currentInput = result.toString();
        updateDisplay();
      } catch (error) {
        currentOperation.textContent = "Error";
      }
    }
  } else {
    // Operators (+, -, *, /, %)
    previousInput += currentInput + " " + value + " "; 
    currentInput = ""; // Clear current input for the next number
    operator = value; // Set the operator
    updateDisplay();
  }
}

// Function to perform calculations
function calculate(first, op, second) {
  const num1 = parseFloat(first);
  const num2 = parseFloat(second);

  if (isNaN(num1) || isNaN(num2)) return 0;

  switch (op) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      return num2 !== 0 ? num1 / num2 : "Error"; // Avoid division by zero
    case "%":
      return num1 % num2;
    default:
      return 0;
  }
}

// Add event listeners to all buttons
buttons.forEach((button) => {
  button.addEventListener("click", handleButtonClick);
});

// Initial display update
updateDisplay();