"use client"

import { io } from 'socket.io-client';
import { getAccessToken } from './axiosInstance';

export function createChatSocket(nickname: string) {
  const nick = typeof nickname === 'string' ? nickname.trim() : '';
  return io(process.env.NEXT_PUBLIC_API_URL, {
    withCredentials: true,
    auth: {
      token: getAccessToken() || undefined,
      nickname: nick || 'Гость',
    },
  });
}