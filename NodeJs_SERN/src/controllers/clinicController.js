import {
  createClinicService,
  getAllClinicService,
  getDetailClinicyByIdService,
} from "../services/clinicService.js";
let createClinic = async (req, res) => {
  try {
    res.setHeader("Cache-Control", "no-store"); // không cache response
    let infor = await createClinicService();
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getAllClinic = async (req, res) => {
  try {
    res.setHeader("Cache-Control", "no-store"); // không cache response
    let infor = await getAllClinicService();
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getDetailClinicyById = async (req, res) => {
  try {
    res.setHeader("Cache-Control", "no-store"); // không cache response
    let infor = await getDetailClinicyByIdService(req.query.id);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
export { createClinic, getAllClinic, getDetailClinicyById };
