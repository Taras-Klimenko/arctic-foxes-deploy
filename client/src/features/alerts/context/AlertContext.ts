"use client"
import { createContext } from 'react';
import { AlertContextType } from '../model';

// undefined - это резервное значение, которое возвращаем, если обращаемся извне контекста

export const AlertContext = createContext<AlertContextType | undefined>(undefined)