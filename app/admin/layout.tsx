import { Inter as FontSans } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";

// 使用与主站相同的字体，但这是独立的布局
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

// 在服务端组件中导出元数据
export const metadata = {
  title: "博客管理后台",
  description: "个人博客管理系统",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans antialiased">
      {/* 这是完全独立的管理后台布局，不包含博客的导航栏和页脚 */}
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </div>
  );
}
