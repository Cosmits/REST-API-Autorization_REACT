import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

class EmailService {
    constructor() {
        // console.log(process.env.SMTP_HOST);
        this.trasporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_LOGIN, // generated ethereal user
                pass: process.env.SMTP_PASSWORD, // generated ethereal password
            },
            tls: {
                // do not fail on invalid certs
                rejectUnauthorized: false,
            },
        });
    }

    async SendActivationLink(email, link) {
        await this.trasporter.sendMail({
            from: process.env.SMTP_LOGIN,
            to: email,
            subject: "Activation account ✔" + process.env.API_URL,
            text: "",
            html: `
        <div>
            <h1><b>Please click link to active account</b></h1>        
            <a href="${link}">${link}</a>
        </div>`,
        });
    }
}

export default new EmailService();
