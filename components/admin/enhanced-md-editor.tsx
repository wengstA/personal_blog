"use client";

import { useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';
import { toast } from 'sonner';

// Dynamically import the markdown editor to avoid SSR issues
const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
);

interface EnhancedMDEditorProps {
  value: string;
  onChange: (value: string) => void;
  height?: number;
}

export function EnhancedMDEditor({ value, onChange, height = 600 }: EnhancedMDEditorProps) {
  const editorRef = useRef<any>(null);

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Upload failed');
    }

    const { url } = await response.json();
    return url;
  };

  const handlePaste = useCallback(async (event: ClipboardEvent) => {
    const items = event.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      
      // Check if the item is an image
      if (item.type.startsWith('image/')) {
        event.preventDefault();
        
        const file = item.getAsFile();
        if (!file) continue;

        try {
          // Show loading state
          const loadingText = '\n![Uploading...]()\n';
          onChange(value + loadingText);
          
          // Upload the image
          const imageUrl = await uploadImage(file);
          
          // Replace loading text with actual image markdown
          const imageMarkdown = `\n![Image](${imageUrl})\n`;
          onChange(value.replace(loadingText, imageMarkdown));
          
          toast.success('Image uploaded successfully!');
        } catch (error) {
          // Remove loading text on error
          onChange(value.replace('\n![Uploading...]()\n', ''));
          toast.error(`Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }
    }
  }, [value, onChange]);

  const handleDrop = useCallback(async (event: DragEvent) => {
    event.preventDefault();
    
    const files = event.dataTransfer?.files;
    if (!files || files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Check if the file is an image
      if (file.type.startsWith('image/')) {
        try {
          // Show loading state
          const loadingText = '\n![Uploading...]()\n';
          onChange(value + loadingText);
          
          // Upload the image
          const imageUrl = await uploadImage(file);
          
          // Replace loading text with actual image markdown
          const imageMarkdown = `\n![${file.name}](${imageUrl})\n`;
          onChange(value.replace(loadingText, imageMarkdown));
          
          toast.success('Image uploaded successfully!');
        } catch (error) {
          // Remove loading text on error
          onChange(value.replace('\n![Uploading...]()\n', ''));
          toast.error(`Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }
    }
  }, [value, onChange]);

  return (
    <div 
      data-color-mode="auto" 
      className="w-full"
      onPaste={handlePaste}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <MDEditor
        ref={editorRef}
        value={value}
        onChange={(val) => onChange(val || '')}
        preview="live"
        height={height}
        visibleDragbar={false}
        data-testid="md-editor"
      />
      
      {/* Instructions */}
      <div className="mt-2 text-xs text-muted-foreground">
        💡 提示：可以直接粘贴图片或拖拽图片到编辑器中，会自动上传并插入 Markdown 链接
      </div>
    </div>
  );
}