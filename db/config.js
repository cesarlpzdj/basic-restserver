const mongoose = require('mongoose');

const dbConnection = async() =>{
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Connection to DB successful');
        
    } catch (error) {
        console.log(error);
        throw new Error('Failed tried to access db');   
    }
}

module.exports = {
    dbConnection
}