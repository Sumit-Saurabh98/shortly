"use client";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import Link from "next/link";

const NoItems = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 flex items-center justify-center px-4"
    >
      <div className="relative w-full max-w-md">
        <motion.div
          className="
            bg-gradient-to-br from-purple-500 to-purple-600
            p-6 md:p-8 rounded-2xl
            shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]
            text-center text-white
          "
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-xl md:text-2xl font-semibold mb-6">
            Welcome to Shortly. No items available.
          </h1>
          
          <Link href="/dashboard/create">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="
                inline-flex items-center gap-2
                px-6 py-3
                bg-white text-purple-700
                rounded-lg shadow-md
                font-medium text-sm
                hover:bg-gray-50
                transition-colors
              "
            >
              <Plus className="w-4 h-4" />
              Create New
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NoItems;