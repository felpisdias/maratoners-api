const generatePass = require('../utils/generatePass');
const sendMail = require('../utils/sendMail');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { duplicateRegister, ok, registerNotFound, InvalidData, InternalServerError } = require('../utils/enums');
const Maratoner = require('../schema/maratoner-schema');

module.exports = {
	// add new maratoner
	async addMaratoner(request, response) {
		const { email, name, photo, bio, series, longitude, latitude, instaUser } = request.body;

		let password = await generatePass();

		let mailConfigs = {
			receiver: email,
			subject: `Ola ${name}, seja bem vindo ao maratoners`,
			textMessage: `Ola ${name}, seja bem vindo ao maratoners.\nÉ um imenso prazer ter-lo conosco, esperamos que curta sua estadia. E que faça ótimos amigos.\nCaso tenha algum problema é só entrar em contato conosco, estamos sempre a disposição.\nA sua senha é "${password}", você deve alterar-lá ao efetuar login.`
		};

		await sendMail(mailConfigs);

		let maratoner = await Maratoner.findOne({ email });

		if (!maratoner) {
			const seriesArray = parseStringAsArray(series);

			const location = {
				type: 'Point',
				coordinates: [longitude, latitude],
			};

			maratoner = await Maratoner.create({
				email,
				password,
				name,
				photo,
				bio,
				series: seriesArray,
				location,
				instaUser,
			});

			return response.json(ok);
		}

		return response.json(duplicateRegister);
	},

	// update maratoners
	async updateMaratoner( request, response ) {
		const { email, name, photo, bio, series, longitude, latitude, instaUser } = request.body;
		const seriesArray = parseStringAsArray(series);
		const location = {
			type: 'Point',
			coordinates: [longitude, latitude],
		};


		let maratoner = await Maratoner.updateOne(
			{ email: email },
			{
				name,
				photo,
				bio,
				series: seriesArray,
				location,
				instaUser,
			}
		);
		if(maratoner.nModified > 0) {
			return response.json(ok);
		}
		return response.json(InternalServerError);
	},

	// change password
	async changePassword( request, response ) {
		const { email, oldPass, newPass } = request.body;

		let maratoner = await Maratoner.findOne({ email });

		if ( maratoner.password === oldPass ) {

			await Maratoner.updateOne(
				{ email: email },
				{
					password: newPass
				}
			);
			return response.json(ok);
		}
		return response.json(registerNotFound);
	},

	// forgot password
	async forgotPassword( request, response ) {
		const { email } = request.body;

		let maratoner = await Maratoner.findOne({ email });

		if (!maratoner) {
			return response.json(registerNotFound);
		}

		let newPass = await generatePass();

		await Maratoner.updateOne(
			{ email: email },
			{
				password: newPass
			}
		);

		let mailConfigs = {
			receiver: email,
			subject: `Ola ${maratoner.name}, recuperação de senha`,
			textMessage: `Foi solicitado uma recuperação de senha com o seu email.\nComo solicitado a sua nova senha é: "${newPass}"\nRecomendamos que efetue a troca da senha após efetuar o login.`
		};

		await sendMail(mailConfigs);

		return response.json(ok);
	},

	// Search All Maratoners
	async getMaratoners(request, response) {
		const maratoners = await Maratoner.find({});

		return response.json(maratoners);
	},

	// Search by ProximityAndSerie
	async getMaratonersByProximityAndSerie(request, response) {
		const { latitude, longitude, distance, series } = request.query;
		const seriesArray = parseStringAsArray(series);
		const maratoners = await Maratoner.find({
			series: {
				$in: seriesArray,
			},
			location: {
				$near: {
					$geometry: {
						type: 'Point',
						coordinates: [longitude, latitude],
					},
					$maxDistance: Number(distance),
				},
			},
		});
		return response.json(maratoners);
	},

	// search by serie
	async getMaratonerBySerie(request, response) {
		const { series } = request.query;
		const seriesArray = parseStringAsArray(series);

		const maratoners = await Maratoner.find({
			series: {
				$in: seriesArray,
			},
		});

		return response.json(maratoners);
	},

	// delete maratoners
	async deleteMaratoner(request, response) {
		const { mail } = request.query;
		const maratoner = await Maratoner.findOneAndRemove({
			email: mail
		});
		return response.json(maratoner);
	},

	async login(request, response) {
		const { email, password } = request.body;

		let maratoner = await Maratoner.findOne({ email });

		if(!maratoner) {
			return response.json(registerNotFound);
		}
		else if(maratoner.password!==password) {
			return response.json(InvalidData);
		}
		maratoner.password = undefined;
		maratoner.email = undefined;
		maratoner = JSON.parse(JSON.stringify(maratoner ));
		// maratoner.password = undefined;
		console.log(maratoner.password);
		return response.json(maratoner);
	},

	// change Avatar
	async changeAvatar( request, response ) {
		const { email, newAvatar } = request.body;

		await Maratoner.findOne({ email });

		await Maratoner.updateOne(
			{ email: email },
			{
				photo: newAvatar
			}
		);
		return response.json(ok);
	},


};
