"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Lock, User, Home } from 'lucide-react';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        router.push('/admin/dashboard');
      } else {
        setError('密码不正确，请重试');
      }
    } catch (error) {
      setError('登录失败，请检查网络连接');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 px-4">
      <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
            <Lock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">管理员登录</CardTitle>
            <CardDescription className="text-base mt-2">
              请输入管理密码以访问后台
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent>
          {error && (
            <Alert className="mb-6 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/30">
              <AlertDescription className="text-red-700 dark:text-red-400">
                {error}
              </AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                管理密码
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-11"
                  placeholder="请输入管理密码"
                  required
                />
              </div>
            </div>
            
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>登录中...</span>
                </div>
              ) : (
                '登录'
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <Link 
              href="/" 
              className="inline-flex items-center space-x-1 text-sm text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>返回首页</span>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
