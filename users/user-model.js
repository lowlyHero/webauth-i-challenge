const db = require('../database/dbConfig');

module.exports = {
    find,
    findById,
    add
}

function find() {
    return db('users');
}

function findById(id) {
}

function add(user) {
}
