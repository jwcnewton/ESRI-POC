const auth = require('../auth/githubAuthHandler');
const gitUser = require('../auth/githubClientApi');
const redirectUrl = "http://localhost:8080"

module.exports = (app) => {
    app.get('/callback', async (req, res) => {
        const code = req.query.code;

        try {
            const result = await auth.oauth2.authorizationCode.getToken({
                code,
            });

            const token = auth.oauth2.accessToken.create(result);
            const access_token = token.token.access_token;

            const user = await gitUser.getUserDetails(access_token);

            //TODO: Set more auth cookies
            res.cookie("_username", user, {
                httpOnly: true,
                expires: (new Date(Date.now() + 90000))
            });

            return res.redirect(redirectUrl);

        } catch (error) {
            return res.status(500).json('Authentication failed');
        }
    });

    app.get('/auth', (req, res) => {
        res.redirect(auth.authorizationUri);
    });
}