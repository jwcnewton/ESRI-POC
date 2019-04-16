const path = require('path');

module.exports = (app, public) => {
    app.get('/', (req, res) => {
        res.sendFile(path.join(public, 'index.html'));
    });

    app.use('/GetSaveButtonView', (req, res) => {
        res.sendFile(path.join(public, '/views/save-drawings.html'));
    });
}