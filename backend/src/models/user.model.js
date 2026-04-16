import pool from '../config/db.js';

export const UserModel = {
  async create({ username, email, password, role }) {
    const [result] = await pool.execute(
      'INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)',
      [username, email, password, role]
    );
    return this.findById(result.insertId);
  },

  async findByEmail(email) {
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);
    return rows[0] || null;
  },

  async findById(id) {
    const [rows] = await pool.execute(
      'SELECT id, username, email, role, created_at FROM users WHERE id = ? LIMIT 1',
      [id]
    );
    return rows[0] || null;
  },

  async listAll() {
    const [rows] = await pool.execute('SELECT id, username, email, role, created_at FROM users ORDER BY id DESC');
    return rows;
  },
};
