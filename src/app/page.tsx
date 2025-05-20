'use client';

import { useState } from 'react';
import ImageUploader from '@/components/ImageUploader';
import ImageResult from '@/components/ImageResult';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (file: File) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await fetch('/api/transform', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || '图片转换失败');
      }
      
      setResultImage(data.imageUrl);
    } catch (err) {
      console.error('转换错误:', err);
      setError(err instanceof Error ? err.message : '图片转换过程中出错');
      setResultImage(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
      <div className="z-10 max-w-5xl w-full flex flex-col items-center justify-center">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 mb-3">
            Pictoon.ai
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            将您的照片转换为精美的动漫风格图片
          </p>
        </div>

        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">上传图片</h2>
            <ImageUploader 
              onImageUpload={handleImageUpload}
              isLoading={isLoading}
            />
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">动漫风格</h2>
            <ImageResult 
              imageUrl={resultImage} 
              isLoading={isLoading}
            />
            {error && (
              <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
                {error}
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-6">为什么选择 Pictoon.ai?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">快速转换</h3>
              <p className="text-gray-600">几秒钟内完成图片转换，无需等待</p>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="bg-purple-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">高品质结果</h3>
              <p className="text-gray-600">采用先进AI技术，生成精美动漫风格图片</p>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">简单易用</h3>
              <p className="text-gray-600">无需注册，只需上传照片即可立即转换</p>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="w-full mt-20 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Pictoon.ai - 全球最好的动漫风格图片转换网站</p>
      </footer>
    </main>
  );
}
