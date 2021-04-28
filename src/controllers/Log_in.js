let RepoLog_in = require('../repository/Users.js');
// on veut l access a l appkey situé dans le dossier config:
let config = require('../../app/config.js')

module.exports = class Log_in {
    print(req, res) {
        res.render('register/log_in', { formLogIn: {} })
    };

    // Le controller reçoit les données du formulaire, il doit préparer les données pour les envoyer 
    // au repository qui se fera une recherche de similiratité pour confirmer le fait d etre connecter.
    processLog_in(request, response) {
        // request.body pour tester les données reçues dans request
        // console.log(request.body);
        let entity_login = {
            email: request.body.email || '',
            password: request.body.password || '', // devra être hashé
            role: request.body.role || ''
        };
        // console.log(entity_login);

        let repo = new RepoLog_in();

        // permet de recevoir le mot de passe haché en base de donnée


        const bcrypt = require("bcryptjs")



        repo.log_in_Exists(entity_login.email).then((userBdAllDatas) => {
            // si l'email existe deja dans la bdd
            // console.log(userBdAllDatas);
            if (userBdAllDatas !== false) {
                // bcrypt compare le mot depasse fourni avec le mot de passe contenu en bdd pour l email
                bcrypt.compare(entity_login.password, userBdAllDatas.password, function (err, isMatch) {
                    if (err) {
                        throw err
                    } else if (!isMatch) {
                        request.flash('error', 'Identification incorrect');
                        response.redirect('/log_in');
                    } else {
                        // request.session.user = userBdAllDatas;
                        let jwt = require('jsonwebtoken');
                        let Cookies = require("cookies");
                        let accessToken = jwt.sign({
                            firstname: userBdAllDatas.firstname,
                            lastaname: userBdAllDatas.lastaname,
                            email: userBdAllDatas.email,
                            roles: userBdAllDatas.role
                        },
                            config.appKey, { expiresIn: 604800 });
                        // new Cookies(request, response).set('nom du Token', accessToken, { httpOnly: true, secure: false });
                        new Cookies(request, response).set('le_cookie_jwt', accessToken, { httpOnly: true, secure: false });
                        request.flash('notify', `Vous êtes maintenant connecté et loger en tant qu admin`);
                        // request.flash('notify', 'Vous êtes maintenant connecté');
                        response.redirect('/');
                    }
                });
            }

        });

    };

    disconnect(request, response) {
        let Cookies = require("cookies");
        new Cookies(request, response).set('acces-token', null, { maxAge: 0 });
        request.flash('notify', `Vous êtes bien déconnecté.`),
            response.redirect('/');
    };

}