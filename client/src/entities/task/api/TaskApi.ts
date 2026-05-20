import { axiosInstance } from '@/shared/lib/axiosInstance';
import { AxiosError } from 'axios';
import { NewTaskDataType } from '../model';

export default class TaskApi {
  static async getAllTasks() {
    try {
      const response = await axiosInstance.get('/tasks');
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return error.response?.data;
      }
      return { statusCode: 500, message: 'Неизвестная ошибка' }
    }
  }

  static async getOneTask(id: number) {
    try {
      const response = await axiosInstance.get(`/tasks/${id}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return error.response?.data;
      }
      return { statusCode: 500, message: 'Неизвестная ошибка' }
    }
  }

  static async createTask(taskData: NewTaskDataType) {
    try {
      const response = await axiosInstance.post('/tasks', taskData);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return error.response?.data;
      }
      return { statusCode: 500, message: 'Неизвестная ошибка' }
    }
  }

  static async deleteTask(id:number) {
    try {
      const response = await axiosInstance.delete(`/tasks/${id}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return error.response?.data;
      }
      return { statusCode: 500, message: 'Неизвестная ошибка' }
    }
  }

  static async updateTask(id:number, taskData: NewTaskDataType) {
    try {
      const response = await axiosInstance.put(`/tasks/${id}`, taskData);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return error.response?.data;
      }
      return { statusCode: 500, message: 'Неизвестная ошибка' }
    }
  }
}
