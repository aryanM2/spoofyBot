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

    const Responses = [
      // ===== GREETINGS =====
      {
        name: "greetings",
        keywords: ["hello", "hi", "hey", "good morning", "good evening"],
        response: "Hello! How can I help you?",
      },

      // ===== SMALL TALK =====
      {
        name: "small_talk",
        keywords: ["how are you", "how r u", "what's up", "how is it going"],
        response: "I am doing great! What about you?",
      },

      // ===== IDENTITY =====
      {
        name: "identity",
        keywords: [
          "who are you",
          "what is your name",
          "your name",
          "are you human",
        ],
        response: "I am an AI chatbot created to assist you.",
      },

      // ===== PROJECT INFO =====
      {
        name: "project_info",
        keywords: [
          "what is this project",
          "about this project",
          "project description",
        ],
        response: "This is a chatbot developed as a college project.",
      },

      // ===== TECHNOLOGY USED =====
      {
        name: "technology",
        keywords: ["technology used", "tools used", "programming language"],
        response: "This project uses HTML, CSS, JavaScript, and JSON.",
      },

      // ===== CHATBOT WORKING =====
      {
        name: "working",
        keywords: [
          "how does this work",
          "how chatbot works",
          "working of chatbot",
        ],
        response: "The chatbot works using rule-based and intent-based logic.",
      },

      // ===== FEATURES =====
      {
        name: "features",
        keywords: ["features", "what can you do", "chatbot features"],
        response: "I can answer FAQs, assist users, and respond instantly.",
      },

      // ===== ADVANTAGES =====
      {
        name: "advantages",
        keywords: ["advantages", "benefits", "why chatbot is useful"],
        response: "It saves time, reduces human effort, and is available 24/7.",
      },

      // ===== LIMITATIONS =====
      {
        name: "limitations",
        keywords: ["limitations", "disadvantages", "drawbacks"],
        response:
          "I depend on predefined data and cannot answer unknown questions.",
      },

      // ===== FUTURE SCOPE =====
      {
        name: "future_scope",
        keywords: ["future scope", "future improvement", "upgrade project"],
        response:
          "In the future, I can be enhanced using machine learning and NLP.",
      },

      // ===== EDUCATION =====
      {
        name: "education",
        keywords: [
          "what is programming",
          "what is coding",
          "learn programming",
        ],
        response:
          "Programming is the process of writing instructions for computers.",
      },

      // ===== WEB DEVELOPMENT =====
      {
        name: "web_dev",
        keywords: ["what is html", "what is css", "what is javascript"],
        response:
          "HTML structures, CSS styles, and JavaScript adds logic to web pages.",
      },

      // ===== CAREER =====
      {
        name: "career",
        keywords: ["career in it", "software jobs", "become developer"],
        response:
          "You can start by learning programming and building projects.",
      },

      // ===== MOTIVATION =====
      {
        name: "motivation",
        keywords: ["motivate me", "i am sad", "i feel tired", "i am stressed"],
        response: "Stay positive. You are doing great and will succeed.",
      },

      // ===== FUN / JOKES =====
      {
        name: "jokes",
        keywords: ["joke", "tell me a joke", "make me laugh"],
        response:
          "Why do programmers love dark mode? Because light attracts bugs!",
      },

      // ===== TIME =====
      {
        name: "time",
        keywords: ["what time is it", "current time"],
        response: "Please check your device for the current time.",
      },

      // ===== THANK YOU =====
      {
        name: "thanks",
        keywords: ["thank you", "thanks", "thx"],
        response: "You're welcome! Happy to help 😊",
      },

      // ===== FAREWELL =====
      {
        name: "farewell",
        keywords: ["bye", "goodbye", "see you", "exit"],
        response: "Goodbye! Have a great day.",
      },
    ];

    const normalizedText = text.toLowerCase().trim();

    let botResponse = "Sorry, I didn’t understand that. Please try again.";

    for (const intent of Responses) {
      for (const keyword of intent.keywords) {
        if (normalizedText.includes(keyword)) {
          botResponse = intent.response;
          break;
        }
      }
    }

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
