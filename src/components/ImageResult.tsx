'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ImageResultProps {
  imageUrl: string | null;
  isLoading: boolean;
}

export default function ImageResult({ imageUrl, isLoading }: ImageResultProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!imageUrl) return;
    
    try {
      setIsDownloading(true);
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `pictoon-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('下载失败', error);
    } finally {
      setIsDownloading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!imageUrl) {
    return (
      <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-400">转换后的图片将在这里显示</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="relative w-full h-64 mb-4">
        <Image 
          src={imageUrl} 
          alt="动漫风格图片" 
          fill 
          className="object-contain rounded-lg"
        />
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isDownloading ? '下载中...' : '下载图片'}
        </button>
      </div>
    </div>
  );
} 