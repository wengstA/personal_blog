"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Plus, 
  LogOut, 
  Edit3, 
  Trash2, 
  Calendar, 
  Clock, 
  FileText,
  RefreshCcw
} from 'lucide-react';

// 文章类型定义
interface Article {
  slug: string;
  category: string;
  frontmatter: {
    title: string;
    date: string;
    excerpt: string;
    readingTime: string;
  };
  fileName: string;
}

export default function Dashboard() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch('/api/blog');
      
      if (!response.ok) {
        throw new Error('获取文章失败');
      }

      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error("获取文章失败:", error);
      setError('获取文章失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth', { method: 'DELETE' });
      router.push('/admin/login');
    } catch (error) {
      console.error('登出失败:', error);
    }
  };

  const deleteArticle = async (category: string, slug: string) => {
    if (!confirm('确定要删除这篇文章吗？此操作无法撤销。')) return;
    
    try {
      const response = await fetch(`/api/blog/${category}/${slug}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setArticles(articles.filter(article => !(article.slug === slug && article.category === category)));
      } else {
        alert('删除失败，请重试');
      }
    } catch (error) {
      console.error('删除文章失败:', error);
      alert('删除失败，请重试');
    }
  };

  const getCategoryTitle = (categorySlug: string): string => {
    const categoryMap: Record<string, string> = {
      'interaction_with_world': '世界-交互',
      'ai': 'AI探索',
      'personal_growth': '个人成长'
    };
    return categoryMap[categorySlug] || categorySlug;
  };

  const getCategoryColor = (categorySlug: string): string => {
    const colorMap: Record<string, string> = {
      'interaction_with_world': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      'ai': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      'personal_growth': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
    };
    return colorMap[categorySlug] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">博客管理后台</h1>
          </div>
          <div className="flex items-center space-x-3">
            <Button onClick={fetchArticles} variant="outline" size="sm">
              <RefreshCcw className="w-4 h-4 mr-2" />
              刷新
            </Button>
            <Button asChild>
              <Link href="/admin/new-article">
                <Plus className="w-4 h-4 mr-2" />
                新建文章
              </Link>
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              退出登录
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">总文章数</p>
                  <p className="text-2xl font-bold">{articles.length}</p>
                </div>
                <FileText className="w-8 h-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">分类数</p>
                  <p className="text-2xl font-bold">{new Set(articles.map(a => a.category)).size}</p>
                </div>
                <Badge className="w-8 h-8 rounded-full flex items-center justify-center">
                  {new Set(articles.map(a => a.category)).size}
                </Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">最近更新</p>
                  <p className="text-sm text-muted-foreground">
                    {articles.length > 0 ? new Date(articles[0].frontmatter.date).toLocaleDateString('zh-CN') : '暂无'}
                  </p>
                </div>
                <Calendar className="w-8 h-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Articles List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>文章列表</span>
              {articles.length > 0 && (
                <Badge variant="secondary">{articles.length} 篇文章</Badge>
              )}
            </CardTitle>
            <CardDescription>
              管理您的所有博客文章，点击编辑或删除进行操作
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert className="mb-6 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/30">
                <AlertDescription className="text-red-700 dark:text-red-400">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {loading ? (
              <div className="flex items-center justify-center py-16">
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  <span className="text-muted-foreground">加载中...</span>
                </div>
              </div>
            ) : articles.length === 0 ? (
              <div className="text-center py-16">
                <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-xl font-semibold text-muted-foreground mb-2">还没有文章</p>
                <p className="text-muted-foreground mb-6">开始创建您的第一篇博客文章吧</p>
                <Button asChild>
                  <Link href="/admin/new-article">
                    <Plus className="w-4 h-4 mr-2" />
                    创建第一篇文章
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {articles.map((article) => (
                  <div
                    key={`${article.category}-${article.slug}`}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">
                            {article.frontmatter.title}
                          </h3>
                          <Badge className={getCategoryColor(article.category)}>
                            {getCategoryTitle(article.category)}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {article.frontmatter.excerpt}
                        </p>
                        
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(article.frontmatter.date).toLocaleDateString('zh-CN')}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {article.frontmatter.readingTime}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/admin/edit/${article.category}/${article.slug}`}>
                            <Edit3 className="w-3 h-3 mr-1" />
                            编辑
                          </Link>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-900/30"
                          onClick={() => deleteArticle(article.category, article.slug)}
                        >
                          <Trash2 className="w-3 h-3 mr-1" />
                          删除
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
