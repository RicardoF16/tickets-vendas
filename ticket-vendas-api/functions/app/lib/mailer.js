const nodemailer = require('nodemailer'),
      config = require('../config/constants'),
      hbs = require('nodemailer-express-handlebars');

class Mailer {
  constructor() {
    this.transporter = {};
    this.mailOptions = {};
    
    const options = {
      viewEngine: {
        extname: '.hbs',
        layoutsDir: 'app/templates/',
        defaultLayout : 'template',
        partialsDir : 'app/templates/partials/'
     },
      viewPath: 'app/templates/',
      extName: '.hbs'
    };

    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.mailer.email,
        pass: config.mailer.pwd
      }
    });

    this.transporter.use('compile', hbs(options));

    this.mailOptions = {
      from: `"${config.mailer.name}" <${config.mailer.email}>`
    };

  }

enviarEmail(email, body) {

    this.mailOptions.to = email;
    this.mailOptions.cc = 'support@petcarpeople.com';
    this.mailOptions.subject = ` [${Date.now()}]`;
    this.mailOptions.template = body.template;
    this.mailOptions.context = body;

    this.transporter
      .sendMail(this.mailOptions, (error, response) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message %s sent: %s', response.messageId, response.response);
      });
  }

}

module.exports = new Mailer();
