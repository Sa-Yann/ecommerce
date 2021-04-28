// On utilise exports.generateTk  plutot qu un module export avec une classe par praticiter

exports.generateTk = function generateTk(req, res, next) {

    let token = require('crypto').createHash('sha1').update(`${new Date().toDateString()}${Math.random()}`).digest('hex').toLowerCase();
    // console.log(token)

    // l'avoir dans session permet de comparer avec c qui va arriver en local pour confirmer
    if (token !== undefined) {
        // on le stoke dans la sesion
        // stock le token generé dans la session en request
        req.session.csrf = token
        // stock le token generé ds local pour y avoir acces dans la vue en response
        res.locals.token_csrf = token
    } else
        return res.sendStatus(403)
    next();
}

exports.controlTk = function controlTk(req, res, next) {

    let tokendansleForm = req.body.token_csrf
    let tokenEnSession = req.session.csrf
    // on test c qu on recupere en local et en session
    console.log(tokendansleForm)
    console.log(tokenEnSession)

    if (!tokendansleForm) {
        return res.sendStatus(403)
        // return res.send(`<p style="font-size: 1rem; color: red;">
        //              <strong>pas de token présent</strong>
        //              </p>`);
    }

    if (tokendansleForm !== tokenEnSession) {
        return res.status(send('les token ne sont pas les memes'))
        // return res.send(`<p style="font-size: 1rem; color: black;">
        //              <strong>les token ne sont pas les memes</strong>
        //              </p>`);
    } else
        // {
        //     return res.send(`<p style="font-size: 1rem;">
        //                <strong>les deux cookies match</strong>
        //                </p>`);
        // }

        next();

}







// exports.generateTk = function generateTk(req, res, next) {
//     (err, data) => {
//         if (err) {
//             return res.sendStatus(403);
//         } else {
//             let token = require('crypto').createHash('sha1').update(`${new Date().toDateString()}${Math.random()}`).digest('hex').toLowerCase();
//             // console.log(token)
//             // on le stoke dans la sesion
//             // stock le token generé dans la session en request
//             req.session.csrf = token
//             // stock le token generé ds local pour y avoir acces dans la vue en response
//             res.locals.token_csrf = token
//             // l'avoir dans session permet de comparer avec c qui va arriver en local pour confirmer 
//             // if (err) {
//             //     return res.sendStatus(403);
//             // }
//             next();

//         }

//     };
// }


















