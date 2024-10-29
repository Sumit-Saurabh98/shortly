"use client";
import React from "react";
import { motion } from "framer-motion";
import { Coins, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";

const TopHeader = ({
  isSidebarOpen,
  setIsSidebarOpen,
  windowWidth
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  windowWidth: number
}) => {
  return (
    <motion.nav
      className="bg-gradient-to-br from-indigo-400 via-purple-400 to-purple-500 border-b fixed w-full top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-md text-white hover:bg-white/20"
            >
              {isSidebarOpen && windowWidth < 750 ? (
                <X className="w-6 h-6" />
              ) : windowWidth < 750 ? ( 
                <Menu className="w-6 h-6" />
              ) : null}
            </motion.button>
            <Link href="/" className="flex items-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={100}
                  height={40}
                  priority
                  className="h-8 w-auto"
                />
              </motion.div>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <motion.div
              className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full"
              whileHover={{ scale: 1.05 }}
            >
              <Coins className="w-5 h-5 text-white" />
              <span className="font-medium text-white">2,500</span>
            </motion.div>

            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className=" px-4 py-2 text-sm font-medium bg-white text-purple-700 rounded-md hover:bg-gray-100"
              >
                Dashboard
              </motion.button>
            </Link>

            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <UserButton afterSignOutUrl="/" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default TopHeader;
