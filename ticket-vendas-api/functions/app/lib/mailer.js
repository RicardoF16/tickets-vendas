const nodemailer = require('nodemailer'),
      hbs = require('nodemailer-express-handlebars');

class Mailer {
  constructor() {
    this._link = '';
    this._transporter = {};
    this._mailOptions = {};
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

    this._transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: '',
        pass: ''
      }
    });

    this._transporter.use('compile', hbs(options));

    this._mailOptions = {
      from: '"nome" <>'
    };

  }

enviarEmail(info, body) {
    info.link = this._link;

    this._mailOptions.to = info.email;
    this._mailOptions.subject = ` [${Date.now()}]`;
    this._mailOptions.template = 'email';
    this._mailOptions.context = body;

    this._transporter
      .sendMail(this._mailOptions, (error, response) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message %s sent: %s', response.messageId, response.response);
      });
  }

}

module.exports = new Mailer();
