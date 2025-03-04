import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function FeaturedProjects() {
  const projects = [
    {
      title: "AI助手框架",
      description: "基于大语言模型的智能助手框架，支持多轮对话和知识库检索",
      image: "/images/projects/ai-assistant.jpg",
      link: "https://github.com/yourusername/ai-assistant"
    },
    {
      title: "个人博客",
      description: "使用Next.js和shadcn/ui构建的个人博客网站",
      image: "/images/projects/blog.jpg",
      link: "https://github.com/yourusername/personal-blog"
    },
    {
      title: "数据可视化平台",
      description: "交互式数据可视化平台，支持多种图表类型和实时数据更新",
      image: "/images/projects/data-viz.jpg",
      link: "https://github.com/yourusername/data-viz"
    }
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">精选项目</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            我的一些代表性项目，展示我的技术能力和创新思维
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="h-48 bg-muted flex items-center justify-center">
                <div className="text-4xl font-bold text-muted-foreground">项目图片</div>
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
