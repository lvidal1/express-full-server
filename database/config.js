const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Connected to database');

    } catch (error) {
        console.log(error);
        throw new Error('Error while connecting database...')
    }

}

module.exports = dbConnection;