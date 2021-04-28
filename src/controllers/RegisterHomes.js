let repoSellers = require('../repository/Sellers.js')

module.exports = class AdminSeller {

    list(request, response) {
        let page = parseInt(request.query.page) || 1;
        let limit = 10; // nombre d'éléments par page
        let offset = (limit * page) - limit;

        // countBy devra retourner le nombre d'éléments 
        // (il peut y avoir un filtre si il existe des criteres)
        let repo = new repoUsers();
        repo.countBy({}).then((count) => {
            let last = Math.ceil(count / limit);
            // // le filtre sera le même que dans countBy
            repo.findBy({}, limit, offset).then((data) => {
                response.render('admin/list/listhomeView', {
                    data,
                    page,
                    last
                });
            });
        });
    }

    printFormAdmin(request, response) {

        response.render('admin/seller/registerHomesView', {
            formInfoNewHome: {}, saveButtonText: `Sauvegarder`,
            titleFormAdmin: `Enregistrer un Bien`
        });


        // if (typeof request.session.user !== 'undefined') {
        //     // response.render fait appel au fichier admin_page.pug
        //     // { formInfoNewHome: {} } stipule a la requete app.get que lle formulaire d'inscription
        //     // est remplie via les valeur de entity a qui il est attribue/associé dans  le code pug
        //     console.log(`test avant response`)
        //     response.render('admin/seller/registerHomesView', {
        //         formInfoNewHome: {}, saveButtonText: `Sauvegarder`,
        //         titleFormAdmin: `Enregistrer un Bien`
        //     });
        //     console.log(`test aprés response printFromAdmin`)
        //     return;
        // }
        // request.flash('error', `Vous devez être connecté pour accéder à l'administration.`);
        // response.redirect('/dashboardView');
    }


    // // // J'ai besoin d un app.get pour aller chercher les infos informations du serveur vers navuagateur
    // getSellerFormText(request, response) {
    //     console.log('je suis ds le controlleur au niveau de dans la méthode getSellerById')
    //     if (typeof request.session === 'undefined' || typeof request.session.user === 'undefined') {
    //         request.flash('error', `problème pour joindre la base de Donnée, réessayez`);
    //         response.redirect('/list_homeView');
    //         return;
    //     }

    //     if (request.params.id != undefined && request.params.id != '') {
    //         let repo = new repoSellers();
    //         repo.getSellerById({ _id: request.params.id }).then(() => {
    //             console.log(_id);
    //             console.log('je suis ds le controlleur au niveau de epo.getSellerById')
    //             request.flash('notify', `Bienvenue Dans la zone d'update de vos informatioins.`);
    //             response.render('/registerHomesView');
    //         }, () => {
    //             request.flash('error', 'La suppression du bien a échoué.');
    //             response.redirect('/list_homeView');
    //         });
    //     }
    //     else {
    //         request.flash('error', 'Une erreur est survenue.');
    //         response.redirect('/list_homeView');
    //     }
    // };




    printFormAdminEdit(request, response, next) {



        // getSellerFormText(request, response)
        // if (typeof request.session.user !== 'undefined') {
        if (typeof request.params.id !== "undefined") {
            // La méthode then() renvoie un objet Promise.Elle peut prendre jusqu'à deux arguments 
            // qui sont deux fonctions callback à utiliser en cas de complétion ou d'échec de la Promise.
            // const promise1 = new Promise((resolve, reject) => {
            //     resolve('Success!');
            // });

            // promise1.then((value) => {
            //     console.log(value);
            //     // expected output: "Success!"
            // });
            console.log('je suis ds le if qui gere ma methode getById qui est dans le if de printFormAdminEditMethode')
            let promise = (new repoSellers).getSellerById(request.params.id);
            promise.then((formContent) => {
                // console.log(formContent)
                // formContent est la réposne de getSellerById
                response.render('admin/seller/registerHomesView',
                    {
                        formInfoNewHome: formContent,
                        saveButtonText: `Sauvegarder Vos modifications`,
                        titleFormAdmin: `Modifier les infos d'un Bien`
                    }
                )
            },
                // sinon
                () => {
                    request.flash('error', `nous n'avons pas trouver votre bien dans la Base de donnée`);
                    response.redirect('/list_homeView');
                });
        } else {
            // sinon
            response.render('admin/seller/registerHomesView', {
                formInfoNewHome: {},
                saveButtonText: `Sauvegarder Vos modifications`,
                titleFormAdmin: `Modifier les infos d'un Bien`
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


    getOneSellerDatas(request, response) {
        request = new repoSellers();
        console.log(request);
        return;
        // console.log('la fonction getOneSellerDatas dans RegisterHome.js');
    }

    // Le controller reçoit les données du formulaire, il doit préparer les données pour les envoyer 
    // au repository qui se contentera de les enregistrer dans la BDD.
    processFormAdmin(request, response) {
        // request.body pour tester les données reçues dans request
        // console.log(request.body);
        let entity = {
            lastnameSeller: request.body.lastnameSeller || '',
            adress: request.body.adress || '',
            adress_more: request.body.adress_more || '',
            postalCode: request.body.postalCode || '',
            city: request.body.city || '',
            info_compl1: request.body.info_compl1 || '',
            lastname: request.body.lastname || '',
            firstname: request.body.firstname || '',
            civility: request.body.civility || '',
            email: request.body.email || '',
            mobil: request.body.mobil || '',
            phone: request.body.phone || '',
            info_compl2: request.body.info_compl2 || '',
            titreDescription: request.body.titreDescription || "",
            priceHome: request.body.priceHome || "",
            typedeVendeur: request.body.typedeVendeur || "",
            postalCodeDuBien: request.body.postalCodeDuBien || "",
            cityDuBien: request.body.cityDuBien || "",
            annonceurStatus: request.body.annonceurStatus || "",
            titleDescriptionHouse: request.body.titleDescriptionHouse || "",
            textDescriptionHouse: request.body.textDescriptionHouse || "",
            date: request.body.date || ""
        };


        // METHODE ADD SANS POSSIBILITE D UPDATE
        // let repo = new repoSellers();

        // // sinon on tente d'inserer les données dans la BBDD
        // repo.add(entity).then((user) => {
        //     //request.flash('success','Vous etes bien inscris');
        //     request.flash('notify', 'Votre Habitation à bien été créé.');
        //     response.redirect('/dashboardView');
        // }, (err) => {
        //     response.render('admin/seller/registerHomesView', {
        //         error: `L'enregistrement en base de données a échoué`,
        //         formInfoNewHome: entity
        //     });
        // });


        let repo = new repoSellers();
        let promise;
        if (typeof request.params.id !== "undefined") {
            console.log(request.params.id)
            promise = repo.UpdateSeller(request.params.id, entity)

        } else {
            promise = repo.add(entity)
        };
        promise.then(() => {
            request.flash('notify', `Vous venez d'enregistrer un nouveau bien dans votre base de donnée.`);
            response.redirect('/list_homeView');
        }), () => {
            response.render('admin/seller/registerHomesView', {
                error: `L'enregistrement en base de données a échoué`,
                formInfoNewHome: entity
            });
        }



    };
};
