import mongoose from "mongoose";
import shopping from "../model/userModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { SendEmail } from "../middleware/sendMail";

//-------------------------->>>>>> User Registration <<<<<<--------------------------
export const userRegister = async (req, res) => {
  const otp = Math.floor(Math.random() * 1234 + 1000);
  try {
    const usersdata = new shopping({
      username: req.body.username,
      phone: req.body.phone,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      address:req.body.address,
      image:req.file.filename,
      otp
    });
    const message = `Hello your verification code is ${otp} . `;
    const savedusers = await usersdata.save();
    var emailDetails = await SendEmail('azmsiddhant1@gmail.com',req.body.email,'Verificaton code',message)
    if(savedusers){
    return res.send({
        status : true,
        message : "User registered",
        result : {}
    })}
  } catch (e) {
    res.send({ status: false, messgae: "No Results Found", Result: e });
  }
};

//-------------------------->>>>>> Verify Otp <<<<<<--------------------------
export const verifyOTP = async (req, res) => {
  const EMAIL = req.body.email;
  const OTP = req.body.otp;
  const newotp = Math.floor(Math.random() * 1234 + 1000);
  console.log("OLD ->", OTP, "NEW ->", newotp);
  const isValid = await shopping.find({
    email: EMAIL,
    otp: OTP
  }).count();
  if (isValid) {
    // update
    const filter = {
      email: EMAIL,
      otp: OTP
    }
    const update = {
      verified: true,
      otp: newotp
    }
    await shopping.findOneAndUpdate(filter, update);
    res.send({ status: true, message: "OTP VERIFIED SUCCESFULLY", result: {} })
  } else {
    res.send({ status: false, message: "Incorrect otp", result: {} })
  }
}


//-------------------------->>>>>> User Login <<<<<<--------------------------
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await shopping.findOne({ email });
    if (!user) {
      res.send({ status: false, message: "email not valid" });
    }
    const isValid = bcrypt.compareSync(password, user.password);
    if (isValid) {
      let payload = {};
      payload._id = user._id;
      jwt.sign(
        payload,
        "SECRET_KEY",
        {
          expiresIn: "5m",
        },
        (err, token) => {
          res.send({
            Token: token,
            status: true,
            message: "Login Successfully",
            result: user,
          });
        }
      );
    } else {
      res.send({ status: false, message: "Password is incorrect" });
    }
  } catch (e) {
    res.send({ status: false, messgae: "No Results Found", Result: e });
  }
};


//-------------------------->>>>>> User Data Through Id <<<<<<--------------------------
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const userdata = await shopping.findById({ _id: id });
    if (userdata) {
      res.send({ status: true, message: "Success", result: userdata });
    }
  } catch (e) {
    res.send({ status: false, messgae: "No Results Found", Result: e });
  }
};

//-------------------------->>>>>> Update Product <<<<<<--------------------------
export const updateUser = async (req, res) => {
  try {
    console.log(req.body.id);
    console.log(req.body.name);
    let jsondata = {};
    if (req.body.username) {
      jsondata.username = req.body.username;
    }
    if (req.body.phone) {
      jsondata.phone = req.body.phone;
    }
    if (req.body.email) {
      jsondata.email = req.body.email;
    }
    if (req.body.password) {
      jsondata.password = req.body.password;
    }
    if (req.file.filename) {
      jsondata.image = req.file.filename;
    }
    if (req.body.address) {
      jsondata.address = req.body.address;
    }
    console.log("id data", req.body.id);
    shopping.updateOne(
      {
        _id: mongoose.Types.ObjectId(req.body.id),
      },
      { $set: jsondata },
      { new: true },
      (err, result) => {
        console.log(result);
        if (err) {
          res.send({ status: 404, message: "Failed", result: err });
        } else {
          res.send({
            status: 200,
            message: "Updated Successfully",
            result: result,
          });
        }
      }
    );
  } catch (e) {
    throw e;
  }
};

//-------------------------->>>>>> Forgot password <<<<<<--------------------------
export const forgetpassword = async (req, res) => {
  const { email } = req.body;
  if (email) {
      const user1 = await shopping.findOne({ email: email })
      if (user1) {
          const secret = user1._id + "secret"
          console.log(user1._id)
          const token = jwt.sign({ userID: user1._id }, secret, { expiresIn: '5m' })
          console.log(token)
          SendEmail("azmsiddhant1@gmail.com", req.body.email,
           "Forget Passoword",
              `<p>Click <a href="http://localhost:3000/resetpassword/?userId=${user1._id}&token=${token}&' +  '">here</a> to reset your password</p>`
          )
          res.send({ "status": "success", "message": "Password Reset Email Sent... Please Check Your Email" })
      } else {
          res.send({ "status": "failed", "message": "Email doesn't exists" })
      }
  } else {
      res.send({ "status": "failed", "message": "Email Field is Required" })
  }
};

//-------------------------->>>>>> Reset password <<<<<<--------------------------
export const userPasswordReset = async (req, res) => {
  const { password, confirm_password } = req.body
  const { _id, token } = req.params
  const user1 = await shopping.findById(_id)
  const new_secret = user1._id + "secret"
  try {
      jwt.verify(token, new_secret)
      if (password && confirm_password) {
          if (password !== confirm_password) {
              res.send({ "status": "failed", "message": "New Password and Confirm New Password doesn't match" })
          } else {
              const newHashPassword = await bcrypt.hashSync(password, 8)
              await user.findByIdAndUpdate(user1._id, { $set: { password: newHashPassword } })
              res.send({ "status": "success", "message": "Password Reset Successfully" })
          }
      } else {
          res.send({ "status": "failed", "message": "All Fields are Required" })
      }
  } catch (error) {
      console.log(error)
      res.send({ "status": "failed", "message": "Invalid Token" })
  }
};
