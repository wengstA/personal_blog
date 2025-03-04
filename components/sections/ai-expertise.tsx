"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

export function AIExpertise() {
  const [activeTab, setActiveTab] = useState("algorithm");
  
  return (
    <section id="ai-expertise" className="w-full py-20 bg-gradient-to-b from-blue-900 to-blue-950 relative overflow-hidden">
      {/* Tech background elements */}
      <div className="absolute inset-0 bg-grid-small-white/[0.02] -z-10" />
      <div className="absolute h-40 w-40 bg-blue-600/10 rounded-full -top-10 -right-10 blur-2xl" />
      <div className="absolute h-40 w-40 bg-cyan-600/10 rounded-full bottom-20 left-20 blur-2xl" />
      
      {/* Code-like background elements */}
      <div className="absolute left-4 top-10 text-blue-500/10 text-xs font-mono">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="py-1">
            {`const ai_${i} = new AIModel({`}
            <br />
            {`  type: "neural_network",`}
            <br />
            {`  layers: [${312 + i * 10}, ${336 + i * 8}],`}
            <br />
            {`});`}
          </div>
        ))}
      </div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
            AI领域专长
          </h2>
          <p className="max-w-[700px] text-gray-400 md:text-xl">
            从算法研究到产品设计，从创业实践到技术应用，我在AI全领域的探索。
          </p>
        </div>
        
        <Tabs 
          defaultValue="algorithm" 
          className="w-full max-w-4xl mx-auto"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="algorithm">算法研究</TabsTrigger>
            <TabsTrigger value="product">产品设计</TabsTrigger>
            <TabsTrigger value="startup">创业项目</TabsTrigger>
            <TabsTrigger value="tech">技术应用</TabsTrigger>
          </TabsList>
          
          <TabsContent value="algorithm" className="mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-blue-950/80 border border-blue-400/20 backdrop-blur-sm shadow-lg shadow-blue-500/10">
                <CardHeader>
                  <CardTitle className="text-white">声音事件检测算法研究</CardTitle>
                  <CardDescription>三个核心算法研究项目</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h3 className="text-lg font-medium text-white">Waveform-Logmel Dual Stream Fusion Network</h3>
                      <p className="text-sm text-gray-400">
                        双流融合网络用于高效声音事件检测，结合波形和对数梅尔特征的优势...
                      </p>
                    </div>
                    <div className="rounded-lg overflow-hidden bg-slate-800 h-48 relative">
                      <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                        [模型架构图]
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