import { Metadata } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { Clock, Calendar, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { marked } from "marked";

// 每小时重新验证一次数据
export const revalidate = 3600;

// 动态生成元数据
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const { category, slug } = resolvedParams;
  
  try {
    const postPath = path.join(
      process.cwd(),
      `content/blog/${category}/${slug}.md`
    );
    
    if (!fs.existsSync(postPath)) {
      return {
        title: "文章未找到 | Vincent的个人博客",
      };
    }
    
    const fileContent = fs.readFileSync(postPath, "utf8");
    const { data: frontmatter } = matter(fileContent);
    
    return {
      title: `${frontmatter.title} | Vincent的个人博客`,
      description: frontmatter.excerpt,
    };
  } catch (error) {
    return {
      title: "文章加载错误 | Vincent的个人博客",
    };
  }
}

function getCategoryTitle(categorySlug: string): string {
  const categoryMap: Record<string, string> = {
    'interaction_with_world': '世界-交互',
    'ai': 'AI探索',
    'personal_growth': '个人成长'
  };
  
  return categoryMap[categorySlug] || categorySlug;
}

function getCategoryIcon(categorySlug: string): string {
  const iconMap: Record<string, string> = {
    'interaction_with_world': '🌏',
    'ai': '🤖',
    'personal_growth': '🌱'
  };
  
  return iconMap[categorySlug] || '📝';
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const resolvedParams = await params;
  const { category, slug } = resolvedParams;
  
  try {
    const postPath = path.join(
      process.cwd(),
      `content/blog/${category}/${slug}.md`
    );
    
    if (!fs.existsSync(postPath)) {
      notFound();
    }
    
    const fileContent = fs.readFileSync(postPath, "utf8");
    const { data: frontmatter, content } = matter(fileContent);
    
    // 使用marked解析Markdown内容
    const htmlContent = marked(content);
    
    return (
      <main className="flex min-h-screen pt-24 px-4 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-3xl mx-auto w-full">
          {/* 面包屑导航 */}
          <div className="mb-8">
            <Link 
              href="/blog" 
              className="inline-flex items-center text-[rgb(0,113,227)] dark:text-[rgb(10,132,255)] hover:underline font-medium"
            >
              <ChevronLeft size={18} className="mr-1" />
              返回文章列表
            </Link>
          </div>
          
          {/* 文章标题和元数据 */}
          <header className="mb-10">
            <div className="flex items-center mb-4 gap-2">
              <Link 
                href={`/blog#${category}`}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="mr-1.5">{getCategoryIcon(category)}</span>
                {getCategoryTitle(category)}
              </Link>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              {frontmatter.title}
            </h1>
            
            <div className="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-400 gap-5">
              <span className="flex items-center">
                <Calendar size={16} className="mr-2" />
                {new Date(frontmatter.date).toLocaleDateString('zh-CN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
              <span className="flex items-center">
                <Clock size={16} className="mr-2" />
                阅读时间：{frontmatter.readingTime}
              </span>
            </div>
          </header>
          
          {/* 苹果风格的文章卡片 */}
          <div className="relative max-w-3xl mx-auto mb-12 rounded-3xl overflow-hidden group">
            {/* 阴影效果 - 更加细腻 */}
            <div className="absolute inset-0 rounded-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.12)] dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] transition-all duration-300"></div>
            
            {/* 毛玻璃背景 - 更稀藏、更简洁 */}
            <div className="absolute inset-0 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 rounded-3xl transition-all duration-300"></div>
            
            {/* 微妙的边框 */}
            <div className="absolute inset-0 rounded-3xl border border-gray-200/50 dark:border-gray-700/30"></div>
            
            {/* 文章主体内容 - 苹果风格的排版和字体 */}
            <article 
              className="relative z-10 max-w-none p-8 sm:p-10 md:p-16 lg:p-20 article-content"
            >
              <div
                className="prose dark:prose-invert prose-img:rounded-xl prose-headings:font-medium prose-headings:tracking-tight prose-headings:text-gray-900 dark:prose-headings:text-white"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              ></div>
            </article>
          </div>
          
          {/* 文章底部 */}
          <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
            <Link 
              href="/blog" 
              className="inline-flex items-center text-[rgb(0,113,227)] dark:text-[rgb(10,132,255)] hover:underline font-medium"
            >
              <ChevronLeft size={18} className="mr-1" />
              返回文章列表
            </Link>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error("Error loading blog post:", error);
    return (
      <main className="flex min-h-screen pt-24 px-4 sm:px-6 md:px-8">
        <div className="max-w-3xl mx-auto w-full text-center">
          <h1 className="text-3xl font-bold text-red-500 mb-4">文章加载出错</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">抱歉，加载文章时发生错误。</p>
          <Link 
            href="/blog" 
            className="inline-flex items-center text-[rgb(0,113,227)] dark:text-[rgb(10,132,255)] hover:underline font-medium"
          >
            <ChevronLeft size={18} className="mr-1" />
            返回文章列表
          </Link>
        </div>
      </main>
    );
  }
}
