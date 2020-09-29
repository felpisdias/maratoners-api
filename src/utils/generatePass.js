module.exports = function generatePass() {
	let password = '';
	const characters = 'ab0cd1ef2gh3ij4kl5mn6op7qr8st9uvxyz';
	for ( let i = 0; i < 7; i++ ) {
		password += characters.charAt(Math.floor(Math.random() * 7));
	}
	return password;
};
