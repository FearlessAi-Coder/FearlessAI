function sayHello() {
    let input = document.getElementById("userInput").value;
    let output = document.getElementById("output");

    if (input.trim() === "") {
        output.textContent = "Please type something!";
    } else {
        output.textContent = "You said: " + input;
    }
}
