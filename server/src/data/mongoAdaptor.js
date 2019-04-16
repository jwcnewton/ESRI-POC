const mongoose = require('mongoose');
const mongoConn = process.env.MONGO_CONNECTION;

const options = {
    server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }
};

mongoose.Promise = Promise;

const connect = function () {
    mongoose.connect(mongoConn, options);
};

connect();

mongoose.connection.on('error', err => {
    let stack;
    if (err) {
        console.log(err)
    }
});

mongoose.connection.on('disconnected', () => {
    setTimeout(connect, 3000);
});


// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        process.exit(0);
    });
}); 

module.exports = mongoose;