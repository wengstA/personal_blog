import React from 'react';

export default function Custom404() {
  return (
    <div className="flex items-center justify-center min-h-[70vh] flex-col px-4">
      <h1 className="text-4xl font-bold mb-4 text-foreground">404 - 页面未找到</h1>
      <p className="text-xl text-muted-foreground mb-8">抱歉，您要查找的页面不存在。</p>
      <a 
        href="/" 
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
      >
        返回主页
      </a>
    </div>
  );
}
