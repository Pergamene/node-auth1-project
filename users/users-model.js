const db = require('../database/dbConfig');

module.exports = {
  add,
  find,
  findBy,
  findById,
};

async function find() {
  return await db('users').select('id', 'username', 'password');
}

async function findBy(filter) {
  return await db('users').where(filter).first();
}

async function add(user) {
  const [id] = await db('users').insert(user, 'id');
  return await findById(id);
}

async function findById(id) {
  return await db('users').where({ id }).first();
}
