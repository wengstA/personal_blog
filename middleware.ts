import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 这个简单的中间件用于示例目的
// 实际生产环境应使用更安全的身份验证方法，如JWT或OAuth
export function middleware(request: NextRequest) {
  // 我们将在客户端组件中处理认证检查
  // 此中间件文件是为未来扩展准备的
  
  // 例如，在实际应用中，您可能需要：
  // 1. 验证JWT令牌
  // 2. 检查会话cookie
  // 3. 重定向未认证用户
  
  return NextResponse.next();
}

// 配置匹配的路由
export const config = {
  matcher: ['/admin/:path*'],
};
