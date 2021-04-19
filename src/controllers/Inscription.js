let RepoUser = require('../repository/Users.js');
// let bcrypt = require("bcryptjs");

module.exports = class Inscription {
    print(req, res) {
        // res.render fait appel au fichier inscription.pug
        // { formInscription: {} } stipule a la requete app.get que lle formulaire d'inscription 
        // est remplie via les valeur de entity a qui il est attribue/associé dans  le code
        res.render('register/inscription', { formInscription: {} });
    }

    // Le controller reçoit les données du formulaire, il doit préparer les données pour les envoyer 
    // au repository qui se contentera de les enregistrer dans la BDD.
    processForm(request, response) {
        // request.body pour tester les données reçues dans request
        // console.log(request.body);
        let entity = {
            email: request.body.email || '',
            password: request.body.password || '', // devra être hashé
            civility: request.body.civility || '',
            firstname: request.body.firstname || '',
            lastname: request.body.lastname || '',
            phone: request.body.phone || ''
        };

        // (new RepoUser).add(entity).then((user) => {
        //     // redirect express methode pour permettre la redirection vers la page choisi / = localhost
        //     response.redirect('/');
        // });
        // console.log(entity);
        // // let userBddDatasAdded = (new RepoUser).add(entity);
        // // console.log(entity);
        // // return userBddDatasAdded.then(() => {
        // //     request.redirect('/');
        // //     // expected output: "Success!"
        // // });
        let repo = new RepoUser();
        repo.emailExists(entity.email).then((result) => {
            // si l'email existe deja dans la bdd
            if (result === true) {
                response.render('register/inscription', {
                    error: `Cette adresse email existe déjà`,
                    formInscription: entity,
                });
            } else {

                // permet de recevoir le mot de passe haché en base de donnée
                let bcrypt = require('bcryptjs');
                entity.password = bcrypt.hashSync(
                    entity.password,
                    bcrypt.genSaltSync(10)
                );

                // sinon on tente de le créer
                repo.add(entity).then((user) => {
                    //request.flash('success','Vous etes bien inscris');
                    request.flash('notify', 'Votre compte a bien été créé.');
                    response.redirect('/');
                }, (err) => {
                    response.render('register/inscription', {
                        error: `L'enregistrement en base de données a échoué`,
                        formInscription: entity
                    });
                });
            }
        });
    }
};