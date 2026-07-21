console.log("FearlessAI V4 Loaded");


const input = document.querySelector(".message-input");
const sendBtn = document.querySelector(".send");
const messages = document.querySelector(".messages");
const newChatBtn = document.querySelector(".new-chat");
const attachBtn = document.querySelector(".icon-btn");


function addMessage(text,type){

    const msg = document.createElement("div");

    msg.className = "message " + type;


    msg.innerHTML = `

        <div class="avatar ${type}">
            ${type === "user" ? "U" : "⚡"}
        </div>


        <div class="bubble">

            ${text}

            <div class="message-time">
                ${new Date().toLocaleTimeString()}
            </div>

        </div>

    `;


    messages.appendChild(msg);

    messages.scrollTop = messages.scrollHeight;

}



function sendMessage(){

    const text = input.value.trim();


    if(!text) return;


    document.querySelector(".welcome")?.remove();


    addMessage(text,"user");


    input.value="";


    // Temporary AI reply

    setTimeout(()=>{

        addMessage(
        "⚡ FearlessAI received your message. Real AI connection coming next.",
        "ai"
        );

    },800);

}



sendBtn.addEventListener(
"click",
sendMessage
);



input.addEventListener(
"keydown",
(e)=>{

    if(e.key==="Enter"){

        sendMessage();

    }

});




// NEW CHAT BUTTON

newChatBtn.addEventListener(
"click",
()=>{

    messages.innerHTML = `

    <div class="welcome">

    <h1>
    Welcome to <span>FearlessAI</span>
    </h1>

    <p>
    Ask anything, create, learn and build.
    </p>

    </div>

    `;

});




// ATTACH BUTTON

attachBtn.addEventListener(
"click",
()=>{

    const fileInput=document.createElement("input");

    fileInput.type="file";


    fileInput.click();


    fileInput.onchange=()=>{

        if(fileInput.files[0]){

            addMessage(
            "📎 Uploaded: "+fileInput.files[0].name,
            "user"
            );

        }

    };

});




// CHAT HISTORY BUTTONS

document.querySelectorAll(".chat-item")
.forEach(item=>{


    item.addEventListener(
    "click",
    ()=>{

        addMessage(
        "Opened "+item.innerText,
        "ai"
        );

    });


});
