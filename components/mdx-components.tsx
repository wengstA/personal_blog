import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// Define the custom MDX components with Apple-inspired styling
export const MDXComponents = {
  // Headings
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 
      className={cn(
        "mt-10 mb-4 text-3xl md:text-4xl font-bold text-gray-900 dark:text-white",
        className
      )} 
      {...props} 
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 
      className={cn(
        "mt-10 mb-4 text-2xl md:text-3xl font-bold text-gray-900 dark:text-white",
        className
      )} 
      {...props} 
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 
      className={cn(
        "mt-8 mb-3 text-xl md:text-2xl font-bold text-gray-900 dark:text-white",
        className
      )} 
      {...props} 
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 
      className={cn(
        "mt-6 mb-3 text-lg md:text-xl font-bold text-gray-900 dark:text-white",
        className
      )} 
      {...props} 
    />
  ),
  
  // Paragraphs
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p 
      className={cn(
        "my-4 leading-relaxed text-gray-800 dark:text-gray-200",
        className
      )} 
      {...props} 
    />
  ),
  
  // Lists
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul 
      className={cn(
        "my-6 ml-6 list-disc marker:text-[rgb(0,113,227)] dark:marker:text-[rgb(10,132,255)]",
        className
      )} 
      {...props} 
    />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol 
      className={cn(
        "my-6 ml-6 list-decimal marker:text-[rgb(0,113,227)] dark:marker:text-[rgb(10,132,255)]",
        className
      )} 
      {...props} 
    />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li 
      className={cn(
        "mt-2",
        className
      )} 
      {...props} 
    />
  ),
  
  // Links with Apple-styled blue color
  a: ({ className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a 
      className={cn(
        "text-[rgb(0,113,227)] dark:text-[rgb(10,132,255)] font-medium hover:underline",
        className
      )} 
      {...props} 
    />
  ),
  
  // Blockquotes with Apple-style design
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote 
      className={cn(
        "my-6 border-l-4 border-[rgb(0,113,227)] dark:border-[rgb(10,132,255)] pl-6 italic text-gray-700 dark:text-gray-300",
        className
      )} 
      {...props} 
    />
  ),
  
  // Code blocks with syntax highlighting
  pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre 
      className={cn(
        "my-6 overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4",
        className
      )} 
      {...props} 
    />
  ),
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code 
      className={cn(
        "relative rounded bg-gray-100 dark:bg-gray-800 px-[0.3rem] py-[0.2rem] font-mono text-sm text-gray-900 dark:text-gray-200",
        className
      )} 
      {...props} 
    />
  ),
  
  // Tables
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table 
        className={cn(
          "w-full border-collapse text-sm",
          className
        )} 
        {...props} 
      />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr 
      className={cn(
        "border-b border-gray-200 dark:border-gray-700",
        className
      )} 
      {...props} 
    />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableHeaderCellElement>) => (
    <th 
      className={cn(
        "px-4 py-3 text-left font-medium text-gray-900 dark:text-white",
        className
      )} 
      {...props} 
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableDataCellElement>) => (
    <td 
      className={cn(
        "px-4 py-3 text-left",
        className
      )} 
      {...props} 
    />
  ),
  
  // Images with Next.js Image component
  img: ({ className, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <div className="my-6 rounded-lg overflow-hidden">
      {/* @ts-ignore */}
      <Image 
        className={cn(
          "rounded-lg",
          className
        )}
        alt={alt || "Blog image"} 
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
        {...props} 
      />
    </div>
  ),
  
  // Horizontal rule
  hr: ({ ...props }) => (
    <hr className="my-8 border-gray-200 dark:border-gray-700" {...props} />
  ),
};
