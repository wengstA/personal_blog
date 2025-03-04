"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";

export function HeroSection() {
  const words = [
    { text: "兼具" },
    { text: "人机交互" },
    { text: "学术背景" },
    { text: "与" },
    { text: "AI工程思维", className: "text-blue-500 dark:text-blue-400" },
    { text: "的" },
    { text: "复合型人才", className: "text-indigo-500 dark:text-indigo-400" },
  ];

  // Define bubble props structure for type safety
  interface Bubble {
    width: number;
    height: number;
    left: string;
    top: string;
    duration: number;
  }
  
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  // Generate bubbles only on the client side to avoid hydration issues
  useEffect(() => {
    const generatedBubbles = Array(20).fill(0).map(() => ({
      width: Math.random() * 200 + 50,
      height: Math.random() * 200 + 50,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: Math.random() * 5 + 10,
    }));
    setBubbles(generatedBubbles);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-950 to-blue-900 overflow-hidden">
      {/* 背景动画元素 */}
      <div className="absolute inset-0 w-full h-full bg-grid-white/[0.03] -z-10" />
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      
      {/* Tech elements - animated circles */}
      <div className="absolute inset-0 overflow-hidden">
        {bubbles.map((bubble, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-500/10 border border-blue-500/20"
            style={{
              width: bubble.width,
              height: bubble.height,
              left: bubble.left,
              top: bubble.top,
            }}
            initial={{ opacity: 0.1 }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: bubble.duration,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
      
      {/* Glowing accent */}
      <div className="absolute top-1/3 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-600/20 rounded-full blur-3xl" />
      
      {/* 主内容 */}
      <div className="container px-4 md:px-6 z-10">
        <div className="flex flex-col items-center space-y-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-white">
              翁诗彤
            </h1>
            <p className="mt-2 text-xl md:text-2xl text-gray-400">
              AI产品经理 | 算法研究者 | 全栈开发者
            </p>
          </motion.div>
          
          <div className="h-20">
            <TypewriterEffect words={words} className="text-lg md:text-2xl" />
          </div>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 border border-blue-400/20 shadow-lg shadow-blue-500/20">
              查看我的项目 <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Button>
            
            <Button variant="outline" size="lg" className="border-gray-700 text-gray-300 hover:text-white">
              联系我
            </Button>
          </motion.div>
          
          <motion.div 
            className="flex gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button variant="ghost" size="icon" className="rounded-full">
              <GitHubLogoIcon className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <LinkedInLogoIcon className="h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 