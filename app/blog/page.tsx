import { Metadata } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { ArrowRight, Clock, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "浪潮沉思录 | Vincent的个人博客",
  description: "关于世界交互、AI探索与个人成长的思考与记录",
};

// 利用ISR优化页面加载速度
export const revalidate = 3600; // 每小时重新验证一次数据

interface BlogPost {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    category: string;
    excerpt: string;
    heroImage?: string;
    readingTime: string;
  };
  categorySlug: string;
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

async function getBlogPosts(): Promise<BlogPost[]> {
  const blogDir = path.join(process.cwd(), 'content/blog');
  const categoryDirs = fs.readdirSync(blogDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  let allPosts: BlogPost[] = [];
  
  for (const categorySlug of categoryDirs) {
    const categoryPath = path.join(blogDir, categorySlug);
    const files = fs.readdirSync(categoryPath)
      .filter(file => file.endsWith('.md'));
    
    for (const file of files) {
      const filePath = path.join(categoryPath, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data: frontmatter } = matter(fileContent);
      const slug = file.replace('.md', '');
      
      allPosts.push({
        slug,
        frontmatter: frontmatter as BlogPost['frontmatter'],
        categorySlug,
      });
    }
  }
  
  // Sort posts by date (newest first)
  allPosts.sort((a, b) => 
    new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  );
  
  return allPosts;
}

export default async function BlogPage() {
  const posts = await getBlogPosts();
  
  // Group posts by category
  const categorizedPosts: Record<string, BlogPost[]> = {};
  posts.forEach(post => {
    if (!categorizedPosts[post.categorySlug]) {
      categorizedPosts[post.categorySlug] = [];
    }
    categorizedPosts[post.categorySlug].push(post);
  });
  
  // Get all category slugs for navigation
  const categories = Object.keys(categorizedPosts);
  
  return (
    <main className="flex min-h-screen pt-24 px-4 sm:px-6 md:px-8">
      {/* 左侧导航栏 */}
      <aside className="hidden md:block w-64 flex-shrink-0 pr-8">
        <div className="sticky top-28 space-y-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">分类导航</h3>
          <nav className="flex flex-col space-y-1.5">
            {categories.map(categorySlug => (
              <a
                key={categorySlug}
                href={`#${categorySlug}`}
                className="flex items-center px-4 py-2.5 rounded-lg bg-transparent hover:bg-gray-100/50 dark:hover:bg-gray-800/50 text-gray-800 dark:text-gray-200 font-medium transition-colors border-l-2 border-transparent hover:border-[rgb(0,113,227)] dark:hover:border-[rgb(10,132,255)]"
              >
                <span className="mr-3 text-xl">{getCategoryIcon(categorySlug)}</span>
                {getCategoryTitle(categorySlug)}
              </a>
            ))}
          </nav>
        </div>
      </aside>
      
      {/* 主要内容区 */}
      <div className="flex-1 max-w-3xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300">
            浪潮沉思录
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
            在信息的浪潮中，沉淀思考，探索世界与自我
          </p>
          
          {/* 移动设备的分类快速导航 */}
          <nav className="flex md:hidden flex-wrap gap-2 my-6">
            {categories.map(categorySlug => (
              <a
                key={categorySlug}
                href={`#${categorySlug}`}
                className="flex items-center px-4 py-2 rounded-full bg-gray-100/50 hover:bg-gray-200/50 dark:bg-gray-800/50 dark:hover:bg-gray-700/50 text-gray-800 dark:text-gray-200 font-medium transition-colors"
              >
                <span className="mr-2">{getCategoryIcon(categorySlug)}</span>
                {getCategoryTitle(categorySlug)}
              </a>
            ))}
          </nav>
        </header>
        
        {/* 遍历类别 */}
        {Object.keys(categorizedPosts).map(categorySlug => (
          <section key={categorySlug} id={categorySlug} className="mb-16 scroll-mt-32">
            <div className="flex items-center mb-6 gap-3 sticky top-20 z-20 py-3 px-5 bg-white/40 dark:bg-[rgb(28,28,30)]/40 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-xl shadow-lg before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/10 before:to-transparent before:rounded-xl before:-z-10 overflow-hidden transition-all duration-300">
              <span className="text-2xl md:text-3xl" aria-hidden="true">
                {getCategoryIcon(categorySlug)}
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                {getCategoryTitle(categorySlug)}
              </h2>
            </div>
            
            <div className="space-y-3">
              {categorizedPosts[categorySlug].map(post => (
                <Link 
                  href={`/blog/${post.categorySlug}/${post.slug}`} 
                  key={`${post.categorySlug}/${post.slug}`}
                  className="group block"
                >
                  <article className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 md:p-5 rounded-xl bg-white dark:bg-[rgb(28,28,30)] shadow-sm hover:shadow-md dark:shadow-gray-800 transition-all duration-300 border border-gray-100 dark:border-gray-800">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-[rgb(0,113,227)] dark:group-hover:text-[rgb(10,132,255)] transition-colors duration-200 line-clamp-1">
                        {post.frontmatter.title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-3 md:mb-0">
                        {post.frontmatter.excerpt}
                      </p>
                    </div>
                    
                    <div className="flex flex-row md:flex-col items-center md:items-end gap-4 md:gap-2 w-full md:w-auto">
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 space-x-4">
                        <span className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          {new Date(post.frontmatter.date).toLocaleDateString('zh-CN', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                        <span className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          {post.frontmatter.readingTime}
                        </span>
                      </div>
                      
                      <span className="text-[rgb(0,113,227)] dark:text-[rgb(10,132,255)] group-hover:translate-x-1 transition-transform duration-200 font-medium text-sm flex items-center ml-auto md:ml-0 whitespace-nowrap">
                        阅读全文
                        <ArrowRight size={16} className="ml-1" />
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
