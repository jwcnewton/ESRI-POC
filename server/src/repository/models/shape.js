const mongo_connection = require("../../data/mongoAdaptor");

const shapesSchema = mongo_connection.Schema({
    geometry: {
        type: Object
    },
    symbol: {
        type: Object
    }
});

module.exports = mongo_connection.model('shapes', shapesSchema);