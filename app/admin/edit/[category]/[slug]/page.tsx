"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  FileText, 
  Settings,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { ImageUpload } from '@/components/admin/image-upload';
import { EnhancedMDEditor } from '@/components/admin/enhanced-md-editor';

interface PageProps {
  params: Promise<{ category: string; slug: string }>;
}

export default function EditArticle({ params }: PageProps) {
  const [resolvedParams, setResolvedParams] = useState<{ category: string; slug: string } | null>(null);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [heroImage, setHeroImage] = useState('');
  const [readingTime, setReadingTime] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const router = useRouter();

  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  useEffect(() => {
    if (resolvedParams) {
      loadArticle();
    }
  }, [resolvedParams]);

  // Auto-calculate reading time
  useEffect(() => {
    if (content) {
      const wordCount = content.replace(/[#*`_~]/g, '').split(/\s+/).length;
      const minutes = Math.ceil(wordCount / 200);
      setReadingTime(`${minutes} min`);
    }
  }, [content]);

  const categories = [
    { value: 'ai', label: 'AI探索' },
    { value: 'interaction_with_world', label: '世界-交互' },
    { value: 'personal_growth', label: '个人成长' }
  ];

  const loadArticle = async () => {
    if (!resolvedParams) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/blog/${resolvedParams.category}/${resolvedParams.slug}`);
      
      if (!response.ok) {
        throw new Error('文章不存在或加载失败');
      }

      const data = await response.json();
      setTitle(data.frontmatter.title || '');
      setSlug(data.slug || '');
      setCategory(data.category || '');
      setExcerpt(data.frontmatter.excerpt || '');
      setContent(data.content || '');
      setHeroImage(data.frontmatter.heroImage || '');
      setReadingTime(data.frontmatter.readingTime || '');
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : '加载文章失败'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    if (!resolvedParams) return;

    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      // 验证必填字段
      if (!title || !slug || !category || !content) {
        throw new Error('请填写所有必填字段');
      }

      const response = await fetch(`/api/blog/${resolvedParams.category}/${resolvedParams.slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          newSlug: slug,
          newCategory: category,
          excerpt,
          content,
          heroImage,
          readingTime
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage({
          type: 'success',
          text: '文章更新成功！'
        });
        
        setTimeout(() => {
          router.push('/admin/dashboard');
        }, 1500);
      } else {
        const error = await response.json();
        throw new Error(error.error || '更新文章失败');
      }
      
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : '更新文章失败'
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
          <span className="text-lg text-muted-foreground">加载文章中...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">编辑文章</h1>
              <p className="text-sm text-muted-foreground">{title || '加载中...'}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" asChild>
              <Link href="/admin/dashboard">
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回仪表盘
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success/Error Messages */}
        {message.text && (
          <Alert className={`mb-6 ${
            message.type === 'error' 
              ? 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/30' 
              : 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/30'
          }`}>
            {message.type === 'error' ? (
              <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
            ) : (
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
            )}
            <AlertDescription className={`${
              message.type === 'error' 
                ? 'text-red-700 dark:text-red-400' 
                : 'text-green-700 dark:text-green-400'
            }`}>
              {message.text}
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Article Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>文章设置</span>
              </CardTitle>
              <CardDescription>
                编辑文章的基本信息和元数据
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">
                    文章标题 <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="输入文章标题..."
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="slug">
                    URL Slug <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="文章URL标识"
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    修改将改变文章URL
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">
                    分类 <span className="text-red-500">*</span>
                  </Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger>
                      <SelectValue placeholder="选择文章分类" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="readingTime">预计阅读时间</Label>
                  <Input
                    id="readingTime"
                    value={readingTime}
                    onChange={(e) => setReadingTime(e.target.value)}
                    placeholder="自动计算"
                    disabled
                  />
                  <p className="text-sm text-muted-foreground">
                    基于字数自动计算
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="excerpt">文章摘要</Label>
                <Textarea
                  id="excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="简短描述文章内容..."
                  rows={3}
                />
              </div>
              
              <ImageUpload
                value={heroImage}
                onChange={setHeroImage}
                label="封面图片 (可选)"
                placeholder="输入图片URL或上传图片作为文章封面"
              />
            </CardContent>
          </Card>

          {/* Markdown Editor */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Eye className="w-5 h-5" />
                  <span>文章内容</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  支持 Markdown 语法
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <EnhancedMDEditor
                value={content}
                onChange={setContent}
                height={600}
              />
            </CardContent>
          </Card>

          {/* Submit Actions */}
          <div className="flex justify-end space-x-4">
            <Button variant="outline" asChild>
              <Link href="/admin/dashboard">
                取消
              </Link>
            </Button>
            <Button
              type="submit"
              disabled={saving}
              className="min-w-[120px]"
            >
              {saving ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>保存中...</span>
                </div>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  保存更改
                </>
              )}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}