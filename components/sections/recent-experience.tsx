import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function RecentExperience() {
  const experiences = [
    {
      title: "AI产品经理",
      company: "科技公司",
      period: "2023 - 至今",
      description: "负责AI产品的规划、设计和落地，推动产品从概念到上线的全流程",
      skills: ["产品管理", "AI应用", "用户研究", "数据分析"]
    },
    {
      title: "全栈开发工程师",
      company: "互联网公司",
      period: "2021 - 2023",
      description: "负责公司核心产品的前后端开发，优化用户体验和系统性能",
      skills: ["React", "Node.js", "TypeScript", "数据库设计"]
    },
    {
      title: "研究助理",
      company: "浙江大学",
      period: "2019 - 2021",
      description: "参与人机交互领域的研究项目，发表多篇学术论文",
      skills: ["学术研究", "人机交互", "数据分析", "论文写作"]
    }
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-transparent">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">近期经历</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            我的职业旅程和专业发展历程
          </p>
        </div>
        <div className="mt-12 space-y-8">
          {experiences.map((exp, index) => (
            <div key={index} className="relative pl-8 md:pl-12">
              <div className="absolute left-0 top-0 h-full w-px bg-border"></div>
              <div className="absolute left-[-8px] top-6 h-4 w-4 rounded-full bg-primary"></div>
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <CardTitle>{exp.title}</CardTitle>
                      <CardDescription>{exp.company} · {exp.period}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{exp.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {exp.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
