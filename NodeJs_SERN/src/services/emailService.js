import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

let sendSimpleEmail = async (data) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true cho port 465
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: '"Vu Van Thang" <' + process.env.EMAIL_APP + ">",
    to: data.receiveEmail,
    subject: "Thông tin đặt lịch khám bệnh",
    html: getBodyHTMLEmail(data),
  });
};

let getBodyHTMLEmail = (data) => {
  let result = "";
  if (data.language === "vi") {
    result = `
    <h3>Xin chào ${data.patientName}</h3>
    <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên thangchannel</p>
    <p>Thông tin đặt lịch khám bệnh:</p>
    <div><b>Thời gian: ${data.time}</b></div>
    <div><b>Thời gian: ${data.doctorName}</b></div>

    <p>Nếu các thông tin trên là đúng sự thật. Vui lòng click đường link bên dưới 
    để xác nhận và hoàn tất thủ tục khám bệnh.</p>

    <div>
    <a href=${data.redirectLink} target="_blank">Click here</a>
    </div>

    <div>Xin chân thành cảm ơn</div>
    `;
  }
  if (data.language === "en") {
    result = `
    <h3>Dear ${data.patientName}</h3>
    <p>You received this email because you booked an online medical appointment on thangchannel.</p>
    <p>Appointment information:</p>
    <div><b>Time: ${data.time}</b></div>
    <div><b>Doctor: ${data.doctorName}</b></div>

    <p>If the above information is correct, please click the link below to confirm and complete the medical examination procedure.</p>

    <div>
    <a href=${data.redirectLink} target="_blank">Click here</a>
    </div>

    <div>Thank you very much!</div>
    `;
  }
  return result;
};

let sendAttachment = async (dataSend) => {
  return new Promise(async (resolve, reject) => {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true cho port 465
        auth: {
          user: process.env.EMAIL_APP,
          pass: process.env.EMAIL_APP_PASSWORD,
        },
      });

      const info = await transporter.sendMail({
        from: '"Vu Van Thang" <' + process.env.EMAIL_APP + ">",
        to: dataSend.email,
        subject: "Kết quả đặt lịch khám bệnh",
        html: getBodyHTMLEmailRemedy(dataSend),
        attachments: [
          {
            filename: `remedy-${
              dataSend.patientId
            }-${new Date().getTime()}.png`,
            content: dataSend.imgBase64.split("base64,")[1],
            encoding: "base64",
          },
        ],
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

let getBodyHTMLEmailRemedy = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `
    <h3>Xin chào ${dataSend.patientName}!</h3>
    <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên thangchannel thành công</p>
    <p>Thông tin đơn thuốc/hóa đơn được gửi trong file đính kèm.:</p>
    
    <div>Xin chân thành cảm ơn</div>
    `;
  }
  if (dataSend.language === "en") {
    result = `
    <h3>Dear ${dataSend.patientName}!</h3>
    <p>You received this email because you booked an online medical appointment on thangchannel.</p>
    
    <div>Thank you very much!</div>
    `;
  }
  return result;
};

export { sendSimpleEmail, sendAttachment };
