"use client";
import { motion } from "framer-motion";
import Image from 'next/image';
import { Paintbrush } from 'lucide-react';
import { useState } from 'react';

const SelectStyle = ({ onUserSelect }: { onUserSelect: (key: string, value: string) => void }) => {
  const [selectedStyle, setSelectedStyle] = useState("");

  const styleOptions = [
    { name: "Realistic", image: "/temp.webp" },
    { name: "Cartoon", image: "/cartoon.jpg" },
    { name: "Comic", image: "/comic.png" },
    { name: "Nature", image: "/nature.jpg" },
    { name: "Games", image: "/games.png" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-4 md:px-20 py-6"
    >
      <div className="flex items-center gap-2 mb-2">
        <Paintbrush className="w-6 h-6 text-purple-300" />
        <h2 className="font-bold text-2xl text-white">Style</h2>
      </div>
      <p className="text-purple-200 mb-4">Select your video style</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {styleOptions.map((option) => (
          <motion.div
            key={option.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              relative overflow-hidden rounded-lg cursor-pointer
              ${selectedStyle === option.name ? 'ring-4 ring-white' : ''}
            `}
            onClick={() => {
              setSelectedStyle(option.name);
              onUserSelect("imageStyle", option.name);
            }}
          >
            <div className="aspect-square relative">
              <Image
                src={option.image}
                alt={option.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw"
                style={{ objectFit: "cover" }}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent" />
              <h3 className="absolute bottom-2 left-2 text-lg font-medium text-white">
                {option.name}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SelectStyle;