const router = require("express").Router();
var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport({
  host: "smtppro.zoho.in",
  port: 465,
  secure: true,
  auth: {
    user: "info@mespay.in",
    pass: "Mespay@123",
  },

  // host: "smtp.zoho.in",
  // port: 465,
  // secure: true,
  // auth: {
  //   user: "hr@codepurple.in",
  //   pass: "Bangalore@333",
  // },
});

router.post("/otpsend", async (req, res) => {
  const { otp, email, name } = req.body;
  const mailOptions = {
    from: "info@mespay.in",
    to: email,
    subject: "Account Verification Code",
    html: ` <h4>Dear ${name},</h4>
                <h4>Your verification code is: <span style="font-size:20px;">${otp}</span>,</h4>
                <h4>Please enter this code to verify your account.</h4>
                <h4>Thank you.</h4>`,
  };

  smtpTransport.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      return res.send(true);
    }
  });
});

router.post("/registersuccess", async (req, res) => {
  const { email, name, password } = req.body;
  const mailOptions = {
    from: "info@mespay.in",
    // from: "hr@codepurple.in",
    to: email,
    subject: "Registration Successful",
    html: `<p>Dear <span style="font-weight:bold;">${name}</span>, Congratulation! Your account has been Registered successfully. Welcome to our platform.</p>
            <p style="font-size:15px;font-weight:bold;">Email & Username : ${email}</p>
            <p style="font-size:15px;font-weight:bold;">Password : ${password}</p>
      `,
  };

  smtpTransport.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      return res.send(true);
    }
  });
});

module.exports = router;
