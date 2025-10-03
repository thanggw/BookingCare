import { where } from "sequelize";
import db from "../models/index.js";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

const checkUserEmail = async (userEmail) => {
  try {
    const user = await db.User.findOne({ where: { email: userEmail } });
    return !!user; // true nếu có user, false nếu không
  } catch (error) {
    throw error;
  }
};

const handleUserLogin = async (email, password) => {
  const userData = {};

  try {
    const isExist = await checkUserEmail(email);

    if (!isExist) {
      userData.errCode = 1;
      userData.errMessage = "Email không tồn tại";
      return userData;
    }

    const user = await db.User.findOne({
      attributes: [
        "id",
        "email",
        "roleId",
        "password",
        "firstName",
        "lastName",
      ],
      where: { email },
      raw: true,
    });

    if (!user) {
      userData.errCode = 2;
      userData.errMessage = "Không tìm thấy người dùng";
      return userData;
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    if (!isPasswordCorrect) {
      userData.errCode = 3;
      userData.errMessage = "Sai mật khẩu";
      return userData;
    }

    delete user.password;

    userData.errCode = 0;
    userData.errMessage = "Đăng nhập thành công";
    userData.user = user;

    return userData;
  } catch (error) {
    throw error;
  }
};

let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId === "ALL") {
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
      }
      if (userId && userId !== "ALL") {
        users = await db.User.findOne({
          where: { id: userId },
          attributes: {
            exclude: ["password"],
          },
        });
      }
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkUserEmail(data.email);
      if (check === true) {
        resolve({
          errCode: 1,
          errMessage: "Your email existed!",
        });
      } else {
        let hashPasswordFromBcrypt = await hashUserPassword(data.password);
        await db.User.create({
          email: data.email,
          password: hashPasswordFromBcrypt,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phoneNumber: data.phoneNumber,
          gender: data.gender,
          roleId: data.roleId,
          positionId: data.positionId,
          image: data.avatar,
        });
        resolve({
          errCode: 0,
          message: "OK",
        });
        // đã dùng promise thì phải xử lý khi resolve nếu không gọi resolve ra thì máy sẽ bị treo mãi (pending)
      }
    } catch (e) {
      reject(e);
    }
  });
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

let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
      });
      if (!user) {
        resolve({
          errCode: 2,
          errMessage: "The user not exist",
        });
      } else {
        await db.User.destroy({
          where: { id: userId },
        });
      }
      resolve({
        errCode: 0,
        errMessage: "The user is deleted",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.roleId || !data.positionId || !data.gender) {
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
        user.roleId = data.roleId;
        user.positionId = data.positionId;
        user.gender = data.gender;
        user.phoneNumber = data.phoneNumber;
        if (data) {
          user.image = data.avatar;
        }

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
      reject(e);
    }
  });
};

let getAllCodeSerVice = (typeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!typeInput) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters",
        });
      } else {
        let res = {};
        let allcode = await db.Allcode.findAll({
          where: { type: typeInput },
        });
        res.errCode = 0;
        res.data = allcode;
        resolve(res);
      }
    } catch (e) {
      reject(e);
    }
  });
};

export {
  handleUserLogin,
  getAllUsers,
  createNewUser,
  deleteUser,
  updateUserData,
  getAllCodeSerVice,
};
