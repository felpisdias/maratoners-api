const Maratoner = require('../schema/maratoner-schema');
const duplicateMail = require('../utils/enums');

module.exports = {
    async addMaratoner(request, response) {
        const { email, password, name, photo, bio, series, longitude,latitude } = request.body;

        let maratoner = await Maratoner.findOne({ email });

        if (!maratoner) {
            seriesArray = series.split(',').map(serie => serie.trim());

            const location = {
                type: 'Point',
                coordinates: [ longitude, latitude ],
            };

            maratoner = await Maratoner.create({
                email,
                password,
                name,
                photo,
                bio,
                series: seriesArray,
                location,
            })

            return response.json(maratoner);
        }
        else {
            return response.json(duplicateMail);
        }
    },

    async getMaratoners(request, response) {
         const maratoners = await Maratoner.find();

         return response.json(maratoners);
    },

    // async getMaratonerByInterest(request, response) {
    //      const maratoners = await Maratoner.find({
    //         seriesArray: request.body        
    //      });
    // },

};