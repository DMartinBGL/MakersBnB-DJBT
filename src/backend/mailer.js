const cryptoRandomString = require('crypto-random-string');
const sgMail = require('@sendgrid/mail');
const emailVerification = require('./emailVerification');

const apiKey = "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";
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