"use client";
import { Button } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800/50"
    >
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Kooper Propp
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="/#about" className="text-gray-300 hover:text-blue-400 transition-colors">About</a>
            <a href="/#education" className="text-gray-300 hover:text-blue-400 transition-colors">Education</a>
            <a href="/#experience" className="text-gray-300 hover:text-blue-400 transition-colors">Experience</a>
            <a href="/#projects" className="text-gray-300 hover:text-blue-400 transition-colors">Projects</a>
            <a href="/#skills" className="text-gray-300 hover:text-blue-400 transition-colors">Skills</a>
            <Button
              onClick={() => router.push("/contact")}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
            >
              Contact
            </Button>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-300 hover:text-blue-400 transition-colors">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar; 