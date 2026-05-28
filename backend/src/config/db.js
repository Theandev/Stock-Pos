import { Sequelize } from "sequelize";

const sequelize = new Sequelize("your db table", "postgres", "your password", {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
  logging: false,
});

export default sequelize;
