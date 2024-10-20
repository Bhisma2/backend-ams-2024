const mongoose = require('mongoose');

const connectMongo = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
        return connection;
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectMongo;