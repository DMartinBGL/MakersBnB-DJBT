const cryptoRandomString = require('crypto-random-string');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

function sendVerificationEmail(email) {
  const token = cryptoRandomString( { length:40, type: 'url-safe'} );

  sgMail.send({
    to: email,
    from: 'test@email',
    subject: 'Verify Yourself',
    text: token
  })
}


module.exports = {
  sendVerificationEmail
}