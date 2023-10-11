import { Sequelize } from "sequelize";
//const Sequelize = require('sequelize');
import { initModels } from "./init-models";

const sequelize = new Sequelize('nodeapp', 'root', 'admin', {
    host: 'localhost',
    dialect: 'mysql'
  });

const models = initModels(sequelize)

export default models
