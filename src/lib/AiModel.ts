const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};


  export const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "write a script to generate 30 seconds video on topic : interesting historical story along with AI image prompts in Realistic format for each scene and give me result in json format with imagePrompt and contentText as field, No plain text.\n"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n[\n  {\n    \"imagePrompt\": \"A bustling marketplace in ancient Rome, filled with people, carts, and animals. The sky is clear and blue, with the sun shining brightly. Render in a realistic style.\",\n    \"contentText\": \"Imagine ancient Rome, a city teeming with life, a crossroads of cultures, and the center of a vast empire. In this bustling marketplace, merchants hawk their wares, artisans ply their trades, and citizens go about their daily lives.\"\n  },\n  {\n    \"imagePrompt\": \"A portrait of a Roman soldier in full armor, standing proudly with a sword in hand. The background is a blurred image of a Roman battlefield, with smoke and dust filling the air. Render in a realistic style.\",\n    \"contentText\": \"Among them walks a Roman soldier, his armor gleaming in the sunlight. He has seen battles, endured hardship, and carries the weight of Rome's might on his shoulders.\"\n  },\n  {\n    \"imagePrompt\": \"A close-up of a small, intricate mosaic depicting a scene from Roman mythology. The colors are vibrant and detailed. Render in a realistic style.\",\n    \"contentText\": \"But even in this world of strength and power, there is beauty and artistry. Notice the intricate mosaic, a testament to the Roman love of art and storytelling.\"\n  },\n  {\n    \"imagePrompt\": \"A wide shot of the Colosseum in Rome, with a large crowd of people gathered around the arena. Render in a realistic style.\",\n    \"contentText\": \"The Colosseum, a monument to Roman engineering and grandeur, stands as a testament to the empire's might and its love of spectacle.\"\n  },\n  {\n    \"imagePrompt\": \"A scene inside the Colosseum, with gladiators fighting in the arena. The crowd is roaring with excitement. Render in a realistic style.\",\n    \"contentText\": \"Here, gladiators clashed in thrilling battles, captivating the crowd with their skill and bravery.\"\n  },\n  {\n    \"imagePrompt\": \"A panoramic view of the ruins of Pompeii, with Mount Vesuvius looming in the background. Render in a realistic style.\",\n    \"contentText\": \"But the Roman Empire was not invincible. The eruption of Mount Vesuvius buried the city of Pompeii in ash, preserving a snapshot of ancient life.\"\n  },\n  {\n    \"imagePrompt\": \"A close-up of a fresco depicting a scene from Roman daily life, showcasing the vibrant colors and details. Render in a realistic style.\",\n    \"contentText\": \"From the ruins, we can glimpse into the lives of ordinary Romans, their homes, their families, their hopes, and their dreams.\"\n  },\n  {\n    \"imagePrompt\": \"A dramatic shot of a Roman emperor in his throne room, surrounded by guards and advisors. The room is opulent and grand. Render in a realistic style.\",\n    \"contentText\": \"The Roman Empire was a complex and fascinating civilization, a story of power, ambition, and ultimately, of change.\"\n  }\n]\n```\n\n**Note:** \n\n- This script generates 8 scenes, which may be too short for a 30-second video.  You can add more scenes or expand existing ones to fill the time. \n-  The script can be modified to focus on a specific historical event or individual within the Roman Empire. \n- This script does not include voiceover or music, which you would need to add for a complete video."},
        ],
      },
    ],
  });
