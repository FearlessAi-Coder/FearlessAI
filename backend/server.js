const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("FearlessAI backend is running!");
});

app.post("/ask", (req, res) => {

    const question = req.body.question;

    res.json({
        answer: "FearlessAI received: " + question
    });

});

app.listen(3000, () => {
    console.log("FearlessAI server running on port 3000");
});
