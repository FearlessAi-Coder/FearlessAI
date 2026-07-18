function askAI(){

let question = document.getElementById("question").value;

let output = document.getElementById("output");


if(question === ""){
    output.innerHTML = "Ask me something first!";
}
else{

output.innerHTML = "FearlessAI is thinking...";

setTimeout(function(){

output.innerHTML = 
"FearlessAI received: " + question;

},1000);

}

}
