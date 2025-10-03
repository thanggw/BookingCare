import {
  createSpecialtyService,
  getAllSpecialtyService,
  getDetailSpecialtyByIdService,
} from "../services/specialtyService.js";
let createSpecialty = async (req, res) => {
  try {
    res.setHeader("Cache-Control", "no-store"); // không cache response
    let infor = await createSpecialtyService(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getAllSpecialty = async (req, res) => {
  try {
    res.setHeader("Cache-Control", "no-store"); // không cache response
    let infor = await getAllSpecialtyService();
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getDetailSpecialtyById = async (req, res) => {
  try {
    res.setHeader("Cache-Control", "no-store"); // không cache response
    let infor = await getDetailSpecialtyByIdService(
      req.query.id,
      req.query.location
    );
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
export { createSpecialty, getAllSpecialty, getDetailSpecialtyById };
