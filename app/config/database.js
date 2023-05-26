const Sequelize = require("sequelize");
const sequelize = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@db:5432/${process.env.DB_NAME}`)/*process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host:"postgres",
  dialect: "postgres"
});*/
const status = require('./importcsv.js')
console.log(status)
module.exports = sequelize