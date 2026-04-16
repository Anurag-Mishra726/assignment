import pool from '../config/db.js';

export const Task = {
  async create({ userId, title, description, status }) {
    const [result] = await pool.execute(
      'INSERT INTO task (user_id, title, description, status) VALUES (?, ?, ?, ?)',
      [userId, title, description, status]
    );
    return this.findById(result.insertId);
  },

  async findById(id) {
    const [rows] = await pool.execute(
      `SELECT t.id, t.title, t.description, t.status, t.user_id, t.created_at, t.updated_at, u.username AS user_name
       FROM task t JOIN users u ON u.id = t.user_id WHERE t.id = ?`,
      [id]
    );
    return rows[0] || null;
  },

  async listForUser(user) {
    if (user.role === 'admin') {
      const [rows] = await pool.execute(
        `SELECT t.id, t.title, t.description, t.status, t.user_id, t.created_at, t.updated_at, u.username AS user_name
         FROM task t JOIN users u ON u.id = t.user_id ORDER BY t.id DESC`
      );
      return rows;
    }

    const [rows] = await pool.execute(
      `SELECT t.id, t.title, t.description, t.status, t.user_id, t.created_at, t.updated_at, u.username AS user_name
       FROM task t JOIN users u ON u.id = t.user_id WHERE user_id = ? ORDER BY t.id DESC`,
      [user.userId]
    );
    return rows;
  },

  async update(id, { title, description, status }) {
    await pool.execute('UPDATE task SET title = ?, description = ?, status = ? WHERE id = ?', [title, description, status, id]);
    return this.findById(id);
  },

  async remove(id) {
    const [result] = await pool.execute('DELETE FROM task WHERE id = ?', [id]);
    return result.affectedRows > 0;
  },
};
