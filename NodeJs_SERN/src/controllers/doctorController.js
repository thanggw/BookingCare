import {
  getTopDoctorService,
  getAllDoctorService,
  saveDetailInforDoctor,
  getDetailDoctorByIdService,
  bulkCreateScheduleService,
  getScheduleByDateService,
  getExtraInforDoctorByIdService,
  getProfileDoctorByIdService,
  getListPatientForDoctorService,
  sendRemedyService,
} from "../services/doctorService.js";
let getTopDoctorHome = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 10;
  try {
    let doctor = await getTopDoctorService(+limit);
    return res.status(200).json(doctor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server...",
    });
  }
};

let getAllDoctors = async (req, res) => {
  try {
    let doctors = await getAllDoctorService();
    return res.status(200).json(doctors);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let postInforDoctor = async (req, res) => {
  try {
    let response = await saveDetailInforDoctor(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getDetailDoctorById = async (req, res) => {
  try {
    res.setHeader("Cache-Control", "no-store");
    let infor = await getDetailDoctorByIdService(req.query.id);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let bulkCreateSchedule = async (req, res) => {
  try {
    let infor = await bulkCreateScheduleService(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getScheduleByDate = async (req, res) => {
  try {
    res.setHeader("Cache-Control", "no-store"); // không cache response
    let infor = await getScheduleByDateService(
      req.query.doctorId,
      req.query.date
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

let getExtraInforDoctorById = async (req, res) => {
  try {
    res.setHeader("Cache-Control", "no-store"); // không cache response
    let infor = await getExtraInforDoctorByIdService(req.query.doctorId);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getProfileDoctorById = async (req, res) => {
  try {
    res.setHeader("Cache-Control", "no-store"); // không cache response
    let infor = await getProfileDoctorByIdService(req.query.doctorId);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getListPatientForDoctor = async (req, res) => {
  try {
    res.setHeader("Cache-Control", "no-store"); // không cache response
    let infor = await getListPatientForDoctorService(
      req.query.doctorId,
      req.query.date
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

let sendRemedy = async (req, res) => {
  try {
    res.setHeader("Cache-Control", "no-store"); // không cache response
    let infor = await sendRemedyService(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
export {
  getTopDoctorHome,
  getAllDoctors,
  postInforDoctor,
  getDetailDoctorById,
  bulkCreateSchedule,
  getScheduleByDate,
  getExtraInforDoctorById,
  getProfileDoctorById,
  getListPatientForDoctor,
  sendRemedy,
};
