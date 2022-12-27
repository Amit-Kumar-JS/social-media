const nodemailer = require("nodemailer");
// const { options } = require("../routes/User");

exports.sendEmail= async (options)=>{
    var transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "7e77220be57a77",
          pass: "c7ffbed082ee5e"
        }
      });

const mailOptions ={
    from:process.env.SMPT_MAIL,
    to:options.email,
    subject:options.subject,
    text:options.message,
}

await transporter.sendMail(mailOptions)

}