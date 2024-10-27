"use client";
import { UserButton } from "@clerk/nextjs";
import { AnimatePresence, motion } from "framer-motion";
import {
  Coins,
  Crown,
  LayoutDashboard,
  Menu,
  Plus,
  PlusCircle,
  UserCog,
  X,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Page() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeItem, setActiveItem] = useState("Dashboard");

  const menuItems = [
    { icon: <LayoutDashboard className="w-5 h-5" />, label: "Dashboard" },
    { icon: <PlusCircle className="w-5 h-5" />, label: "Create New" },
    { icon: <Crown className="w-5 h-5" />, label: "Upgrade" },
    { icon: <UserCog className="w-5 h-5" />, label: "Account" },
  ];

  const videos = Array(16).fill({
    title: "Video Project",
    date: "2024-10-28",
  });

  const sidebarVariants = {
    open: {
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    closed: {
      x: "-100%",
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  const menuItemVariants = {
    hover: {
      scale: 1.02,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      transition: { type: "spring", stiffness: 400, damping: 17 },
    },
  };

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
      {/* Navbar */}
      <motion.nav
        className="bg-gradient-to-br from-indigo-400 via-purple-400 to-purple-500 border-b fixed w-full top-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="px-4 mx-auto max-w-7xl">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-md lg:hidden text-white"
              >
                {isSidebarOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </motion.button>
              <motion.span
                className="text-xl font-bold text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                VideoAI
              </motion.span>
            </div>

            <div className="flex items-center gap-4">
              <motion.div
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <Coins className="w-5 h-5 text-white" />
                <span className="font-medium text-white">2,500</span>
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 text-sm font-medium bg-white text-purple-700 rounded-md hover:bg-gray-100"
              >
                Dashboard
              </motion.button>
              <motion.div
                className="rounded-full flex items-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <UserButton />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Header */}
      <motion.div
        className={`fixed top-16 right-0 z-40 h-16 ${
          isSidebarOpen ? "left-64" : "left-0"
        } transition-all duration-300 bg-purple-500`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center justify-between h-full px-6">
          <h1 className="text-xl font-semibold text-white">{activeItem}</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white text-purple-700 rounded-md hover:bg-gray-100"
          >
            <Plus className="w-4 h-4" />
            Create New
          </motion.button>
        </div>
      </motion.div>

      <div className="flex pt-32">
        {/* Sidebar */}
        <AnimatePresence>
          {(isSidebarOpen || window.innerWidth >= 1024) && (
            <motion.aside
              initial="closed"
              animate="open"
              exit="closed"
              variants={sidebarVariants}
              className="fixed inset-y-0 left-0 z-40 w-64 pt-16 lg:translate-x-0"
            >
              <div className="h-full text-white px-3 py-4 bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-600">
                <motion.ul
                  className="space-y-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {menuItems.map((item, index) => (
                    <motion.li key={index}>
                      <motion.button
                        onClick={() => {
                          setActiveItem(item.label);
                          // Reset background color for all items
                          menuItems.forEach((_, i) => {
                            const menuItem = document.getElementById(`menu-item-${i}`);
                            if (menuItem) {
                              menuItem.style.backgroundColor = '';
                            }
                          });
                          const selectedItem = document.getElementById(`menu-item-${index}`);
                          if (selectedItem) {
                            selectedItem.style.backgroundColor = 'white';
                          }
                        }}
                        id={`menu-item-${index}`} 
                        variants={menuItemVariants}
                        whileHover="hover"
                        className={`flex items-center w-full p-3 text-white rounded-lg ${
                          activeItem === item.label ? "bg-white/20" : ""
                        }`}
                      >
                        {item.icon}
                        <span className="ml-3">{item.label}</span>
                      </motion.button>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main content */}
        <motion.main
          className={`flex-1 p-4 transition-margin duration-300 ${
            isSidebarOpen ? "lg:ml-64" : ""
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {videos.map((video, index) => (
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
                    src="/api/placeholder/400/320"
                    alt="Video thumbnail"
                    fill
                    className="absolute inset-0 object-cover rounded-lg"
                  />
                </div>
                <h3 className="font-medium">{video.title}</h3>
                <p className="text-sm text-gray-500">{video.date}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.main>
      </div>
    </div>
  );
}
