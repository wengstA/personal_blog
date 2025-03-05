"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

// 定义浮动点元素的类型
interface FloatingPoint {
  top: string;
  left: string;
  yAnimation: number;
  duration: number;
}

// 定义电路元素的类型
interface CircuitRect {
  top: string;
  left: string;
}

interface CircuitLine {
  transform: string;
  top: string;
  left: string;
}

export function SkillsShowcase() {
  // 为随机元素创建state
  const [floatingPoints, setFloatingPoints] = useState<FloatingPoint[]>([]);
  const [circuitRects, setCircuitRects] = useState<CircuitRect[]>([]);
  const [circuitLines, setCircuitLines] = useState<CircuitLine[]>([]);
  
  // 只在客户端渲染时生成随机元素
  useEffect(() => {
    // 生成浮动点
    const points: FloatingPoint[] = [];
    for (let i = 0; i < 15; i++) {
      points.push({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        yAnimation: Math.random() * 30 - 15,
        duration: Math.random() * 5 + 5
      });
    }
    setFloatingPoints(points);
    
    // 生成矩形电路元素
    const rects: CircuitRect[] = [];
    for (let i = 0; i < 10; i++) {
      rects.push({
        top: `${Math.floor(Math.random() * 5) * 20}%`,
        left: `${Math.floor(Math.random() * 5) * 20}%`
      });
    }
    setCircuitRects(rects);
    
    // 生成线条电路元素
    const lines: CircuitLine[] = [];
    for (let i = 0; i < 30; i++) {
      lines.push({
        transform: `rotate(${Math.random() * 180}deg)`,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`
      });
    }
    setCircuitLines(lines);
  }, []);
  
  const skills = [
    {
      category: "产品设计",
      items: [
        { name: "用户研究", level: 95 },
        { name: "产品规划", level: 90 },
        { name: "交互设计", level: 85 },
        { name: "竞品分析", level: 90 },
      ]
    },
    {
      category: "算法研究",
      items: [
        { name: "机器学习", level: 85 },
        { name: "深度学习", level: 80 },
        { name: "NLP", level: 75 },
        { name: "声音处理", level: 90 },
      ]
    },
    {
      category: "计算机开发",
      items: [
        { name: "前端开发", level: 85 },
        { name: "后端开发", level: 75 },
        { name: "数据挖掘", level: 90 },
        { name: "Python", level: 95 },
      ]
    },
    {
      category: "硬件系统",
      items: [
        { name: "Arduino", level: 80 },
        { name: "传感器应用", level: 75 },
        { name: "原型设计", level: 85 },
        { name: "硬件集成", level: 70 },
      ]
    },
  ];

  return (
    <section id="skills" className="relative py-28 bg-white overflow-hidden">
      {/* 浮动的点元素 - 符合Headspace风格 */}
      <div className="absolute inset-0">
        {floatingPoints.map((point, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full"
            style={{
              top: point.top,
              left: point.left,
              backgroundColor: i % 5 === 0 ? "hsla(var(--impressionist-pink) / 0.3)" :
                           i % 5 === 1 ? "hsla(var(--impressionist-blue) / 0.3)" :
                           i % 5 === 2 ? "hsla(var(--impressionist-green) / 0.3)" :
                           i % 5 === 3 ? "hsla(var(--impressionist-orange) / 0.3)" :
                                       "hsla(var(--impressionist-yellow) / 0.3)"
            }}
            animate={{
              y: [0, point.yAnimation],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: point.duration,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
      
      {/* Headspace风格的几何图案 */}
      <div className="absolute inset-0 opacity-15">
        {circuitRects.map((rect, i) => (
          <motion.div 
            key={i} 
            className="absolute rounded-lg"
            style={{
              top: rect.top,
              left: rect.left,
              width: `${80 + Math.floor(i % 3) * 40}px`,
              height: `${80 + Math.floor(i % 3) * 40}px`,
              backgroundColor: i % 4 === 0 ? "hsla(var(--impressionist-pink) / 0.05)" :
                             i % 4 === 1 ? "hsla(var(--impressionist-blue) / 0.05)" :
                             i % 4 === 2 ? "hsla(var(--impressionist-green) / 0.05)" :
                                         "hsla(var(--impressionist-yellow) / 0.05)",
              rotate: `${(i * 10) % 40 - 20}deg`
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
          />
        ))}
        {circuitLines.map((line, i) => (
          <motion.div 
            key={i} 
            className="absolute"
            style={{
              transform: line.transform,
              top: line.top,
              left: line.left,
              width: i % 2 === 0 ? "3px" : "2px",
              height: `${40 + Math.floor(i % 5) * 10}px`,
              backgroundColor: i % 5 === 0 ? "hsla(var(--impressionist-pink) / 0.1)" :
                              i % 5 === 1 ? "hsla(var(--impressionist-blue) / 0.1)" :
                              i % 5 === 2 ? "hsla(var(--impressionist-green) / 0.1)" :
                              i % 5 === 3 ? "hsla(var(--impressionist-orange) / 0.1)" :
                                          "hsla(var(--impressionist-yellow) / 0.1)",
              borderRadius: "2px"
            }}
          />
        ))}
      </div>
      
      {/* 明显的上边界 */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center space-y-4 text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block mb-3 rounded-full bg-[hsla(var(--impressionist-blue)/0.1)] px-4 py-1.5 text-sm font-medium text-[hsl(var(--primary))]">
              全栈技术专长
            </span>
          </motion.div>
          <motion.h2 
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            我的技术能力
          </motion.h2>
          <motion.p 
            className="max-w-[700px] text-gray-600 md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            跨越软件、硬件、算法与产品领域的全方位技术专长
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {skills.map((skillGroup, groupIndex) => (
            <motion.div 
              key={skillGroup.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + groupIndex * 0.1 }}
              className="space-y-6 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{skillGroup.category}</h3>
                <Separator className="flex-1 bg-gray-200" />
              </div>
              
              <div className="space-y-5">
                {skillGroup.items.map((skill, index) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                      <Badge className="text-xs bg-[hsla(var(--impressionist-blue)/0.15)] text-[hsl(var(--primary))] border-none">{skill.level}%</Badge>
                    </div>
                    <Progress 
                      value={skill.level} 
                      className="h-2 bg-gray-100" 
                      indicatorClassName={index % 4 === 0 ? "bg-[hsl(var(--impressionist-pink))]" :
                                       index % 4 === 1 ? "bg-[hsl(var(--impressionist-blue))]" :
                                       index % 4 === 2 ? "bg-[hsl(var(--impressionist-green))]" :
                                                     "bg-[hsl(var(--impressionist-yellow))]"
                      }
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 