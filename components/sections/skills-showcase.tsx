"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

export function SkillsShowcase() {
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
    <section id="skills" className="w-full py-20 bg-gradient-to-br from-blue-950 to-blue-800 relative overflow-hidden">
      {/* Tech floating elements */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 bg-blue-500/30 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 30 - 15],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
      
      {/* Digital circuit pattern */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i} 
            className="absolute bg-transparent border-t border-l border-blue-400 w-20 h-20"
            style={{
              top: `${Math.floor(Math.random() * 5) * 20}%`,
              left: `${Math.floor(Math.random() * 5) * 20}%`,
            }}
          />
        ))}
        {[...Array(30)].map((_, i) => (
          <div 
            key={i} 
            className="absolute w-px h-20 bg-blue-400/20"
            style={{
              transform: `rotate(${Math.random() * 180}deg)`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
            技术能力
          </h2>
          <p className="max-w-[700px] text-gray-400 md:text-xl">
            跨越软件、硬件、算法与产品的全栈技术专长
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {skills.map((skillGroup, groupIndex) => (
            <motion.div 
              key={skillGroup.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-xl font-semibold text-white">{skillGroup.category}</h3>
                <Separator className="flex-1" />
              </div>
              
              <div className="space-y-4">
                {skillGroup.items.map((skill, index) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-300">{skill.name}</span>
                      <Badge variant="outline" className="text-xs">{skill.level}%</Badge>
                    </div>
                    <Progress value={skill.level} className="h-2" />
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