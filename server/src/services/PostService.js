const { Post } = require('../db/models');

class PostService {
  // получить все посты
  static async getAllPosts() {
    return await Post.findAll();
  }

  // получить один пост по ID
  static async getPostById(id) {
    return await Post.findByPk(id);
  }

  // создать пост в БД
  static async createPost(newPost) {
    return await Post.create(newPost);
  }

  // обновить пост в БД
  static async updatePost(id, updatedPost, userId) {
    const post = await Post.findByPk(id);

    if (!post) {
      return null;
    }
    // Предотвращение уязвимости IDOR
    if (post.user_id !== userId) {
      return null;
    }

    const { title, text } = updatedPost;

    if (title) {
      post.title = title;
    }
    if (text) {
      post.text = text;
    }

    await post.save();
    return post;
  }

  // удалить пост из БД
  static async deletePost(id, userId) {
    const post = await Post.findByPk(id);

    if (!post) {
      return null;
    }
    // Проверка авторства поста
    if (post.user_id !== userId) {
      return null;
    }

    await post.destroy();

    return true;
  }
}

module.exports = PostService;
