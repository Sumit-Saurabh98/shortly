import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

const Navbar = ({
  isMenuOpen,
  setIsMenuOpen,
  scrollToSection,
  pricingRef,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  scrollToSection: (ref: React.RefObject<HTMLElement>) => void;
  pricingRef: React.RefObject<HTMLDivElement>;
}) => {
  const { user } = useUser();
  return (
    <div>
      <nav className="fixed w-full top-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-2">
              <Image
                src="/logo.png"
                alt="Logo"
                width={100}
                height={100}
                className="w-30 h-30"
              />  
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-white hover:text-purple-200 transition-colors"
              >
                Features
              </a>
              {/* <a href="#pricing" className="text-white hover:text-purple-200 transition-colors">Pricing</a> */}
              <button
                onClick={() => scrollToSection(pricingRef)}
                className="text-white hover:text-purple-200 transition-colors"
              >
                Pricing
              </button>
              <a
                href="#about"
                className="text-white hover:text-purple-200 transition-colors"
              >
                About
              </a>
              {user ? (
                <UserButton />
              ) : (
                <Link href="/sign-in">
                  <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-purple-100 transition-colors">
                    Get Started
                  </button>
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-purple-200 transition-colors"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white/10 backdrop-blur-md"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="#features"
                className="block px-3 py-2 text-white hover:bg-purple-500/50 rounded-lg"
              >
                Features
              </a>
              <button
                onClick={() => scrollToSection(pricingRef)}
                className="w-full text-left px-3 py-2 text-white hover:bg-purple-500/50 rounded-lg"
              >
                Pricing
              </button>
              <a
                href="#about"
                className="block px-3 py-2 text-white hover:bg-purple-500/50 rounded-lg"
              >
                About
              </a>
              <button className="w-full text-left px-3 py-2 bg-white text-purple-600 rounded-lg font-medium hover:bg-purple-100">
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
