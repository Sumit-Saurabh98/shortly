"use client";
import NoItems from "@/components/NoItems";
import { motion } from "framer-motion";
import Image from "next/image";

interface ChildComponentProps {
  isSidebarOpen: boolean;
}

export default function Page({ isSidebarOpen }: ChildComponentProps) {

  const videos = Array(16).fill({
    title: "Video Project",
    date: "2024-10-28",
  });

  const videoCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 260, damping: 20 },
    },
    hover: {
      y: -5,
      transition: { type: "spring", stiffness: 400, damping: 17 },
    },
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-purple-500">
      <div className="flex pt-5">
        <motion.main
          className={`flex-1 p-4 transition-margin duration-300 ${
            isSidebarOpen ? "lg:ml-64" : ""
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {videos.length > 2 ? (
              videos.map((video, index) => (
                <motion.div
                  key={index}
                  variants={videoCardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-white rounded-lg shadow"
                >
                  <div className="relative w-full pt-[177.78%] bg-gray-200 rounded-lg mb-4">
                    <Image
                      src="/temp.webp"
                      alt="Video thumbnail"
                      fill
                      className="absolute inset-0 object-cover rounded-lg"
                    />
                  </div>
                  <h3 className="font-medium">{video.title}</h3>
                  <p className="text-sm text-gray-500">{video.date}</p>
                </motion.div>
              ))
            ) : (
              <div className="flex justify-center items-center min-h-screen w-full top-1/2 ">
                <NoItems />
              </div>
            )}
          </motion.div>
        </motion.main>
      </div>
    </div>
  );
}
