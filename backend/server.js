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

// Render provides the port automatically
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`FearlessAI server running on port ${PORT}`);
});
