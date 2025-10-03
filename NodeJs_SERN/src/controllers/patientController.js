import {
  postBookingAppointmentService,
  postVerifyBookingAppointmentService,
} from "../services/patientService.js";

let postBookingAppointment = async (req, res) => {
  try {
    res.setHeader("Cache-Control", "no-store"); // không cache response
    let infor = await postBookingAppointmentService(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let postVerifyBookingAppointment = async (req, res) => {
  try {
    res.setHeader("Cache-Control", "no-store"); // không cache response
    let infor = await postVerifyBookingAppointmentService(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

export { postBookingAppointment, postVerifyBookingAppointment };
