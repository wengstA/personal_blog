"use client"

import React, { Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Loading skeleton specific for the inner client component
function InnerLoadingSkeleton() {
  return (
    <div className="h-[calc(100vh-10rem)] flex items-center justify-center">
      <div className="text-lg text-[rgb(48,48,48)] dark:text-white animate-pulse">
        加载中...
      </div>
    </div>
  );
}

// Inner component that uses useSearchParams
function FeishuContentInner() {
  "use client"
  const { useSearchParams } = require('next/navigation');
  const { useState, useEffect } = require('react');

  const searchParams = useSearchParams();
  const url = searchParams?.get('url') || undefined;
  const [title, setTitle] = useState('飞书文档');
  
  // Set the title based on the URL parameter
  useEffect(() => {
    if (url) {
      // Determine title based on document ID in the URL
      if (url.includes('Ahk2wKrREi4BVykCrg4cWlqGn7f')) {
        setTitle('关于我');
      } else if (url.includes('PMo2wLeeZigWCykoDjdcqG00nLh')) {
        setTitle('学习笔记');
      } else {
        setTitle('飞书文档');
      }
      
      // Update document title for browser tab
      document.title = `${title} | Vincent Weng`;
    }
  }, [url, title]);
  
  // Handle back navigation gracefully
  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/';
    }
  };

  return {
    url,
    title,
    handleBack
  };
}

// Main client component that wraps everything
export default function FeishuClient() {
  return (
    <Suspense fallback={
      <main className="flex min-h-screen flex-col items-center pt-24 px-4 sm:px-6 md:px-8">
        <div className="w-full max-w-6xl mx-auto">
          <InnerLoadingSkeleton />
        </div>
      </main>
    }>
      <FeishuClientContent />
    </Suspense>
  );
}

// Content wrapper that uses the inner component
function FeishuClientContent() {
  const { url, title, handleBack } = FeishuContentInner();
  
  // Add Apple-inspired styling consistent with the rest of the site
  return (
    <main className="flex min-h-screen flex-col items-center pt-24 px-4 sm:px-6 md:px-8">
      <div className="w-full max-w-6xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <button 
            onClick={handleBack}
            className="text-[rgb(0,113,227)] dark:text-[rgb(10,132,255)] hover:text-blue-700 dark:hover:text-blue-400 flex items-center gap-1 font-medium transition-colors"
          >
            <ArrowLeft size={18} />
            <span>返回</span>
          </button>
          <h1 className="text-xl font-semibold text-[rgb(48,48,48)] dark:text-white">{title}</h1>
          <div className="w-20"></div> {/* Spacer for centering title */}
        </div>
      
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
