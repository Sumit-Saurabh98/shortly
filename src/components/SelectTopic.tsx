"use client";
import { motion } from "framer-motion";
import { BookOpen, Sparkles } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "./ui/textarea";
import { useState } from "react";

const SelectTopic = ({ onUserSelect }: { onUserSelect: (key: string, value: string) => void }) => {
  const options = [
    "Custom prompt",
    "Random AI story",
    "Scary story",
    "Historical story",
    "Bed time story",
    "Motivation",
    "Fun facts",
  ];
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-4 md:px-20 py-6"
    >
      <div className="flex items-center gap-2 mb-2">
        <BookOpen className="w-6 h-6 text-purple-300" />
        <h2 className="font-bold text-2xl text-white">Content</h2>
      </div>
      <p className="text-purple-200 mb-4">What is the topic of your video?</p>

      <Select
        onValueChange={(value) => {
          setSelectedOption(value);
          value !== "Custom prompt" && onUserSelect("topic", value);
        }}
      >
        <SelectTrigger className="w-full bg-white/20 border-purple-300 text-white">
          <SelectValue placeholder="Select a topic" />
        </SelectTrigger>
        <SelectContent className="bg-purple-800 text-white">
          {options.map((option: string) => (
            <SelectItem 
              key={option} 
              value={option}
              className="hover:bg-purple-700 cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                {option}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedOption === "Custom prompt" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Textarea
            onChange={(e) => onUserSelect("topic", e.target.value)}
            className="mt-4 bg-white/20 border-purple-300 text-white placeholder-purple-300"
            placeholder="Write your prompt to generate the video"
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default SelectTopic;