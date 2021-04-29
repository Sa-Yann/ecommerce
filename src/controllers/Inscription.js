let RepoUsers = require('../repository/Users.js');
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

        // (new RepoUsers).add(entity).then((user) => {
        //     // redirect express methode pour permettre la redirection vers la page choisi / = localhost
        //     response.redirect('/');
        // });
        // console.log(entity);
        // // let userBddDatasAdded = (new RepoUsers).add(entity);
        // // console.log(entity);
        // // return userBddDatasAdded.then(() => {
        // //     request.redirect('/');
        // //     // expected output: "Success!"
        // // });
        let repo = new RepoUsers();
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


    processUserFormChanges(request, response) {
        // request.body pour tester les données reçues dans request
        // console.log(request.body);
        let entity = {
            email: request.body.email || '',
            password: request.body.password || '', // devra être hashé
            civility: request.body.civility || '',
            firstname: request.body.firstname || '',
            lastname: request.body.lastname || '',
            phone: request.body.phone || '',
            role: request.body.role || ''
        };

        let repo = new RepoUsers();

        // permet de recevoir le mot de passe haché en base de donnée
        // let bcrypt = require('bcryptjs');
        // entity.password = bcrypt.hashSync(
        //     entity.password,
        //     bcrypt.genSaltSync(10)
        // );

        // sinon on tente de le créer
        // repo.add(entity).then((user) => {
        //     //request.flash('success','Vous etes bien inscris');
        //     request.flash('notify', 'Votre compte a bien été modifié.');
        //     response.redirect('/');
        // }, (err) => {
        //     response.render('register/inscription', {
        //         error: `L'enregistrement en base de données a échoué`,
        //         formInscription: entity
        //     });
        // });

        // partie update
        let promise;
        if (typeof request.params.id !== "undefined") {

            console.log(request.params.id)
            promise = repo.UpdateUser(request.params.id, entity)

        } else {
            promise = repo.add(entity)
        };
        promise.then(() => {
            request.flash('notify', `Vous venez de modifier les information de l utilisateur ${request.body.email} en base de donnée.`);

            response.redirect('/dashboardView/AllUsersandAdmin');
        }), () => {
            response.render('admin/list/list_registeredUsersBck', {
                error: `L'enregistrement en base de données a échoué`,
                formInscription: entity
            });
        }
    }

    printFormUserEdit(request, response, next) {

        if (typeof request.params.id !== "undefined") {
            // La méthode then() renvoie un objet Promise.Elle peut prendre jusqu'à deux arguments 
            // qui sont deux fonctions callback à utiliser en cas de complétion ou d'échec de la Promise.
            console.log('je suis ds le if qui gere ma methode getById qui est dans le if de printFormAdminEditMethode')
            let promise = (new RepoUsers).getUserById(request.params.id);
            promise.then((formContent) => {
                // console.log(formContent)
                // formContent est la réposne de getSellerById
                response.render('register/inscriptionBck',
                    {
                        formInscription: formContent,
                        saveButtonText: `Sauvegarder Vos modifications`,
                        titleFormAdmin: `Modifier les infos de l'utilisateur`
                    }
                )
            },
                // sinon
                () => {
                    request.flash('error', `nous n'avons pas trouver votre bien dans la Base de donnée`);
                    response.redirect('/list_registeredUsersBck');
                });
        } else {
            // sinon
            // response.render('admin/seller/registerHomesView', {
            response.render('register/inscriptionBck', {
                formInscription: {},
                saveButtonText: `Sauvegarder Vos modifications`,
                titleFormAdmin: `Modifier les infos de l utilsateur`
            });
        }
        // response.render fait appel au fichier admin_page.pug
        // { formInfoNewHome: {} } stipule a la requete app.get que lle formulaire d'inscription
        // est remplie via les valeur de entity a qui il est attribue/associé dans  le code pug        
        return;
        // }
        // request.flash('error', `Vous devez être connecté pour accéder à l'administration.`);
        // response.redirect('/dashboardView');
    }

    deleteUser(request, response) {
        if (request.params.id != undefined && request.params.id != '') {
            let repo = new RepoUsers();
            repo.deleteOne({ _id: request.params.id }).then(() => {
                // console.log(request.params.id)
                // console.log(`je checke la valeur d _id ds deleteForm ds Home_list controlleur`)
                request.flash('notify', `l'utilisateur a bien été supprimé.`);
                response.redirect('/dashboardView/AllUsersandAdmin');
            }, () => {
                request.flash('error', `La suppression de l'utilisateur a échoué.`);
                response.redirect('/dashboardView/AllUsersandAdmin');
            });
        }
        else {
            request.flash('error', 'Une erreur est survenue.');
            response.redirect('/dashboardView/AllUsersandAdmin');
        }
    };

};