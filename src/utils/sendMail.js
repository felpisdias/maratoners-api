var nodemailer = require('nodemailer');

const { ok } = require('../utils/enums');

module.exports = function sendMail(mailConfigs) {

	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'maratoners@gmail.com',
			pass: 'aQg37m2op'
		}
	});

	var mailOptions = {
		from: 'maratoners@gmail.com',
		to: mailConfigs.receiver,
		subject: mailConfigs.subject,
		text: `${mailConfigs.textMessage} \n\n\nEquipe maratoners, estamos sempre a disposição.`
	};

	transporter.sendMail(mailOptions, function(error){
		if (error) {
			return error;
		} else {
			return ok;
		}
	});
};
