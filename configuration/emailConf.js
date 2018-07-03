const email = require('nodemailer');
let mailer = {};
mailer.transporter = email.createTransport({
    service: 'Gmail',
    auth: {
        user: 'patrickfolch2@gmail.com',
        pass: 'mheeeeee'
    },
}, {
    from: '',
    headers: {

    }

});

module.exports = mailer;