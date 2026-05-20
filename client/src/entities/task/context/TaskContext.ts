"use client"
import { createContext } from 'react';
import { TaskContextType } from '../model';

// undefined - это резервное значение, которое возвращаем, если обращаемся извне контекста

export const TaskContext = createContext<TaskContextType | undefined>(undefined)