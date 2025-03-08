"use client";

import { useEffect } from "react";

/**
 * 魔法光标动画组件
 * 响应自定义事件 'activateMagicCursor'，为联系方式区域添加视觉效果
 */
export function MagicCursor() {
  useEffect(() => {
    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0% { transform: scale(1); opacity: 0.8; }
        50% { transform: scale(1.05); opacity: 1; }
        100% { transform: scale(1); opacity: 0.8; }
      }
      
      .magic-cursor-active {
        opacity: 1 !important;
        border-color: rgb(0, 113, 227) !important;
        box-shadow: 0 0 15px rgba(0, 113, 227, 0.3), 0 0 30px rgba(0, 113, 227, 0.1) !important;
        animation: pulse 2s infinite ease-in-out !important;
      }
    `;
    document.head.appendChild(style);

    // 处理魔法光标动画
    const handleMagicCursor = () => {
      console.log('魔法光标事件触发');
      const cursor = document.getElementById('magic-cursor');
      if (!cursor) {
        console.error('魔法光标元素未找到');
        return;
      }
      
      // 重置光标样式
      cursor.style.transition = 'none';
      cursor.style.opacity = '0';
      cursor.style.borderColor = 'transparent';
      cursor.style.transform = 'scale(1)';
      cursor.style.boxShadow = 'none';
      
      // 强制重绘
      void cursor.offsetWidth;
      
      // 添加动画类
      requestAnimationFrame(() => {
        cursor.classList.add('magic-cursor-active');
        console.log('添加魔法光标动画类');
        
        // 5秒后移除动画
        setTimeout(() => {
          cursor.style.transition = 'all 0.5s ease-out';
          cursor.classList.remove('magic-cursor-active');
          cursor.style.opacity = '0';
          console.log('移除魔法光标动画');
        }, 5000);
      });
    };
    
    // 监听自定义事件
    console.log('注册魔法光标事件监听器');
    window.addEventListener('activateMagicCursor', handleMagicCursor);
    
    // 清理函数
    return () => {
      window.removeEventListener('activateMagicCursor', handleMagicCursor);
      document.head.removeChild(style);
    };
  }, []);
  
  return null;
}
