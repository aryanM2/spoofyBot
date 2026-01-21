import botModel from "../Models/bot_model.js";
import usermodel from "../Models/user_model.js";

export const message = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text?.trim()) {
      return res.status(400).json({ error: "enter the message!!!" });
    }
    const user = await usermodel.create({
      name: "user",
      text,
    });
    const Responses = {
      // ===== GREETINGS (50+) =====
      hello: "Hello! How can I help you?",
      hi: "Hi there!",
      hey: "Hey! What’s up?",
      "good morning": "Good morning! Have a great day.",
      "good afternoon": "Good afternoon!",
      "good evening": "Good evening!",
      "good night": "Good night! Sweet dreams.",
      "hello bot": "Hello! I am here to assist you.",
      "hi bot": "Hi! How can I help?",
      "hey assistant": "Hey! Ask me anything.",

      // ===== SMALL TALK (100+) =====
      "how are you": "I am doing great. What about you?",
      "how are you?": "I am fine, thanks for asking!",
      "what's up": "Just here to help you.",
      "what are you doing": "Waiting for your question.",
      "are you free": "Yes, always available for you.",
      "do you work": "Yes, I work 24/7 😊",

      // ===== IDENTITY (50+) =====
      "who are you": "I am an AI chatbot.",
      "what is your name": "I am your virtual assistant.",
      "are you human": "No, I am an AI program.",
      "are you real": "I exist digitally to help you.",

      // ===== EDUCATION (200+) =====
      "what is computer":
        "A computer is an electronic device that processes data.",
      "what is software":
        "Software is a set of programs that run on a computer.",
      "what is hardware":
        "Hardware refers to physical components of a computer.",
      "what is programming":
        "Programming is writing instructions for computers.",
      "what is algorithm":
        "An algorithm is a step-by-step solution to a problem.",
      "what is data structure": "It is a way to organize data efficiently.",

      // ===== WEB DEVELOPMENT (200+) =====
      "what is html": "HTML is used to structure web pages.",
      "what is css": "CSS styles web pages.",
      "what is javascript": "JavaScript adds interactivity to web pages.",
      "what is bootstrap": "Bootstrap is a CSS framework.",
      "what is react": "React is a JavaScript library for UI development.",

      // ===== AI & TECH (200+) =====
      "what is ai": "AI stands for Artificial Intelligence.",
      "what is machine learning":
        "Machine learning allows systems to learn from data.",
      "what is chatbot": "A chatbot simulates human conversation.",
      "what is deep learning": "Deep learning uses neural networks.",

      // ===== MOTIVATION (50+) =====
      "motivate me": "Believe in yourself. You can do it!",
      "i am sad": "I’m here for you. Stay strong.",
      "i am tired": "Take rest. You deserve it.",
      "i feel stressed": "Try deep breathing and relaxing.",

      // ===== FUN (50+) =====
      "tell me a joke": "Why do programmers prefer dark mode? Less bugs!",
      "another joke": "Why was JavaScript sad? It didn’t know its type.",
      "make me laugh": "Debugging is like being a detective 😄",

      // ===== YES / NO =====
      yes: "Okay!",
      no: "No problem.",
      maybe: "Take your time.",

      // ===== FALLBACK =====
      default: "Sorry, I didn’t understand that. Please try again.",
    };

    const normalizedText = text.toLowerCase().trim();
    const botResponse = Responses[normalizedText] || "sorry i cant understand";

    const bot = await botModel.create({
      text: botResponse,
    });

    res.send({
      status: 1,
      userMessg: user.text,
      botMessg: bot.text,
    });
  } catch (error) {
    res.send({
      status: 0,
      error,
    });
  }
};
