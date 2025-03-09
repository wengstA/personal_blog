"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

export function AIExpertise() {
  const [activeTab, setActiveTab] = useState("algorithm");
  
  return (
    <section id="ai-expertise" className="w-full py-28 bg-transparent relative overflow-hidden">
      {/* 移除平滑过渡效果以避免背景遮挡 */}
      
      {/* Headspace风格背景元素 */}
      <div className="absolute inset-0 bg-grid-small-white/[0.08] dark:bg-grid-small-black/[0.1] -z-10" />
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
              <Card className={cn("bg-card dark:bg-[rgba(36,36,38,0.9)] border-border dark:border-gray-700 backdrop-blur-sm shadow-md dark:shadow-lg overflow-hidden transition-all hover:shadow-lg dark:hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)]")}>
                <CardHeader>
                  <CardTitle className="text-card-foreground relative inline-block">
                    <span className="relative z-10">声音事件检测算法研究</span>
                    <span className="absolute bottom-0 left-0 w-full h-3 bg-[hsl(var(--impressionist-yellow))]/20 -z-10 transform -rotate-1"></span>
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">三个核心算法研究项目</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  {/* 第一个项目：Hierarchical Temporal Attention and Competent Teacher Network */}
                  <div className="flex flex-col space-y-4">
                    <div>
                      <h3 className="text-lg font-medium text-card-foreground relative inline-block mb-2">
                        <span className="relative z-10">Hierarchical Temporal Attention and Competent Teacher Network（ICME-CCFB）</span>
                        <span className="absolute bottom-0 left-0 w-full h-2 bg-[hsl(var(--primary))]/20 -z-10"></span>
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        分层时序注意力与胜任教师网络架构，提升声音事件检测准确性
                      </p>
                      <ul className="text-xs text-muted-foreground mt-2 space-y-1 list-disc list-inside">
                        <li>分层时序注意力机制捕捉长时序依赖关系</li>
                        <li>通道自适应融合增强特征表达</li>
                        <li>胜任教师网络优化半监督学习策略</li>
                        <li>背景损失增强非目标事件建模能力</li>
                      </ul>
                    </div>
                    
                    {/* 图片展示区域 */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* 第一张图片 */}
                      <div className="group relative overflow-hidden rounded-xl border border-border/40 bg-background/30 p-1 backdrop-blur-sm transition-all hover:bg-background/50 hover:shadow-lg flex flex-col h-48">
                        <div className="absolute -inset-0.5 rounded-xl opacity-10 blur-sm transition-all group-hover:opacity-20 bg-gradient-to-br from-[hsl(var(--impressionist-blue))] to-[hsl(var(--impressionist-green))]"></div>
                        <div className="flex-grow flex items-center justify-center overflow-hidden rounded-lg">
                          <img 
                            src="/images/projects/ICME_network.png" 
                            alt="分层时序注意力网络架构" 
                            className="max-h-36 object-contain transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="px-1 pb-1 mt-auto">
                          <p className="text-xs font-medium text-foreground/80">网络架构</p>
                        </div>
                      </div>
                      
                      {/* 第二张图片 */}
                      <div className="group relative overflow-hidden rounded-xl border border-border/40 bg-background/30 p-1 backdrop-blur-sm transition-all hover:bg-background/50 hover:shadow-lg flex flex-col h-48">
                        <div className="absolute -inset-0.5 rounded-xl opacity-10 blur-sm transition-all group-hover:opacity-20 bg-gradient-to-br from-[hsl(var(--impressionist-purple))] to-[hsl(var(--impressionist-blue))]"></div>
                        <div className="flex-grow flex items-center justify-center overflow-hidden rounded-lg">
                          <img 
                            src="/images/projects/TS_network.png"
                            alt="胜任教师网络" 
                            className="max-h-36 object-contain transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="px-1 pb-1 mt-auto">
                          <p className="text-xs font-medium text-foreground/80">蒸馏框架</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* 第二个项目：Waveform-Logmel Dual Stream Fusion Network */}
                  <div className="flex flex-col space-y-4 pt-6 mt-2 border-t border-border/70 shadow-sm">
                    <div>
                      <h3 className="text-lg font-medium text-card-foreground relative inline-block mb-2">
                        <span className="relative z-10">Waveform-Logmel Dual Stream Fusion Network</span>
                        <span className="absolute bottom-0 left-0 w-full h-2 bg-[hsl(var(--primary))]/20 -z-10"></span>
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        双流融合网络用于高效声音事件检测，结合波形和对数梅尔特征的优势
                      </p>
                      <ul className="text-xs text-muted-foreground mt-2 space-y-1 list-disc list-inside">
                        <li>波形流直接学习特征</li>
                        <li>对数梅尔流捕捉信息</li>
                        <li>创新融合机制整合互补特征</li>
                        <li>Co-Training思想促进双流互补学习</li>
                      </ul>
                    </div>
                    
                    {/* 图片展示区域 */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* 第一张图片 */}
                      <div className="group relative overflow-hidden rounded-xl border border-border/40 bg-background/30 p-1 backdrop-blur-sm transition-all hover:bg-background/50 hover:shadow-lg flex flex-col h-48">
                        <div className="absolute -inset-0.5 rounded-xl opacity-10 blur-sm transition-all group-hover:opacity-20 bg-gradient-to-br from-[hsl(var(--impressionist-green))] to-[hsl(var(--impressionist-yellow))]"></div>
                        <div className="flex-grow flex items-center justify-center overflow-hidden rounded-lg">
                          <img 
                            src="/images/projects/dual_stream_NN.png" 
                            alt="双流融合网络架构图" 
                            className="max-h-36 object-contain transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="px-1 pb-1 mt-auto">
                          <p className="text-xs font-medium text-foreground/80">网络架构</p>
                        </div>
                      </div>
                      
                      {/* 第二张图片 - 可视化结果或性能比较 */}
                      <div className="group relative overflow-hidden rounded-xl border border-border/40 bg-background/30 p-1 backdrop-blur-sm transition-all hover:bg-background/50 hover:shadow-lg flex flex-col h-48">
                        <div className="absolute -inset-0.5 rounded-xl opacity-10 blur-sm transition-all group-hover:opacity-20 bg-gradient-to-br from-[hsl(var(--impressionist-orange))] to-[hsl(var(--impressionist-yellow))]"></div>
                        <div className="flex-grow flex items-center justify-center overflow-hidden rounded-lg">
                          <img 
                            src="/images/projects/dual_stream_NN_core.png" 
                            alt="双流融合网络 SEN" 
                            className="max-h-36 object-contain transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="px-1 pb-1 mt-auto">
                          <p className="text-xs font-medium text-foreground/80">双流核心</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* 第三个项目：专利架构设计 */}
                  <div className="flex flex-col space-y-4 pt-6 mt-2 border-t border-border/70 shadow-sm">
                    <div>
                      <h3 className="text-lg font-medium text-card-foreground relative inline-block mb-2">
                        <span className="relative z-10">通道注意力与残差门控的专利架构设计</span>
                        <span className="absolute bottom-0 left-0 w-full h-2 bg-[hsl(var(--primary))]/20 -z-10"></span>
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        创新的网络结构设计，提升声音事件检测模型性能与泛化能力
                      </p>
                      <ul className="text-xs text-muted-foreground mt-2 space-y-1 list-disc list-inside">
                        <li>通道注意力机制增强重要特征表达</li>
                        <li>残差门控结构优化信息流传递</li>
                      </ul>
                    </div>
                    
                    {/* 图片展示区域 */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* 第一张图片 - pattern_images.png */}
                      <div className="group relative overflow-hidden rounded-xl border border-border/40 bg-background/30 p-1 backdrop-blur-sm transition-all hover:bg-background/50 hover:shadow-lg flex flex-col h-48">
                        <div className="absolute -inset-0.5 rounded-xl opacity-10 blur-sm transition-all group-hover:opacity-20 bg-gradient-to-br from-[hsl(var(--impressionist-red))] to-[hsl(var(--impressionist-purple))]"></div>
                        <div className="flex-grow flex items-center justify-center overflow-hidden rounded-lg">
                          <img 
                            src="/images/projects/pattern_images.png" 
                            alt="通道注意力机制" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="px-1 pb-1 mt-auto">
                          <p className="text-xs font-medium text-foreground/80">网络架构</p>
                        </div>
                      </div>
                      
                      {/* 第二张图片 - pattern_pic2.png */}
                      <div className="group relative overflow-hidden rounded-xl border border-border/40 bg-background/30 p-1 backdrop-blur-sm transition-all hover:bg-background/50 hover:shadow-lg flex flex-col h-48">
                        <div className="absolute -inset-0.5 rounded-xl opacity-10 blur-sm transition-all group-hover:opacity-20 bg-gradient-to-br from-[hsl(var(--impressionist-blue))] to-[hsl(var(--impressionist-red))]"></div>
                        <div className="flex-grow flex items-center justify-center overflow-hidden rounded-lg">
                          <img 
                            src="/images/projects/pattern_pic2.png" 
                            alt="残差门控结构" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="px-1 pb-1 mt-auto">
                          <p className="text-xs font-medium text-foreground/80">专利技术: 通道注意力机制</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
          
          {/* 技术应用标签内容 */}
          <TabsContent value="tech" className="mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className={cn("bg-card dark:bg-[rgba(36,36,38,0.9)] border-border dark:border-gray-700 backdrop-blur-sm shadow-md dark:shadow-lg overflow-hidden transition-all hover:shadow-lg dark:hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)]")}>
                <CardHeader>
                  <CardTitle className="text-card-foreground relative inline-block">
                    <span className="relative z-10">声音AI相关专利展示</span>
                    <span className="absolute bottom-0 left-0 w-full h-3 bg-[hsl(var(--impressionist-blue))]/20 -z-10"></span>
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    技术专利与创新成果展示
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* 更适合A4格式专利展示的布局 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* 专利项 1 */}
                    <div className="group relative overflow-hidden rounded-xl border border-border/40 bg-background/30 backdrop-blur-sm transition-all hover:bg-background/50 hover:shadow-lg h-[420px] flex flex-col">
                      <div className="absolute -inset-0.5 rounded-xl opacity-10 blur-sm transition-all group-hover:opacity-20 bg-gradient-to-br from-[hsl(var(--impressionist-blue))] to-[hsl(var(--impressionist-green))]"></div>
                      <div className="p-3 bg-gradient-to-br from-blue-500/10 to-green-500/10 dark:from-blue-500/5 dark:to-green-500/5 rounded-t-lg">
                        <h3 className="text-lg font-medium text-card-foreground">声音事件检测专利</h3>
                        <p className="text-sm text-muted-foreground mt-1">基于Transformer架构</p>
                      </div>
                      <div className="flex-grow flex items-center justify-center overflow-hidden p-4">
                        <div className="relative w-full h-full flex items-center justify-center">
                          <img 
                            src="/images/projects/Transformer_cow.png" 
                            alt="声音事件检测专利" 
                            className="max-h-[280px] w-auto object-contain transition-transform duration-300 group-hover:scale-102 shadow-sm"
                          />
                          <div className="absolute inset-0 pointer-events-none border border-border/20 rounded-md opacity-40"></div>
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-blue-500/5 to-green-500/5 dark:from-blue-500/10 dark:to-green-500/10 p-3 mt-auto rounded-b-lg">
                        <p className="text-sm font-medium text-center text-foreground/80">中国专利号: ZL2023XXXXX</p>
                      </div>
                    </div>

                    {/* 专利项 2 */}
                    <div className="group relative overflow-hidden rounded-xl border border-border/40 bg-background/30 backdrop-blur-sm transition-all hover:bg-background/50 hover:shadow-lg h-[420px] flex flex-col">
                      <div className="absolute -inset-0.5 rounded-xl opacity-10 blur-sm transition-all group-hover:opacity-20 bg-gradient-to-br from-[hsl(var(--impressionist-yellow))] to-[hsl(var(--impressionist-orange))]"></div>
                      <div className="p-3 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 dark:from-yellow-500/5 dark:to-orange-500/5 rounded-t-lg">
                        <h3 className="text-lg font-medium text-card-foreground">视频模式识别专利</h3>
                        <p className="text-sm text-muted-foreground mt-1">多模式视频分析技术</p>
                      </div>
                      <div className="flex-grow flex items-center justify-center overflow-hidden p-4">
                        <div className="relative w-full h-full flex items-center justify-center">
                          <img 
                            src="/images/projects/video_pattern.png" 
                            alt="视频模式识别专利" 
                            className="max-h-[280px] w-auto object-contain transition-transform duration-300 group-hover:scale-102 shadow-sm"
                          />
                          <div className="absolute inset-0 pointer-events-none border border-border/20 rounded-md opacity-40"></div>
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-yellow-500/5 to-orange-500/5 dark:from-yellow-500/10 dark:to-orange-500/10 p-3 mt-auto rounded-b-lg">
                        <p className="text-sm font-medium text-center text-foreground/80">中国专利号: ZL2022XXXXX</p>
                      </div>
                    </div>

                    {/* 专利项 3 */}
                    <div className="group relative overflow-hidden rounded-xl border border-border/40 bg-background/30 backdrop-blur-sm transition-all hover:bg-background/50 hover:shadow-lg h-[420px] flex flex-col">
                      <div className="absolute -inset-0.5 rounded-xl opacity-10 blur-sm transition-all group-hover:opacity-20 bg-gradient-to-br from-[hsl(var(--impressionist-green))] to-[hsl(var(--impressionist-blue))]"></div>
                      <div className="p-3 bg-gradient-to-br from-green-500/10 to-blue-500/10 dark:from-green-500/5 dark:to-blue-500/5 rounded-t-lg">
                        <h3 className="text-lg font-medium text-card-foreground">声音事件检测算法</h3>
                        <p className="text-sm text-muted-foreground mt-1">深度学习声音分析系统</p>
                      </div>
                      <div className="flex-grow flex items-center justify-center overflow-hidden p-4">
                        <div className="relative w-full h-full flex items-center justify-center">
                          <img 
                            src="/images/projects/SED_alg.png" 
                            alt="声音事件检测算法专利" 
                            className="max-h-[280px] w-auto object-contain transition-transform duration-300 group-hover:scale-102 shadow-sm"
                          />
                          <div className="absolute inset-0 pointer-events-none border border-border/20 rounded-md opacity-40"></div>
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-green-500/5 to-blue-500/5 dark:from-green-500/10 dark:to-blue-500/10 p-3 mt-auto rounded-b-lg">
                        <p className="text-sm font-medium text-center text-foreground/80">中国专利号: ZL2021XXXXX</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* 创业项目标签内容 */}
          <TabsContent value="startup" className="mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className={cn("bg-card dark:bg-[rgba(36,36,38,0.9)] border-border dark:border-gray-700 backdrop-blur-sm shadow-md dark:shadow-lg overflow-hidden transition-all hover:shadow-lg dark:hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)]")}>
                <CardHeader>
                  <CardTitle className="text-card-foreground relative inline-block">
                    <span className="relative z-10">科研AI助手平台</span>
                    <span className="absolute bottom-0 left-0 w-full h-3 bg-[rgb(0,113,227)]/20 -z-10"></span>
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    多模态AI平台，为科研人群提供全方位智能帮助
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-6 mb-6">
                    <div className="md:w-1/2">
                      <div className="group relative overflow-hidden rounded-xl border border-border/40 bg-background/30 backdrop-blur-sm transition-all hover:bg-background/50 hover:shadow-lg h-[280px]">
                        <div className="absolute -inset-0.5 rounded-xl opacity-10 blur-sm transition-all group-hover:opacity-20 bg-gradient-to-br from-[rgb(0,113,227)] to-[hsl(var(--impressionist-green))]"></div>
                        <div className="h-full w-full p-4 flex items-center justify-center">
                          <img 
                            src="/images/projects/ai-assistant.png" 
                            alt="科研AI助手平台" 
                            className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex gap-2 items-center">
                          <a 
                            href="https://box.dreamy.icu/DASHBOARD" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[rgb(0,113,227)] hover:underline font-medium flex items-center gap-1"
                          >
                            <span>访问平台</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M15 3H21V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </a>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">账号：wstShowtest | 密码：123456</p>
                      </div>
                    </div>
                    
                    <div className="md:w-1/2">
                      <h3 className="text-lg font-medium text-card-foreground relative inline-block mb-3">
                        <span className="relative z-10">项目概述</span>
                        <span className="absolute bottom-0 left-0 w-full h-2 bg-[rgb(0,113,227)]/20 -z-10"></span>
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        在ChatGPT上线初期科研人群对AIGC需求激增的背景下，为快速满足学者科研场景的AI需求，主导开发并上线科研助手AI平台，通过持续迭代及市场动态分析调整运营模式，实现产品与商业逻辑的闭环优化。
                      </p>
                      
                      <div className="space-y-4 mt-4">
                        <div className="p-3 rounded-lg bg-background/50 border border-border/30 transition-all hover:border-[rgb(0,113,227)]/40 hover:bg-[rgb(0,113,227)]/5">
                          <h4 className="text-sm font-medium text-foreground mb-1">需求调研与产品开发</h4>
                          <p className="text-xs text-muted-foreground">调研市场上与学术界科研助手竞品，拆解学者科研路径。开发智能助手平台并集成GPT对话功能，快速上线。</p>
                        </div>
                        
                        <div className="p-3 rounded-lg bg-background/50 border border-border/30 transition-all hover:border-[rgb(0,113,227)]/40 hover:bg-[rgb(0,113,227)]/5">
                          <h4 className="text-sm font-medium text-foreground mb-1">多模态功能开发</h4>
                          <p className="text-xs text-muted-foreground">基于学者需求，逐步加入图像生成、语音转文字、文字转语音等功能，丰富平台的多模态交互能力。</p>
                        </div>
                        
                        <div className="p-3 rounded-lg bg-background/50 border border-border/30 transition-all hover:border-[rgb(0,113,227)]/40 hover:bg-[rgb(0,113,227)]/5">
                          <h4 className="text-sm font-medium text-foreground mb-1">界面设计与用户体验</h4>
                          <p className="text-xs text-muted-foreground">通过深入研究行业内的界面设计案例，优化平台UI界面的设计和交互体验。设计并接入多条科研Prompt。</p>
                        </div>
                        
                        <div className="p-3 rounded-lg bg-background/50 border border-border/30 transition-all hover:border-[rgb(0,113,227)]/40 hover:bg-[rgb(0,113,227)]/5">
                          <h4 className="text-sm font-medium text-foreground mb-1">商业模式优化</h4>
                          <p className="text-xs text-muted-foreground">通过持续进行平台运营数据分析、行业市场调研与竞品分析，优化商业模式，对接多个高校实验室与企业， 并提供科研项目的技术解决方案。</p>
                        </div>
                      </div>
                    </div>
                  </div>
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