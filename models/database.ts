import { Sequelize } from "sequelize";
//const Sequelize = require('sequelize');
import { initModels } from "./init-models";

const sequelize = new Sequelize('database name', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql'
  });

const models = initModels(sequelize)

export default models
