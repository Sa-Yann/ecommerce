// let crypto = require('crypto')

// module.exports = class CryptoToken {

//     createToken() {
//         return require('crypto').createHash('sha1').update(`${new Date().toDateString()}${Math.random()}`).digest('hex').toLowerCase();
//     };

// }

// module.export = class 



module.exports = {

    generateTk: (req, res, next) => {
        if (typeof req.session == 'undefined') { console.warn(`Please install express-session and add in middleware`); }
        // On crée le token csrf dans la session 
        req.session.token_csrf = require('crypto').createHash('sha1').update(`${new Date().toDateString()}${Math.random()}`).digest('hex').toLowerCase();
        // On envoie à la vue le nouveau token_csrf
        res.locals.token_csrf = req.session.token_csrf;
        return next();
    },
    controlTk: (req, res, next) => {
        if (typeof req.session == 'undefined') { console.warn(`Please install express-session and add in middleware`); }
        // si il n'y a pas la clé csrf ou qu'elle ne correspond pas
        if (!('csrf' in req.body && req.body.csrf === req.session.token_csrf && req.body.csrf !== '')) {
            return res.status(403).send("Cross-site request forgery détecté!");
        }
        res.locals.token_csrf = req.session.token_csrf; // pour les form avec erreur on doit renvoyer le token

        return next();
    }


}




