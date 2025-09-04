"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewArticle() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const router = useRouter();

  useEffect(() => {
    // 检查是否已认证
    const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
    if (!isAuthenticated) {
      router.push('/admin/login');
    }
  }, [router]);

  // 自动生成slug
  useEffect(() => {
    if (title) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-');
      setSlug(generatedSlug);
    }
  }, [title]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // 在实际应用中，这将是一个API请求
      // 现在我们只模拟提交过程

      // 验证必填字段
      if (!title || !slug || !category || !content) {
        throw new Error('请填写所有必填字段');
      }

      // 构建markdown文件内容
      const date = new Date().toISOString().split('T')[0];
      const readingTime = Math.ceil(content.split(' ').length / 200) + ' min';
      
      const markdown = `---
title: "${title}"
date: "${date}"
category: "${category}"
excerpt: "${excerpt}"
readingTime: "${readingTime}"
---

${content}`;

      // 模拟成功
      console.log('文章内容:', markdown);
      
      // 显示成功消息
      setMessage({
        type: 'success',
        text: '文章创建成功！在实际应用中，这将保存到文件系统或数据库。'
      });
      
      // 在真实应用中，这里会调用API将文章保存到content/blog/[category]/[slug].md
      
      setTimeout(() => {
        // 重置表单或重定向
        // router.push('/admin/dashboard');
      }, 2000);
      
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : '创建文章失败'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">创建新文章</h1>
          <div>
            <Link 
              href="/admin/dashboard" 
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              返回仪表盘
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          {message.text && (
            <div 
              className={`mb-6 p-4 rounded-md ${
                message.type === 'error' 
                  ? 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400' 
                  : 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400'
              }`}
            >
              {message.text}
            </div>
          )}
          
          <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                标题 <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            
            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Slug <span className="text-red-500">*</span>
              </label>
              <input
                id="slug"
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                文章的URL标识，自动生成但可手动编辑
              </p>
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                分类 <span className="text-red-500">*</span>
              </label>
              <input
                id="category"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                例如: tech, ai, life
              </p>
            </div>
            
            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                摘要
              </label>
              <input
                id="excerpt"
                type="text"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              文章内容 (Markdown) <span className="text-red-500">*</span>
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={20}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white font-mono"
              required
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              支持Markdown格式
            </p>
          </div>
          
          <div className="flex justify-end space-x-4">
            <Link
              href="/admin/dashboard"
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              取消
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? '保存中...' : '保存文章'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
