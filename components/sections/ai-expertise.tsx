"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

export function AIExpertise() {
  const [activeTab, setActiveTab] = useState("algorithm");
  
  return (
    <section id="ai-expertise" className="w-full py-28 bg-transparent relative overflow-hidden">
      {/* 移除平滑过渡效果以避免背景遮挡 */}
      
      {/* Headspace风格背景元素 */}
      <div className="absolute inset-0 bg-grid-small-white/[0.08] -z-10" />
      <div className="absolute h-60 w-60 bg-[hsl(var(--impressionist-yellow))]/15 rounded-full -top-10 -right-10 blur-3xl" />
      <div className="absolute h-60 w-60 bg-[hsl(var(--impressionist-green))]/15 rounded-full bottom-20 left-20 blur-3xl" />
      <div className="absolute h-40 w-40 bg-[hsl(var(--impressionist-blue))]/15 rounded-full top-40 left-1/4 blur-3xl" />
      
      {/* 几何形状装饰元素 */}
      <div className="absolute right-[5%] top-[15%] w-20 h-20 rounded-lg rotate-12 bg-[hsla(var(--impressionist-yellow)/0.05)] -z-10"></div>
      <div className="absolute left-[8%] bottom-[20%] w-16 h-16 rounded-lg rotate-45 bg-[hsla(var(--impressionist-pink)/0.05)] -z-10"></div>
      <div className="absolute right-[15%] bottom-[10%] w-24 h-24 rounded-full bg-[hsla(var(--impressionist-blue)/0.05)] -z-10"></div>
      <div className="absolute left-[20%] top-[8%] w-32 h-14 rounded-lg -rotate-6 bg-[hsla(var(--impressionist-green)/0.05)] -z-10"></div>
      
      {/* 彩色代码元素 */}
      {/* 移除了背景代码元素，保持简洁的设计风格 */}
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center space-y-4 text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="headspace-section-title bg-[hsla(var(--impressionist-green)/0.1)] text-[hsl(var(--impressionist-green))]">
              AI头号玩家
            </span>
          </motion.div>
          <motion.h2 
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            我的AI专长领域
          </motion.h2>
          <motion.p 
            className="max-w-[700px] text-muted-foreground md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            从算法研究到产品设计，从创业实践到技术应用，我在AI全领域的探索。
          </motion.p>
        </div>
        
        <Tabs 
          defaultValue="algorithm" 
          className="w-full max-w-4xl mx-auto"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid grid-cols-4 w-full bg-muted/50 p-1 rounded-xl">
            <TabsTrigger value="algorithm" className="data-[state=active]:bg-card data-[state=active]:text-[hsl(var(--primary))] data-[state=active]:shadow-md rounded-lg transition-all duration-200">算法研究</TabsTrigger>
            <TabsTrigger value="product" className="data-[state=active]:bg-card data-[state=active]:text-[hsl(var(--secondary))] data-[state=active]:shadow-md rounded-lg transition-all duration-200">产品设计</TabsTrigger>
            <TabsTrigger value="startup" className="data-[state=active]:bg-card data-[state=active]:text-[hsl(var(--impressionist-green))] data-[state=active]:shadow-md rounded-lg transition-all duration-200">创业项目</TabsTrigger>
            <TabsTrigger value="tech" className="data-[state=active]:bg-card data-[state=active]:text-[hsl(var(--accent))] data-[state=active]:shadow-md rounded-lg transition-all duration-200">技术应用</TabsTrigger>
          </TabsList>
          
          <TabsContent value="algorithm" className="mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-card border-border backdrop-blur-sm shadow-md overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-card-foreground relative inline-block">
                    <span className="relative z-10">声音事件检测算法研究</span>
                    <span className="absolute bottom-0 left-0 w-full h-3 bg-[hsl(var(--impressionist-yellow))]/20 -z-10 transform -rotate-1"></span>
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">三个核心算法研究项目</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="flex flex-col space-y-4">
                    {/* 项目标题和描述 */}
                    <div>
                      <h3 className="text-lg font-medium text-card-foreground relative inline-block mb-2">
                        <span className="relative z-10">Waveform-Logmel Dual Stream Fusion Network</span>
                        <span className="absolute bottom-0 left-0 w-full h-2 bg-[hsl(var(--primary))]/20 -z-10"></span>
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        双流融合网络用于高效声音事件检测，结合波形和对数梅尔特征的优势...
                      </p>
                    </div>
                    
                    {/* 图片展示区域 - 使用Glass Card效果 */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* 第一张图片 */}
                      <div className="group relative overflow-hidden rounded-xl border border-border/40 bg-background/30 p-1 backdrop-blur-sm transition-all hover:bg-background/50 hover:shadow-lg">
                        <div className="absolute -inset-0.5 rounded-xl opacity-10 blur-sm transition-all group-hover:opacity-20 bg-gradient-to-br from-[hsl(var(--impressionist-blue))] to-[hsl(var(--impressionist-green))]"></div>
                        <div className="relative h-40 w-full overflow-hidden rounded-lg">
                          <img 
                            src="/images/projects/ICME_network.png" 
                            alt="双流融合网络架构图" 
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="relative mt-2 px-1">
                          <p className="text-xs font-medium text-foreground/80">网络架构</p>
                        </div>
                      </div>
                      
                      {/* 第二张图片 */}
                      <div className="group relative overflow-hidden rounded-xl border border-border/40 bg-background/30 p-1 backdrop-blur-sm transition-all hover:bg-background/50 hover:shadow-lg">
                        <div className="absolute -inset-0.5 rounded-xl opacity-10 blur-sm transition-all group-hover:opacity-20 bg-gradient-to-br from-[hsl(var(--impressionist-purple))] to-[hsl(var(--impressionist-blue))]"></div>
                        <div className="relative h-40 w-full overflow-hidden rounded-lg">
                          <div className="flex h-full w-full items-center justify-center bg-muted/50 text-sm text-muted-foreground">
                            [添加第二张图片]  
                          </div>
                        </div>
                        <div className="relative mt-2 px-1">
                          <p className="text-xs font-medium text-foreground/80">实验结果</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* 类似结构展示其他两个算法研究项目 */}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
          
          {/* 其他标签内容类似结构 */}
        </Tabs>
      </div>
    </section>
  );
} 