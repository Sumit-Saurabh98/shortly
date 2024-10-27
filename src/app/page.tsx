"use client";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import PricingSection from "@/components/PricingSection";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

export default function LandingPage() {
  const { user } = useUser();

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const pricingRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    setIsMenuOpen(false);
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      {/* Navbar */}

      <Navbar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        scrollToSection={scrollToSection}
        pricingRef={pricingRef}
      />

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-24 pb-8 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-8">
              <motion.h1
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white"
              >
                Create Amazing Videos with AI
                <Sparkles className="inline-block ml-2 h-8 w-8" />
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg sm:text-xl text-purple-100"
              >
                Transform your ideas into captivating short videos in minutes.
                Powered by advanced AI, designed for creators like you.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                {user ? (
                  <Link href="/dashboard">
                    <button className="px-8 py-4 bg-white text-purple-600 rounded-lg font-bold hover:bg-purple-100 transition-colors">
                      Dashboard
                    </button>
                  </Link>
                ) : (
                  <Link href="/sign-in">
                    <button className="px-8 py-4 bg-white text-purple-600 rounded-lg font-bold hover:bg-purple-100 transition-colors">
                      Start Creating
                    </button>
                  </Link>
                )}
                <button className="px-8 py-4 border-2 border-white text-white rounded-lg font-bold hover:bg-white/10 transition-colors">
                  Watch Demo
                </button>
              </motion.div>
            </div>

            {/* Right Column - Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden"
            >
              {/* <div className="absolute inset-0 opacity-85"> */}
              <Image
                src="/landing.jpg"
                alt="AI Video Generation"
                fill
                className="object-cover rounded-2xl"
                priority
              />
              {/* </div> */}
            </motion.div>
          </div>
        </div>

        {/* <PricingSection/> */}
      </motion.div>
      <motion.div ref={pricingRef}>
        <PricingSection />
      </motion.div>
    </div>
  );
}
