import { NextResponse } from 'next/server';
import { fal } from '@fal-ai/client';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return NextResponse.json(
        { error: '没有上传图片' },
        { status: 400 }
      );
    }

    // 将文件转换为Base64
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = buffer.toString('base64');
    const dataUrl = `data:${file.type};base64,${base64Image}`;

    // 设置FAL API密钥
    fal.config({
      credentials: process.env.FAL_KEY,
    });

    // 调用FAL API
    const result = await fal.subscribe('fal-ai/ghiblify', {
      input: {
        image_url: dataUrl
      },
      logs: true,
    });

    if (!result || !result.data || !result.data.image) {
      return NextResponse.json(
        { error: 'API调用失败' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      imageUrl: result.data.image
    });
  } catch (error) {
    console.error('转换出错:', error);
    return NextResponse.json(
      { error: '图片处理过程中出错' },
      { status: 500 }
    );
  }
} 