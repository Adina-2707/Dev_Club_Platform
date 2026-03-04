import bcrypt from 'bcrypt';
import { pool } from '../db.js';

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 10;

// data access helpers for users table

export const findAll = async () => {
  const result = await pool.query('SELECT id, email FROM users');
  return result.rows;
};

export const findByPk = async (id) => {
  const result = await pool.query('SELECT id, email FROM users WHERE id = $1', [id]);
  return result.rows[0];
};

export const update = async (id, fields) => {
  // if password is being updated, hash it first
  if (fields.password) {
    fields.password = await bcrypt.hash(fields.password, SALT_ROUNDS);
  }

  const sets = [];
  const values = [];
  let idx = 1;

  for (const [key, value] of Object.entries(fields)) {
    sets.push(`${key} = $${idx}`);
    values.push(value);
    idx++;
  }

  if (sets.length === 0) return await findByPk(id);

  values.push(id);
  const query = `UPDATE users SET ${sets.join(', ')} WHERE id = $${idx} RETURNING id, email`;
  const res = await pool.query(query, values);
  return res.rows[0];
};

export const deleteUser = async (id) => {
  await pool.query('DELETE FROM users WHERE id = $1', [id]);
};

export const create = async ({ email, password }) => {
  const hashed = await bcrypt.hash(password, SALT_ROUNDS);
  const result = await pool.query(
    'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email',
    [email, hashed]
  );
  return result.rows[0];
};

// default export to match previous controller expectations
export default {
  findAll,
  findByPk,
  create,
  update,
  delete: deleteUser,
};