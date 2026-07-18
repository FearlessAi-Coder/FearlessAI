async function askAI(){

    let question = document.getElementById("question").value;
    let output = document.getElementById("output");

    if(question === ""){
        output.innerHTML = "Ask me something first!";
        return;
    }

    output.innerHTML = "FearlessAI is thinking...";

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

        output.innerHTML = data.answer;

    } catch(error) {

        output.innerHTML = "FearlessAI is offline right now.";

    }

}
