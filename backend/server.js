const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


app.post("/ask", async (req, res) => {

  try {

    const question = req.body.question;


    const response = await client.responses.create({

      model: "gpt-4.1-mini",

      input: question

    });


    res.json({

      answer: response.output_text

    });


  } catch (error) {

    console.log(error);

    res.status(500).json({

      answer: "FearlessAI is having trouble connecting."

    });

  }

});


app.listen(3000, () => {

  console.log("FearlessAI backend running on port 3000");

});
