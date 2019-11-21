const cryptoRandomString = require('crypto-random-string');
const sgMail = require('@sendgrid/mail');
const emailVerification = require('./emailVerification');

const apiKey = process.env.SG_KEY;
const tokenLength = 40;
const baseUrl = "http://makers-project.xyz";

sgMail.setApiKey(apiKey);

async function sendVerificationEmail(email) {
  const token = cryptoRandomString( { length: tokenLength, type: 'url-safe'} );

  await emailVerification.add(email, token);

  sgMail.send({
    to: email,
    from: "no-reply@makers-bnb.com",
    subject: "Verify Email",
    html: `<a href="${baseUrl}/verify-email/${token}">Click here to verify your email</a>`
  })  
}


module.exports = {
  sendVerificationEmail,
}