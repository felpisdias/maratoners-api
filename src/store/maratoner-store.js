const Maratoner = require('../schema/maratoner-schema');
const { duplicateRegister, ok, registerNotFound } = require('../utils/enums');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
	async addMaratoner(request, response) {
		const { email, password, name, photo, bio, series, longitude, latitude, instaUser } = request.body;

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

			return response.json(maratoner);
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

		const maratoner = await Maratoner.updateOne(
			{ email: email },
			{
				name: name,
				photo: photo,
				bio: bio,
				series: seriesArray,
				location,
				instaUser,
			}
		);
		return response.json(maratoner);
	},

	// change password
	async changePassword( request, response ) {
		const { email, oldPass, newPass } = request.body;

		let maratoner = await Maratoner.findOne({ email });

		if ( maratoner.password === oldPass ) {

			maratoner = await Maratoner.updateOne(
				{ email: email },
				{
					password: newPass
				}
			);
			return response.json(ok);
		}
		return response.json(registerNotFound);
	},

	// // forgot password
	// async forgotPassword( request, response ) {
	// 	const { email, oldPass, newPass } = request.body;

	// 	let maratoner = await Maratoner.findOne({ email });

	// 	if (!maratoner) {
	// 		return response.json(registerNotFound);
	// 	}

	// 	return response.json(ok);
	// },

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
	async deleteMaratoner( request, response ) {
		const { mail } = request.query;
		const maratoner = await Maratoner.findOneAndRemove({
			email: mail
		});
		return response.json(maratoner);
	},

};
