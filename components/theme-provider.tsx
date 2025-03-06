"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // 强制在客户端渲染
  const [mounted, setMounted] = React.useState(false);
  
  // 确保挂载后才渲染，避免服务器与客户端不匹配
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // 当未挂载时提供一个空的div防止布局偏移
  if (!mounted) {
    return <div style={{ visibility: "hidden" }}>{children}</div>;
  }
  
  return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme="light" 
      enableSystem={false} // 禁用系统主题，使用显式的深色/浅色切换
      storageKey="theme" // 添加明确的存储键名
      disableTransitionOnChange={false}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
