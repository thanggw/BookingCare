const express = require("express");
const {
  getHomePage,
  getCRUD,
  postCRUD,
  displayGetCRUD,
  getEditCRUD,
  putCRUD,
  deleteCRUD,
} = require("../controllers/homeController");
const {
  handleLogin,
  handleGetAllUsers,
  handleCreateNewUser,
  handleEditUser,
  handleDeleteUser,
  getAllCode,
} = require("../controllers/userController");
const {
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
} = require("../controllers/doctorController");
const {
  postBookingAppointment,
  postVerifyBookingAppointment,
} = require("../controllers/patientController");
const {
  createSpecialty,
  getAllSpecialty,
  getDetailSpecialtyById,
} = require("../controllers/specialtyController");
const {
  createClinic,
  getAllClinic,
  getDetailClinicyById,
} = require("../controllers/clinicController");
const router = express.Router();

const initWebRoutes = (app) => {
  router.get("/", getHomePage);
  router.get("/CRUD", getCRUD);
  router.post("/post-crud", postCRUD);
  router.get("/get-crud", displayGetCRUD);
  router.get("/edit-crud", getEditCRUD);
  router.post("/put-crud", putCRUD);
  router.get("/delete-crud", deleteCRUD);

  router.post("/api/login", handleLogin);
  router.get("/api/get-all-users", handleGetAllUsers);
  router.put("/api/edit-user", handleEditUser);
  router.delete("/api/delete-user", handleDeleteUser);
  router.post("/api/create-new-user", handleCreateNewUser);
  router.get("/api/allcode", getAllCode);

  //doctor
  router.get("/api/top-doctor-home", getTopDoctorHome);
  router.get("/api/get-all-doctors", getAllDoctors);
  router.post("/api/save-infor-doctors", postInforDoctor);
  router.get("/api/get-detail-doctor-by-id", getDetailDoctorById);
  router.post("/api/bulk-create-schedule", bulkCreateSchedule);
  router.get("/api/get-schedule-doctor-by-date", getScheduleByDate);
  router.get("/api/get-extra-infor-doctor-by-id", getExtraInforDoctorById);
  router.get("/api/get-profile-doctor-by-id", getProfileDoctorById);
  router.get("/api/get-list-patient-for-doctor", getListPatientForDoctor);
  router.post("/api/send-remedy", sendRemedy);

  router.post("/api/patient-book-appointment", postBookingAppointment);
  router.post("/api/verify-book-appointment", postVerifyBookingAppointment);

  router.post("/api/create-new-specialty", createSpecialty);
  router.get("/api/get-specialty", getAllSpecialty);
  router.get("/api/get-detail-specialty-by-id", getDetailSpecialtyById);

  router.post("/api/create-new-clinic", createClinic);
  router.get("/api/get-clinic", getAllClinic);
  router.get("/api/get-detail-clinic-by-id", getDetailClinicyById);

  return app.use("/", router);
};

module.exports = initWebRoutes;
