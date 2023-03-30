import nodemailer from 'nodemailer'
import 'dotenv/config';

import {get} from '../config/config'
var email = get('staging').EMAIL;
const path = require('path');

export const SendEmail = (from, to, subject, text) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email.username,
      pass: email.password,
    },
  });
  var mailOptions = {
    from: from,
    to: to,
    subject: subject,
    html: text,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};