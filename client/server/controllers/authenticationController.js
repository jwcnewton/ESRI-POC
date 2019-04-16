const path = require('path');

module.exports = (app, public) => {
    app.use('/IsAuthenticated', (req, res) => {
        const is_authenticated = req.cookies._username != undefined;
        
        return res.status(200).json({ 
            is_authenticated: is_authenticated 
        });
    });
    
    app.use('/GetAuthView', (req, res) => {
        res.sendFile(path.join(public, '/views/auth.html'));
    });
    
    app.use('/GetUser', (req, res) => {
        const user_name = req.cookies._username;
    
        return res.status(200).json({ 
            user: user_name 
        });
    });
    
}