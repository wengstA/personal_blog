"use client";

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, X, Image as ImageIcon, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
}

export function ImageUpload({ 
  value = '', 
  onChange, 
  label = "图片",
  placeholder = "输入图片URL或上传图片",
  className = ""
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const uploadFile = async (file: File) => {
    setUploading(true);
    setError('');
    setSuccess(false);

    try {
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
      onChange(url);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      uploadFile(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false
  });

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadFile(file);
    }
  };

  const clearImage = () => {
    onChange('');
    setError('');
    setSuccess(false);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="space-y-2">
        <Label>{label}</Label>
        
        {/* URL Input */}
        <div className="flex space-x-2">
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="flex-1"
          />
          {value && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={clearImage}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Upload Area */}
        <Card 
          {...getRootProps()} 
          className={`border-2 border-dashed cursor-pointer transition-colors ${
            isDragActive 
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20' 
              : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
          }`}
        >
          <CardContent className="flex flex-col items-center justify-center py-8 px-6">
            <input {...getInputProps()} />
            
            {uploading ? (
              <div className="flex flex-col items-center space-y-2">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                <p className="text-sm text-muted-foreground">上传中...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-3 text-center">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                  <Upload className="w-6 h-6 text-gray-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    {isDragActive ? '释放文件到这里' : '拖拽图片到这里或点击上传'}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    支持 JPEG、PNG、GIF、WebP，最大 10MB
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  className="hidden"
                  id="file-upload"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  <ImageIcon className="w-4 h-4 mr-2" />
                  选择文件
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Messages */}
        {error && (
          <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/30">
            <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
            <AlertDescription className="text-red-700 dark:text-red-400">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/30">
            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertDescription className="text-green-700 dark:text-green-400">
              图片上传成功！
            </AlertDescription>
          </Alert>
        )}

        {/* Preview */}
        {value && (
          <div className="mt-4">
            <Label className="text-sm text-muted-foreground mb-2 block">预览</Label>
            <div className="relative inline-block">
              <img
                src={value}
                alt="Preview"
                className="max-w-full h-48 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}