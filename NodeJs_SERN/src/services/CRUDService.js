import { where } from "sequelize";
import db from "../models/index.js";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        //User phải đúng với ký tự của modelName trong folder model
        email: data.email,
        password: hashPasswordFromBcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        gender: data.gender === "1" ? true : false, //kiểu boolean mới làm thế này
        roleId: data.roleId,
      });

      resolve("created successfully"); // đã dùng promise thì phải xử lý khi resolve nếu không gọi resolve ra thì máy sẽ bị treo mãi (pending)
    } catch (e) {
      reject(e);
    }
  });
  console.log(data);
  console.log(hashPasswordFromBcrypt);
};

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hash = await bcrypt.hashSync(password, salt);
      resolve(hash);
    } catch (e) {
      reject(e);
    }
  });
};

let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = db.User.findAll({
        raw: true,
      }); //User phải đúng với ký tự của modelName trong folder model
      resolve(user);
    } catch (e) {
      reject(e);
    }
  });
};

let getUserInforById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
        raw: true,
      });
      if (user) {
        resolve(user);
      } else {
        resolve([]);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let updateUserData = async (data) => {
  try {
    if (!data.id) {
      resolve({
        errCode: 2,
        message: "Missing required parameters",
      });
    }
    let user = await db.User.findOne({
      where: { id: data.id },
      raw: false,
    });
    if (user) {
      user.firstName = data.firstName;
      user.lastName = data.lastName;
      user.address = data.address;

      await user.save();
      resolve({
        errCode: 0,
        message: "Update user successfully!",
      });
    } else {
      resolve({
        errCode: 1,
        message: "User not found!",
      });
    }
  } catch (e) {
    throw e;
  }
};
let deleteUserById = async (userId) => {
  let user = await db.User.findOne({ where: { id: userId } });
  if (user) {
    await user.destroy();
  }
};

export {
  createNewUser,
  getAllUser,
  getUserInforById,
  updateUserData,
  deleteUserById,
};
