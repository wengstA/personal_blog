"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import fs from 'fs/promises';
import path from 'path';

// 文章类型定义
interface Article {
  title: string;
  slug: string;
  category: string;
  date: string;
  excerpt: string;
  readingTime: string;
}

export default function Dashboard() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // 检查是否已认证
    const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
    if (!isAuthenticated) {
      router.push('/admin/login');
      return;
    }

    // 获取文章列表
    fetchArticles();
  }, [router]);

  const fetchArticles = async () => {
    try {
      // 在实际应用中，这应该是API请求
      // 由于我们暂时没有后端API，这里使用示例数据
      const sampleArticles: Article[] = [
        {
          title: 'AI革命：探索大语言模型的前沿',
          slug: 'ai-revolution',
          category: 'ai',
          date: '2023-07-15',
          excerpt: '探索人工智能和大语言模型的最新发展及其对未来的影响。',
          readingTime: '8 min'
        },
        {
          title: '量子计算入门指南',
          slug: 'quantum-computing-guide',
          category: 'tech',
          date: '2023-06-30',
          excerpt: '量子计算基础知识及其对现代科技的潜在影响的综合指南。',
          readingTime: '12 min'
        }
      ];
      
      setArticles(sampleArticles);
      setLoading(false);
    } catch (error) {
      console.error("获取文章失败:", error);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    router.push('/admin/login');
  };

  const deleteArticle = (slug: string) => {
    // 提示确认
    if (!confirm('确定要删除这篇文章吗？')) return;
    
    // 模拟删除操作
    setArticles(articles.filter(article => article.slug !== slug));
    // 实际应用中，这里应调用API删除文章
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">管理后台</h1>
          <div className="flex items-center space-x-4">
            <Link 
              href="/admin/new-article" 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              新建文章
            </Link>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              退出登录
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">文章列表</h2>
          
          {loading ? (
            <div className="text-center py-10">
              <p className="text-gray-500 dark:text-gray-400">加载中...</p>
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 dark:text-gray-400">暂无文章</p>
              <Link 
                href="/admin/new-article"
                className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                创建第一篇文章
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      标题
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      分类
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      发布日期
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      阅读时间
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {articles.map((article) => (
                    <tr key={article.slug} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{article.title}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">{article.excerpt}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                          {article.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {article.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {article.readingTime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          href={`/admin/edit-article/${article.slug}`}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-4"
                        >
                          编辑
                        </Link>
                        <button
                          onClick={() => deleteArticle(article.slug)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        >
                          删除
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
