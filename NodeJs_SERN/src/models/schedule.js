"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Schedule.belongsTo(models.Allcode, {
        foreignKey: "timeType",
        targetKey: "keyMap",
        as: "timeTypeData", //bảng schedule có cột timeTypr (T1, T2, ...) map với keyMap bảng Allcode nên sẽ phải map với nhau để trả ra thông tin
        // bảng allcode dưới tên timeTypeData
      });
      Schedule.belongsTo(models.User, {
        foreignKey: "doctorId",
        targetKey: "id",
        as: "doctorData",
      });
    }
  }
  Schedule.init(
    {
      currentNumber: DataTypes.INTEGER,
      maxNumber: DataTypes.INTEGER,
      date: DataTypes.STRING,
      timeType: DataTypes.STRING,
      doctorId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Schedule",
    }
  );
  return Schedule;
};
