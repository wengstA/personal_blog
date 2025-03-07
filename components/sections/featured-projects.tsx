import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function FeaturedProjects() {
  const projects = [
    {
      title: "科研AI助手平台",
      description: "面向科研人群打造的多模态AI平台，整合GPT对话、图像生成与语音转换功能，支持200+用户的科研需求。通过优化UI交互及20+专业Prompt模板，提升用户满意度45%，并成功转型ToB模式对接高校实验室与企业。\n访问凭证 - 账号：wstShowtest | 密码：123456",
      image: "/images/projects/ai-assistant.jpg",
      link: "https://box.dreamy.icu/DASHBOARD"
    },
    {
      title: "AI图像生成工作流",
      description: "构建基于Flux+ComfyUI端到端自动化图像生成链路，为Talkie日区批量生产100个高质量PGC角色形象及3000+卡牌。通过LoRA模型训练与效果评测，解决风格迁移失真问题，显著提升了图像画风一致性。",
      image: "/images/projects/ai-workflow.jpg",
      link: "https://github.com/wengstA/ai-image-workflow"
    },
    {
      title: "数据可视化平台",
      description: "交互式数据可视化平台，支持多种图表类型和实时数据更新",
      image: "/images/projects/data-viz.jpg",
      link: "https://github.com/wengstA/data-viz"
    }
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">一些项目</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            一些成长的痕迹
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="h-48 bg-muted overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-105" 
                />
              </div>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <a href={project.link} target="_blank" rel="noopener noreferrer">查看项目</a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
