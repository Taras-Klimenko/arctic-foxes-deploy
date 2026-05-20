const { Task } = require('../db/models');

class TaskService {
  // получить все задачи
  static async getAllTasks() {
    return await Task.findAll();
  }

  // получить одну задачу по ID
  static async getTaskById(id) {
    return await Task.findByPk(id);
  }

  // создать задачу в БД
  static async createTask(newTask) {
    return await Task.create(newTask);
  }

  // обновить задачу в БД
  static async updateTask(id, updatedTask, userId) {
    const task = await Task.findByPk(id);

    if (!task) {
      return null;
    }
    // Предотвращение уязвимости IDOR
    if (task.user_id !== userId) {
      return null;
    }

    const { title, text } = updatedTask;

    if (title) {
      task.title = title;
    }
    if (text) {
      task.text = text;
    }

    await task.save();
    return task;
  }

  // удалить задачу из БД
  static async deleteTask(id, userId) {
    const task = await Task.findByPk(id);

    if (!task) {
      return null;
    }
    //  Проверка авторства задачи
    if (task.user_id !== userId) {
      return null;
    }

    await task.destroy();

    return true;
  }
}

module.exports = TaskService;
