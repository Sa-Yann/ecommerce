let repoSellers = require('../repository/Sellers.js')

module.exports = class AdminSeller {
    printFormAdmin(request, response) {
        if (typeof request.session.user !== 'undefined') {
            // response.render fait appel au fichier admin_page.pug
            // { formInfoNewHome: {} } stipule a la requete app.get que lle formulaire d'inscription
            // est remplie via les valeur de entity a qui il est attribue/associé dans  le code pug
            response.render('admin/seller/registerHomesView', { formInfoNewHome: {} });
            return;
        }
        request.flash('error', `Vous devez être connecté pour accéder à l'administration.`);
        response.redirect('/dashboardView');
    }

    // Le controller reçoit les données du formulaire, il doit préparer les données pour les envoyer 
    // au repository qui se contentera de les enregistrer dans la BDD.
    processFormAdmin(request, response) {
        // request.body pour tester les données reçues dans request
        console.log(request.body);
        let entity = {
            lastnameSeller: request.body.lastnameSeller || '',
            adress: request.body.adress || '',
            adress_more: request.body.adress_more || '',
            postalCode: request.body.postalCode || '',
            city: request.body.city || '',
            infocompl1: request.body.infocompl1 || '',
            firstname: request.body.firstname || '',
            lastname: request.body.lastname || '',
            civility: request.body.civility || '',
            email: request.body.email || '',
            mobil: request.body.mobil || '',
            phone: request.body.phone || '',
            info_compl2: request.body.info_compl2 || '',
        };


        let repo = new repoSellers();
        repo.emailExists(entity.email).then((result) => {
            // si l'email existe deja dans la bdd
            if (result === true) {
                response.render('admin/seller/registerHomesView', {
                    error: `Cette adresse email existe déjà`,
                    formInfoNewHome: entity,
                });
            } else {

                // permet de recevoir le mot de passe haché en base de donnée
                // let bcrypt = require('bcryptjs');
                // entity.password = bcrypt.hashSync(
                //     entity.password,
                //     bcrypt.genSaltSync(10)
                // );

                // sinon on tente d'inserer les données dans la BBDD
                repo.add(entity).then((user) => {
                    //request.flash('success','Vous etes bien inscris');
                    request.flash('notify', 'Votre Habitation à bien été créé.');
                    response.redirect('/dashboardView');
                }, (err) => {
                    // response.render('register/inscription', {
                    response.render('admin/seller/registerHomesView', {
                        error: `L'enregistrement en base de données a échoué`,
                        formInfoNewHome: entity
                    });
                });
            }
        });
    }

};
