import { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { SkillsShowcase } from "@/components/sections/skills-showcase";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { AIExpertise } from "@/components/sections/ai-expertise";
import { RecentExperience } from "@/components/sections/recent-experience";

export const metadata: Metadata = {
  title: "Vincent(翁诗彤) | AI产品经理 & 全栈技术专家",
  description: "兼具人机交互学术背景与AI工程思维的复合型人才，凭借对AIGC技术的深度实践与商业敏感度，持续构建'AI增强型个体'创新范式，实现技术与人文价值的共振。",
};

// 利用ISR优化页面加载速度
export const revalidate = 3600; // 每小时重新验证一次数据

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* 英雄区块 - 全屏视差效果 */}
      <HeroSection />
      
      {/* AI专长领域预览 */}
      <AIExpertise />
      
      {/* 技能展示 - 动态交互卡片 */}
      <SkillsShowcase />
      
      {/* 精选项目 - 图片滑动展示 */}
      <FeaturedProjects />
      
      {/* 最近经历 - 时间线展示 */}
      <RecentExperience />
    </main>
  );
} 