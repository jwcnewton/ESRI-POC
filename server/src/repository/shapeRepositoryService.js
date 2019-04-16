const shapeModel = require('./models/shape');

let getAllShapes = () => {
    return shapeModel.find({}).exec()
        .then(shapes => {
            return shapes;
        }).catch(err => {
            return err;
        });
}

let saveNewShape = (model) => {
    var newShape = new shapeModel(model);
    
    //TODO: Refactor return value
    return newShape.save()
        .then(saved => {
            return saved;
        }).catch(err => {
            return err;
        });
}

module.exports = {
    getAllShapes,
    saveNewShape
}