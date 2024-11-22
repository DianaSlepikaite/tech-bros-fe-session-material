// Add an event listener to the button with the ID "submitButton"
// This ensures that the function is executed when the button is clicked.
document.getElementById("submitButton").addEventListener("click", function() {
  
    // Retrieve the value entered in the input field with the ID "nameField"
    // The .value property gets the text the user typed into the input box.
    const name = document.getElementById("nameField").value;

    // Display an alert message with a personalized greeting
    // The message includes the user's name, dynamically inserted using a template literal.
    alert(`Hello, ${name}! Welcome to the Hackathon!`);
});
