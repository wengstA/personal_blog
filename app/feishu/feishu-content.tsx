"use client"

import React, { Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Loading component for inner content
function FeishuContentLoading() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-24 px-4 sm:px-6 md:px-8">
      <div className="w-full max-w-6xl mx-auto">

        <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800 h-[calc(100vh-10rem)] bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <div className="text-lg text-[rgb(48,48,48)] dark:text-white animate-pulse">
            加载中...
          </div>
        </div>
      </div>
    </main>
  );
}

// Inner component with the actual content
function FeishuInnerContent() {
  // Import useSearchParams within the client component
  const { useSearchParams } = require('next/navigation');
  const searchParams = useSearchParams();
  const url = searchParams?.get('url') || undefined;
  
  // Get title based on the URL parameter without state
  const getTitle = () => {
    if (!url) return '飞书文档';
    
    if (url.includes('Ahk2wKrREi4BVykCrg4cWlqGn7f')) {
      return '关于我';
    } else if (url.includes('PMo2wLeeZigWCykoDjdcqG00nLh')) {
      return '学习笔记';
    } else {
      return '飞书文档';
    }
  };
  
  // Get the document title
  const title = getTitle();
  
  // Handle back navigation gracefully
  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/';
    }
  };

  // Apple-inspired styling consistent with the rest of the site
  return (
    <main className="flex min-h-screen flex-col items-center pt-24 px-4 sm:px-6 md:px-8">
      <div className="w-full max-w-6xl mx-auto">

        
        {/* Main content with iframe */}
        {url ? (
          <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800 h-[calc(100vh-10rem)]">
            <iframe 
              src={url}
              className="w-full h-full" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="h-[calc(100vh-10rem)] flex items-center justify-center">
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
      </div>
    </main>
  );
}

// Main exported component with Suspense boundary
export default function FeishuClientContent() {
  // Wrap with Suspense to handle useSearchParams properly
  return (
    <Suspense fallback={<FeishuContentLoading />}>
      <FeishuInnerContent />
    </Suspense>
  );
}
