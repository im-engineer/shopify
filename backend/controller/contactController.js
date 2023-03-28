import mongoose from "mongoose";
import contact from "../model/contactModel";
import { SendEmail } from "../middleware/sendMail";

//-------------------------->>>>>> Contact to Admin <<<<<<--------------------------
export const Contact = async (req, res) => {
  try {
    const contactDetails = new contact({
      email: req.body.email,
      textarea: req.body.textarea,
    });
    const contactData = await contactDetails.save();
    var emailDetails = await SendEmail(
      "azmsiddhant1@gmail.com",
      req.body.email,
      `Welcome `,
      `Users Details :
    email:${contactData.email},
    message:${contactData.textarea}`
    );
    console.log(contactData, "d");
    if(contactData){
    res.send({
      status: true,
      message: "message sent",
      result: contactData,
      data:emailDetails
    })};
  } catch (e) {
    res.send({
      status: false,
      message: "again u make a mistake",
      result: e,
    });
  }
};
