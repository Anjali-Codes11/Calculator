// Selecting key DOM elements
const display = document.getElementById('display');// The calculator's display screen
const buttons = document.querySelectorAll('form input');// All input buttons (numbers, operators, etc.)
const toggle = document.getElementById('theme-toggle'); // Theme toggle button (🌙 / ☀)
const body = document.body;// Reference to the <body> tag for theme switching
const calculator = document.querySelector('.calculator');// Main calculator container
const operators = ['+', '-', '*', '/']; // Valid operator symbols

// Add click event to each calculator button
buttons.forEach(input => {
  input.addEventListener('click', () => {
    const value = input.value;// Value of the clicked button
    const lastChar = display.value.slice(-1); // gets last character  currently in the display


     // Clear the entire display when 'AC' is pressed
    if (value === 'AC') {
      display.value = '';
    } 
    // Delete the last character when 'DE' is pressed
    else if (value === 'DE') {
      display.value = display.value.slice(0, -1);
    }
    // Evaluate the expression when '=' is pressed and display is not empty
    else if (value === '=' && display.value !== '') {
      try {
         // Use Function constructor to evaluate the math expression
        display.value = new Function('return ' + display.value)();
      } catch {
        // Show error if the expression is invalid
        display.value = 'Error';
      }
    }
    // Handle operators (+, -, *, /)
    else if (operators.includes(value)) {
      // Prevent starting the expression with an operator
      if (display.value === '') return;

       // If last character is also an operator, replace it
      if (operators.includes(lastChar)) {
        display.value = display.value.slice(0, -1) + value;
      } 
       // Else, simply append the operator
    else {
        display.value += value;
      } 
    }  
     // Append number or dot (.) to the display
    else {
      display.value += value;
    }
  });
});



// Toggle Theme
toggle.addEventListener('click', () => {
  // Toggle light/dark classes on body and calculator
    body.classList.toggle('light');
    body.classList.toggle('dark');
    calculator.classList.toggle('light');
    calculator.classList.toggle('dark');

     // Change toggle button icon based on current theme
    toggle.textContent = body.classList.contains('light') ? '☀' : '🌙';
});