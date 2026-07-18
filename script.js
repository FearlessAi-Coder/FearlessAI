async function askAI() {

    let question = document.getElementById("question").value;
    let output = document.getElementById("output");
    let chatHistory = document.getElementById("chat-history");

    if (question.trim() === "") {
        output.innerHTML = "Ask me something first!";
        return;
    }

    // Show the user's message
    chatHistory.innerHTML += `
    <div class="message user-message">
        <b>You:</b> ${question}
        <br>
        <small>${new Date().toLocaleTimeString()}</small>
    </div>
    `;

    // Clear the input box
    document.getElementById("question").value = "";

    // Show thinking animation
    output.innerHTML = `
    FearlessAI is thinking
    <span class="dots">...</span>
    `;

    try {

        let response = await fetch("http://localhost:3000/ask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                question: question
            })
        });

        let data = await response.json();

        // Show AI response
        chatHistory.innerHTML += `
        <div class="message ai-message">
            <b>FearlessAI:</b> ${data.answer}
            <br>
            <small>${new Date().toLocaleTimeString()}</small>

            <br><br>

            <button onclick="copyAnswer('${data.answer.replace(/'/g, "\\'")}')">
                Copy Answer 📋
            </button>
        </div>
        `;

        output.innerHTML = "";

    } catch (error) {

        output.innerHTML = "FearlessAI is offline right now.";

    }

}

function clearChat() {
    document.getElementById("chat-history").innerHTML = "";
    document.getElementById("output").innerHTML = "";
}

function openChat() {
    document.getElementById("question").focus();
}

function copyAnswer(text) {
    navigator.clipboard.writeText(text);
    alert("Answer copied!");
}
