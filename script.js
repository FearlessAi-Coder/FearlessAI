/* ==========================================
   FEARLESSAI V4
   SCRIPT PART 2
   REAL BACKEND CONNECTION
========================================== */

const input = document.querySelector(".chatbar input");
const sendButton = document.querySelector(".send");
const messages = document.querySelector(".messages");


function getTime(){

    return new Date().toLocaleTimeString([], {
        hour:"2-digit",
        minute:"2-digit"
    });

}


function createMessage(text,type){

    const wrapper = document.createElement("div");

    wrapper.className = `message ${type}`;


    wrapper.innerHTML = `

        <div class="avatar ${type}">
            ${type === "user" ? "U" : "⚡"}
        </div>

        <div class="bubble">

            <p>${text}</p>

            <div class="message-time">
                ${getTime()}
            </div>

        </div>

    `;


    messages.appendChild(wrapper);

    messages.scrollTop = messages.scrollHeight;

}



function showTyping(){

    const typing = document.createElement("div");

    typing.className = "message ai";

    typing.id = "typing";


    typing.innerHTML = `

        <div class="avatar ai">
            ⚡
        </div>

        <div class="bubble">

            <div class="typing">

                <span></span>
                <span></span>
                <span></span>

            </div>

        </div>

    `;


    messages.appendChild(typing);

    messages.scrollTop = messages.scrollHeight;

}



function removeTyping(){

    document.getElementById("typing")?.remove();

}



async function sendMessage(){

    const text = input.value.trim();


    if(!text) return;


    document.querySelector(".welcome")?.remove();


    createMessage(text,"user");


    input.value = "";


    showTyping();


    try{


        const response = await fetch(
            "http://localhost:3000/chat",
            {

                method:"POST",

                headers:{

                    "Content-Type":"application/json"

                },


                body:JSON.stringify({

                    message:text

                })

            }

        );


        const data = await response.json();


        removeTyping();


        createMessage(
            data.reply || "No response received.",
            "ai"
        );


    }


    catch(error){


        removeTyping();


        createMessage(
            "⚠️ FearlessAI couldn't connect to the server.",
            "ai"
        );


        console.error(error);


    }


}



sendButton.addEventListener(
    "click",
    sendMessage
);



input.addEventListener(
    "keydown",
    (e)=>{

        if(e.key==="Enter"){

            sendMessage();

        }

    }
);
