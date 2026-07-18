async function askAI(){

    document.getElementById("chat-history").innerHTML += `
<div class="message user-message">
<b>You:</b> ${question}
</div>
`;
    let output = document.getElementById("output");

    if(question === ""){
        output.innerHTML = "Ask me something first!";
        return;
    }

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

       document.getElementById("chat-history").innerHTML += `
<div class="message ai-message">
<b>FearlessAI:</b> ${data.answer}
</div>
`;

output.innerHTML = "";

    } catch(error) {

        output.innerHTML = "FearlessAI is offline right now.";

    }

}
function clearChat(){

    document.getElementById("chat-history").innerHTML = "";

    document.getElementById("output").innerHTML = "";

}
