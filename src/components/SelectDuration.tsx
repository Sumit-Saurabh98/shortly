"use client";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const SelectDuration = ({ onUserSelect }: { onUserSelect: (key: string, value: string) => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-4 md:px-20 py-6"
    >
      <div className="flex items-center gap-2 mb-2">
        <Clock className="w-6 h-6 text-purple-300" />
        <h2 className="font-bold text-2xl text-white">Duration</h2>
      </div>
      <p className="text-purple-200 mb-4">Select the duration of your video</p>

      <Select
        onValueChange={(value) => {
          onUserSelect("duration", value);
        }}
      >
        <SelectTrigger className="w-full bg-white/20 border-purple-300 text-white p-3">
          <SelectValue placeholder="Select Duration" />
        </SelectTrigger>
        <SelectContent className="bg-purple-800 text-white">
          <SelectItem 
            value="30" 
            className="hover:bg-purple-700 cursor-pointer py-3"
          >
            30 Seconds
          </SelectItem>
          <SelectItem 
            value="60" 
            className="hover:bg-purple-700 cursor-pointer py-3"
          >
            60 Seconds
          </SelectItem>
        </SelectContent>
      </Select>
    </motion.div>
  );
};

export default SelectDuration;