"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";

export function HeroSection() {
  const words = [
    { text: "融合" },
    { text: "技术洞察", className: "text-[hsl(var(--secondary))]" },
    { text: "与" },
    { text: "产品思维", className: "text-[hsl(var(--primary))]" },
    { text: "的"},
    { text: "AI一线冲浪者🏄", className: "text-[hsl(var(--impressionist-blue))]" },
    { text: "创新实践 + 超强执行力 = AI时代新产品", className: "text-[hsl(var(--accent))]"},
  ];

  // Define shape props structure for type safety
  interface Shape {
    type: 'circle' | 'triangle' | 'rectangle' | 'blob';
    width: number;
    height: number;
    left: string;
    top: string;
    rotation: number;
    duration: number;
    color: string;
    zIndex: number;
  }
  
  const [shapes, setShapes] = useState<Shape[]>([]);

  // Generate geometric shapes only on the client side to avoid hydration issues
  useEffect(() => {
    // Headspace风格的柔和颜色
    const headspaceColors = [
      'hsla(var(--impressionist-blue) / 0.15)',
      'hsla(var(--impressionist-green) / 0.15)',
      'hsla(var(--impressionist-yellow) / 0.15)',
      'hsla(var(--impressionist-pink) / 0.15)',
      'hsla(var(--impressionist-purple) / 0.15)',
      'hsla(var(--primary) / 0.15)',
      'hsla(var(--secondary) / 0.15)',
      'hsla(var(--accent) / 0.15)',
    ];
    
    // 创建大型几何形状，类似Headspace风格
    const shapes: Shape[] = [
      // 大圆形
      {
        type: 'circle',
        width: 400,
        height: 400,
        left: '75%',
        top: '20%',
        rotation: 0,
        duration: 20,
        color: headspaceColors[0],
        zIndex: 1
      },
      // 矩形
      {
        type: 'rectangle',
        width: 200,
        height: 300,
        left: '10%',
        top: '60%',
        rotation: 15,
        duration: 25,
        color: headspaceColors[1],
        zIndex: 1
      },
      // 三角形
      {
        type: 'triangle',
        width: 250,
        height: 250,
        left: '20%',
        top: '15%',
        rotation: -10,
        duration: 22,
        color: headspaceColors[2],
        zIndex: 1
      },
      // 不规则形状
      {
        type: 'blob',
        width: 350,
        height: 350,
        left: '65%',
        top: '65%',
        rotation: 5,
        duration: 30,
        color: headspaceColors[3],
        zIndex: 1
      },
      // 额外的形状
      {
        type: 'circle',
        width: 200,
        height: 200,
        left: '40%',
        top: '80%',
        rotation: 0,
        duration: 18,
        color: headspaceColors[4],
        zIndex: 2
      },
      {
        type: 'rectangle',
        width: 150,
        height: 100,
        left: '50%',
        top: '30%',
        rotation: -20,
        duration: 23,
        color: headspaceColors[5],
        zIndex: 2
      },
    ];
    
    setShapes(shapes);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center bg-white overflow-hidden">
      {/* 背景动画元素 - 白色背景下的细微纹理 */}
      <div className="absolute inset-0 w-full h-full bg-grid-small-white/[0.08] -z-10" />
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,white)]"></div>
      
      {/* Headspace风格的几何形状背景元素 */}
      <div className="absolute inset-0 overflow-hidden">
        {shapes.map((shape, i) => {
          // 根据形状类型返回不同的组件
          if (shape.type === 'circle') {
            return (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: shape.width,
                  height: shape.height,
                  left: shape.left,
                  top: shape.top,
                  background: shape.color,
                  zIndex: shape.zIndex,
                }}
                initial={{ opacity: 0.8, rotate: shape.rotation }}
                animate={{
                  opacity: [0.8, 1, 0.8],
                  rotate: [shape.rotation, shape.rotation + 2, shape.rotation],
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: shape.duration,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              />
            );
          } else if (shape.type === 'rectangle') {
            return (
              <motion.div
                key={i}
                className="absolute rounded-lg"
                style={{
                  width: shape.width,
                  height: shape.height,
                  left: shape.left,
                  top: shape.top,
                  background: shape.color,
                  zIndex: shape.zIndex,
                }}
                initial={{ opacity: 0.8, rotate: shape.rotation }}
                animate={{
                  opacity: [0.8, 1, 0.8],
                  rotate: [shape.rotation, shape.rotation - 2, shape.rotation],
                  scale: [1, 1.03, 1],
                }}
                transition={{
                  duration: shape.duration,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              />
            );
          } else if (shape.type === 'triangle') {
            return (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  width: 0,
                  height: 0,
                  left: shape.left,
                  top: shape.top,
                  borderLeft: `${shape.width / 2}px solid transparent`,
                  borderRight: `${shape.width / 2}px solid transparent`,
                  borderBottom: `${shape.height}px solid ${shape.color}`,
                  zIndex: shape.zIndex,
                }}
                initial={{ opacity: 0.8, rotate: shape.rotation }}
                animate={{
                  opacity: [0.8, 1, 0.8],
                  rotate: [shape.rotation, shape.rotation + 3, shape.rotation],
                }}
                transition={{
                  duration: shape.duration,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              />
            );
          } else if (shape.type === 'blob') {
            // 使用SVG创建不规则的blob形状
            return (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  width: shape.width,
                  height: shape.height,
                  left: shape.left,
                  top: shape.top,
                  zIndex: shape.zIndex,
                }}
                initial={{ opacity: 0.8, rotate: shape.rotation }}
                animate={{
                  opacity: [0.8, 1, 0.8],
                  rotate: [shape.rotation, shape.rotation - 2, shape.rotation],
                  scale: [1, 1.04, 1],
                }}
                transition={{
                  duration: shape.duration,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              >
                <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    fill={shape.color}
                    d="M42.8,-62.2C54.9,-54.3,63.8,-40.9,69.5,-26.2C75.2,-11.5,77.7,4.5,74.3,19.6C70.9,34.7,61.6,48.9,48.7,57.4C35.9,65.9,19.5,68.7,3.2,64.8C-13,60.9,-26.1,50.3,-37.5,39.3C-48.9,28.2,-58.8,16.8,-62.9,3.4C-67,-10,-65.4,-25,-58.3,-36.2C-51.2,-47.4,-38.6,-54.8,-25.8,-62C-13,-69.2,0,-76.1,13.7,-75.1C27.3,-74.1,54.7,-65.2,54.7,-65.2"
                    transform="translate(100 100)"
                  />
                </svg>
              </motion.div>
            );
          }
          return null;
        })}
      </div>
      
      {/* 素雅的暖色调背景光晕 - Headspace风格 */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-[hsl(var(--impressionist-pink))] rounded-full blur-[120px] opacity-[0.07] -z-5" />
      <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-[hsl(var(--impressionist-blue))] rounded-full blur-[100px] opacity-[0.07] -z-5" />
      
      {/* 主内容 */}
      <div className="container px-4 md:px-6 z-10">
        <div className="flex flex-col items-center space-y-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-gray-800 drop-shadow-sm">
              Hello啊!🤓 我是文森特
            </h1>
            <p className="mt-2 text-xl md:text-2xl text-gray-600">
              AI产品 | 算法研究者 | 全栈开发者 | 风味探险家☕️
            </p>
          </motion.div>
          
          <div className="h-20">
            <TypewriterEffect words={words} className="text-lg md:text-2xl" noLoop={true} />
          </div>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button size="lg" className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] hover:from-[hsl(var(--primary))] hover:to-[hsl(var(--primary))] border-none shadow-lg shadow-primary/20 text-white">
              查看我的项目 <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Button>
            
            <Button variant="outline" size="lg" className="border-[hsl(var(--accent))] text-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))] hover:text-white">
              联系我
            </Button>
          </motion.div>
          
          <motion.div 
            className="flex gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button variant="ghost" size="icon" className="rounded-full text-gray-700 hover:bg-[hsl(var(--impressionist-pink))/0.2] hover:text-[hsl(var(--primary))]">
              <GitHubLogoIcon className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full text-gray-700 hover:bg-[hsl(var(--impressionist-blue))/0.2] hover:text-[hsl(var(--impressionist-blue))]">
              <LinkedInLogoIcon className="h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
