const shapesRepository = require('../repository/shapeRepositoryService');

module.exports = (app) => {
    app.get('/allShapes', async (req, res) => {
        const shapes = await shapesRepository.getAllShapes();
        res.json(shapes);
    });

    // TODO: Validate OAUTH before adding new shape
    app.post('/saveShape', async (req, res) => {
        const requestBody = req.body;

        if(requestBody.features != undefined){
            const features = JSON.parse(requestBody.features);
            for (let i = 0; i < features.length; i++) {
                await shapesRepository.saveNewShape(features[i]);   
            }
        }

        res.json(true);
    });
};