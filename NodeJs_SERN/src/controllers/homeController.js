import { Json } from "sequelize/lib/utils";
import db from "../models/index.js";
import {
  createNewUser,
  getAllUser,
  getUserInforById,
  updateUserData,
  deleteUserById,
} from "../services/CRUDService.js";

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll(); // tên phải giống với modelName trong file user của thư mục models

    return res.render("homepage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (e) {
    console.log(e);
  }
};

let getCRUD = (req, res) => {
  return res.render("crud.ejs");
};
let postCRUD = async (req, res) => {
  let message = await createNewUser(req.body);
  console.log(message);
  return res.send("post crud from server");
};

let displayGetCRUD = async (req, res) => {
  let data = await getAllUser();
  console.log(data);
  return res.render("displayCRUD.ejs", { dataTable: data });
};

let getEditCRUD = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let userData = await getUserInforById(userId);
    if (userData) {
      return res.render("editCRUD.ejs", { user: userData });
    } else {
      res.send("User not found");
    }
  } else {
    return res.send("User not found");
  }
};

let putCRUD = async (req, res) => {
  let data = req.body;
  await updateUserData(data);
  return res.redirect("/get-crud");
};

let deleteCRUD = async (req, res) => {
  let id = req.query.id;
  if (id) {
    await deleteUserById(id);
    return res.redirect("/get-crud");
  } else {
    return res.send("User not found");
  }
};
export {
  getHomePage,
  getCRUD,
  postCRUD,
  displayGetCRUD,
  getEditCRUD,
  putCRUD,
  deleteCRUD,
};
