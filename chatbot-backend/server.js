import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const chatCompletion =
      await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              "You are Bazaz Tech AI Assistant. Answer questions about web development, AI automation, digital marketing, training programs and business services."
          },
          {
            role: "user",
            content: message
          }
        ],
        model: "llama-3.3-70b-versatile",
      });

    res.json({
      reply: chatCompletion.choices[0].message.content,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: error.message,
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

// Llama 3.3 70B Model AI