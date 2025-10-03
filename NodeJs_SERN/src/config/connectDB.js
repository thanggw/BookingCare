const { Sequelize } = require("sequelize");

// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize("backend-sern", "root", null, {
  host: "localhost",
  dialect: "mysql",
});
