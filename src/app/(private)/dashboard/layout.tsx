"use client"
import React, { ReactNode, useEffect, useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import TopHeader from "@/components/TopHeader";

const Layout = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth); 
    };

    window.addEventListener("resize", handleResize); 
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-purple-500">
      <TopHeader
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        windowWidth={windowWidth}
      />
      <Header isSidebarOpen={isSidebarOpen} activeItem={activeItem} />
        <Sidebar 
        isSidebarOpen={isSidebarOpen} 
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />
      <div className={`
        pt-28 px-4 
        transition-all duration-300
        md:ml-64
      `}>
        {React.Children.map(children, child => {
          return React.cloneElement(child as React.ReactElement<any>, { isSidebarOpen });
        })}
      </div>
    </div>
  );
};

export default Layout;