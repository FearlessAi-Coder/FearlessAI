async function askAI() {

    let question = document.getElementById("question").value;
    let output = document.getElementById("output");
    let chatHistory = document.getElementById("chat-history");

    if (question.trim() === "") {
        output.innerHTML = "Ask me something first!";
        return;
    }


    chatHistory.innerHTML += `
    <div class="message user-message">
        <b>You:</b> ${question}
        <br>
        <small>${new Date().toLocaleTimeString()}</small>
    </div>
    `;


    document.getElementById("question").value = "";


    output.innerHTML = `
    FearlessAI is thinking
    <span class="dots">...</span>
    `;


    try {

        let response = await fetch("/ask", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                question: question
            })

        });


        let data = await response.json();


        chatHistory.innerHTML += `

        <div class="message ai-message">

            <b>FearlessAI:</b> ${data.answer}

            <br>

            <small>${new Date().toLocaleTimeString()}</small>

        </div>

        `;


        output.innerHTML = "";


    } catch(error) {


        output.innerHTML =
        "FearlessAI is offline right now.";


    }

}



function clearChat(){

    document.getElementById("chat-history").innerHTML="";
    document.getElementById("output").innerHTML="";

}



function openChat(){

    document.getElementById("question").focus();

}
