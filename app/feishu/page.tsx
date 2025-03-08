import { Suspense } from 'react';

// Loading skeleton with Apple-inspired styling
function FeishuPageSkeleton() {
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

// Client components import
import FeishuClientContent from './feishu-content';

// Server component
export default function FeishuPage() {
  return (
    <Suspense fallback={<FeishuPageSkeleton />}>
      <FeishuClientContent />
    </Suspense>
  );
}
