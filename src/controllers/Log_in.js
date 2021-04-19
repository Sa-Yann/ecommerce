let RepoLog_in = require('../repository/Users.js');

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
        };
        // console.log(entity_login);

        let repo = new RepoLog_in();

        // permet de recevoir le mot de passe haché en base de donnée


        const bcrypt = require("bcryptjs")



        repo.log_in_Exists(entity_login.email).then((userBdAllDatas) => {
            // si l'email existe deja dans la bdd
            console.log(userBdAllDatas);
            if (userBdAllDatas !== false) {
                // bcrypt compare le mot depasse fourni avec le mot de passe contenu en bdd pour l email
                bcrypt.compare(entity_login.password, userBdAllDatas.password, function (err, isMatch) {
                    if (err) {
                        throw err
                    } else if (!isMatch) {
                        request.flash('error', 'Identification incorrect');
                        response.redirect('/log_in');
                    } else {
                        request.session.user = userBdAllDatas;
                        request.flash('notify', 'Vous êtes maintenant connecté');
                        response.redirect('/');
                    }
                });
            }
            /*
            if (result === true) {
                request.flash('notify', 'Welcome home, Vous êtes bien connecté');
                response.redirect('/');
                // response.render('/', {
                //     // error: `Cette adresse email existe déjà`,
                //     // form: entity_login,

                // });
            } else {
                // sinon on tente de le créer

                response.render('register/log_in', {
                    error: `Vous avez du faire une erreur d'identifiant ou de mot de passe`,
                    formLogIn: entity_login
                });
            };
            */
        });

    };
}