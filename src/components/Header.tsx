"use client";
import React from 'react';
import { motion } from "framer-motion";
import { Plus } from 'lucide-react';
import Link from 'next/link';

const Header = ({
  isSidebarOpen,
  activeItem
}: {
  isSidebarOpen: boolean;
  activeItem: string;
}) => {
  return (
    <motion.div
      className={`
        fixed top-16 right-0 z-40 h-16
        transition-all duration-300
        bg-gradient-to-r from-purple-500 to-purple-600
        ${isSidebarOpen ? "md:left-64" : "left-0"}
      `}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="flex items-center justify-between w-full h-full px-4 md:px-6 md:pl-72">
        <h1 className="text-xl font-semibold text-white">{activeItem}</h1>
        <Link href="/dashboard/create">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white text-purple-700 rounded-md hover:bg-gray-100 shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Create New</span>
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default Header;