import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pictoon.ai - 将照片转换为动漫风格",
  description: "使用AI技术将您的照片转换为精美的动漫风格图片，简单快速且高品质",
  keywords: "动漫风格, 照片转换, AI图像, 照片变动漫, 宫崎骏风格, 图片转换",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
