"use client";

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function FeishuPage() {
  const searchParams = useSearchParams();
  const url = searchParams.get('url');
  const [title, setTitle] = useState('学习笔记');
  
  // Handle back navigation gracefully
  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/';
    }
  };

  // Add Apple-inspired styling consistent with the rest of the site
  return (
    <div className="min-h-screen bg-[#f5f5f7] dark:bg-[rgb(28,28,30)] flex flex-col">
      {/* Header with back button and title */}
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-[rgb(28,28,30)]/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <button 
            onClick={handleBack}
            className="text-[rgb(0,113,227)] dark:text-[rgb(10,132,255)] hover:text-blue-700 dark:hover:text-blue-400 flex items-center gap-1 font-medium"
          >
            <ArrowLeft size={18} />
            <span>返回</span>
          </button>
          <h1 className="text-lg font-semibold text-[rgb(48,48,48)] dark:text-white">{title}</h1>
          <div className="w-20"></div> {/* Spacer for centering title */}
        </div>
      </header>
      
      {/* Main content with iframe */}
      <main className="flex-grow container mx-auto px-4 py-6">
        {url ? (
          <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800 h-[calc(100vh-8rem)]">
            <iframe 
              src={url}
              className="w-full h-full" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="h-[calc(100vh-8rem)] flex items-center justify-center">
            <div className="text-center p-8 rounded-lg bg-white dark:bg-gray-800 shadow-md">
              <p className="text-lg text-gray-600 dark:text-gray-300">未提供有效的飞书链接</p>
              <Link 
                href="/"
                className="mt-4 inline-block px-4 py-2 bg-[rgb(0,113,227)] dark:bg-[rgb(10,132,255)] text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
              >
                返回首页
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
