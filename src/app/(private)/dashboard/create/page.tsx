"use client";
import { motion } from "framer-motion";
import { Video, Sparkles } from "lucide-react";
import SelectDuration from "@/components/SelectDuration";
import SelectStyle from "@/components/SelectStyle";
import SelectTopic from "@/components/SelectTopic";
import { useState } from "react";
import axios from "axios";
import CustomLoading from "@/components/CustomLoading";

export default function Page() {
  const [formData, setFormData] = useState({
    duration: "",
    imageStyle: "",
    topic: "",
  });

  interface IVideoScriptWithImagePrompt {
    contentText: string;
    imagePrompt: string;
  }

  const [loading, setLoading] = useState<boolean>(false);
  const [videoScriptWithImagePrompt, setVideoScriptWithImagePrompt] = useState<
    IVideoScriptWithImagePrompt[]
  >([]);
  const [audioFileUrl, setAudioFileUrl] = useState<string>("");

  const onHandleInputChange = (fieldName: string, fieldValue: string) => {
    setFormData({ ...formData, [fieldName]: fieldValue });
  };

  // get video script

  const getVideoScript = async () => {
    try {
      setLoading(true);
      const prompt =
        "write a script to generate " +
        formData.duration +
        " seconds video on topic : " +
        formData.topic +
        " story along with AI image prompts in " +
        formData.imageStyle +
        " format for each scene and give me result in json format with imagePrompt and contentText as field, No plain text.";

      const res = await axios
        .post("/api/get-video-script", {
          prompt: prompt,
        })
          // console.log(res.data.result);
          setVideoScriptWithImagePrompt(res.data.result);
          GenerateAudioFile(res.data.result);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }finally{
      setLoading(false);
    }
  };

  const GenerateAudioFile = async (
    videoScriptData: IVideoScriptWithImagePrompt[]
  ) => {
    try {
      setLoading(true);
      let script = "";
      videoScriptData.forEach((item) => {
        script += item.contentText + " ";
      });

      const response = await axios.post("/api/generate-audio", {
        text: script,
        languageCode: "hi-IN",
        ssmlGender: "FEMALE",
      });

      setAudioFileUrl(response.data.audioUrl);

      setLoading(false);
    } catch (error) {
      console.log("Error while generating audio", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const onCreateClickHandler = () => {
    getVideoScript();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-purple-400 via-purple-600 to-purple-800"
    >
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 flex items-center justify-center gap-2">
            Create Now <Sparkles className="w-8 h-8" />
          </h1>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 max-w-4xl mx-auto"
        >
          <SelectTopic onUserSelect={onHandleInputChange} />
          <SelectStyle onUserSelect={onHandleInputChange} />
          <SelectDuration onUserSelect={onHandleInputChange} />

          <motion.button
            onClick={onCreateClickHandler}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full mt-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-8 rounded-lg font-bold text-lg flex items-center justify-center gap-2"
          >
            <Video className="w-6 h-6" />
            Create Video
          </motion.button>
        </motion.div>
      </div>
      <CustomLoading loading={loading} />
    </motion.div>
  );
}

/*
write a script to generate 30 seconds video on topic : interesting historical story along with AI image prompts in Realistic format for each scene and give me result in json format with imagePrompt and contentText as field, No plain text.
*/