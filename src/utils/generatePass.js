module.exports = function generatePass() {
	let password           = '';
	const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for ( let i = 0; i < 9; i++ ) {
		password += characters.charAt(Math.floor(Math.random() * 9));
	}
	return password;
};
