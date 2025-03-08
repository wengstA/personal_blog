import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function RecentExperience() {
  const experiences = [
    {
      title: "视觉-算法策略产品",
      company: "Minimax",
      period: "2023.09 - 至今",
      description: "负责自研大模型性能评测，算法训练与优化，为功能需求定制端到端工作流",
      skills: ["AI模型微调", "性能优化", "算法研究", "端到端工作流开发"]
    },
    {
      title: "工业设计工程 硕士",
      company: "浙江大学工程师学院",
      period: "2023.09 - 2026.06",
      description: (
        <>
          <div>研究方向：人机交互、情感计算、基于LLM的交互界面、情感预测交互陪伴系统</div>
          <div className="mt-3 font-medium">获奖情况：</div>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700">优秀研究生</span>
            <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700">未来设计师三等奖</span>
            <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700">缪斯设计奖银奖</span>
            <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700">字节XR工作坊二等奖</span>
          </div>
        </>
      ),
      skills: ["人机交互", "情感计算", "LLM应用", "设计思维"]
    },
    {
      title: "计算机科学与技术  本科",
      company: "华南农业大学数学与信息学院",
      period: "2019.09 - 2023.06",
      description: "专业排名：2/132，GPA：4.37/5.0。研究方向：语音识别算法、声音事件检测算法、注意力机制",
      skills: ["算法研究", "数据挖掘", "人工智能", "语音智能"]
    }
  ];

  return (
    <section id="experience" className="w-full py-12 md:py-24 lg:py-32 bg-transparent">
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
              <Card className="dark:bg-[rgba(36,36,38,0.9)] dark:border-gray-700 dark:shadow-lg transition-all hover:shadow-lg dark:hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
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
