"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { TiltCard } from "@/components/ui/tilt-card";

export function FeaturedProjects() {
  const projects = [
    {
      title: "科研AI助手平台",
      description: (
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>面向科研人群打造的多模态AI平台，整合GPT对话、图像生成与语音转换功能</li>
          <li>
            <a 
              href="https://box.dreamy.icu/DASHBOARD" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              直接访问平台
            </a>
          </li>
          <li>账号：wstShowtest | 密码：123456</li>
        </ul>
      ),
      image: "/images/projects/ai-assistant.png",
      link: "https://box.dreamy.icu/DASHBOARD"
    },
    {
      title: "AI图像生成工作流",
      description: (
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>构建基于Flux+ComfyUI端到端自动化图像生成链路</li>
          <li>通过LoRA模型训练，解决风格迁移失真与任务形象一致性保持问题</li>
        </ul>
      ),
      image: "/images/projects/ICME_network.png",
      link: "https://github.com/wengstA/ai-image-workflow"
    },
    {
      title: "数据可视化平台",
      description: (
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>交互式数据可视化平台</li>
          <li>支持多种图表类型和实时数据更新</li>
        </ul>
      ),
      // image: "https://placehold.co/600x400/e2e8f0/1e293b?text=Data+Visualization",   
      image: "/images/projects/data-viz.png",
      link: "https://github.com/wengstA/data-viz"
    }
  ];

  return (
    <section className="relative w-full py-12 md:py-24 lg:py-32 overflow-hidden bg-transparent">
      {/* Color blobs beneath the frosted glass */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Blue color blob - visible in both modes but with different opacities */}
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full bg-[hsl(var(--impressionist-blue))] opacity-15 dark:opacity-5 blur-3xl"></div>
        {/* Red/Pink color blob - visible in both modes but with different opacities */}
        <div className="absolute bottom-1/4 right-0 w-[600px] h-[400px] rounded-full bg-[hsl(var(--impressionist-pink))] opacity-15 dark:opacity-5 blur-3xl"></div>
        
        {/* Dark mode-specific subtle glowing elements */}
        <div className="hidden dark:block absolute top-[30%] right-[20%] w-[300px] h-[300px] rounded-full bg-blue-500/5 blur-3xl animate-pulse"></div>
        <div className="hidden dark:block absolute bottom-[10%] left-[15%] w-[250px] h-[250px] rounded-full bg-purple-500/5 blur-3xl animate-pulse"></div>
      </div>
      
      {/* Frosted glass overlay - different properties for light/dark mode */}
      <div className="absolute inset-0 backdrop-blur-md bg-background/70 dark:bg-slate-950/80 dark:backdrop-blur-xl"></div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">一些项目</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            一些成长的痕迹
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <TiltCard key={index}>
              <div className="h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-105" 
                />
              </div>
              <div className="px-6 pt-4">
                <h3 className="text-lg font-semibold">{project.title}</h3>
              </div>
              <div className="px-6 flex-grow">
                <div className="h-[120px] overflow-y-auto py-2">
                  <div className="text-muted-foreground text-sm">{project.description}</div>
                </div>
              </div>
              <div className="px-6 pb-4 mt-auto">
                <Button variant="outline" className="w-full" asChild>
                  <a href={project.link} target="_blank" rel="noopener noreferrer">查看项目</a>
                </Button>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
