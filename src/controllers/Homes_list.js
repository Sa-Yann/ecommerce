require('../../app/bdd_connect.js');
let repoSellers = require('../repository/Sellers.js');

module.exports = class HomeListClass {


    printSingleArticle(request, response) {

        if (typeof request.session.user !== 'undefined') {
            if (typeof request.params.id !== "undefined") {

                console.log('je suis ds le if qui gere ma methode getById qui est dans le if de printSingleArticle')
                let promise = (new repoSellers).getSellerById(request.params.id);
                promise.then((formContent) => {
                    // formContent est la réposne de getSellerById
                    response.render('listPages/singleOfferView',
                        {
                            formInfoNewHome: formContent,
                            // saveButtonText: `Sauvegarder Vos modifications`,
                            // titleFormAdmin: `Modifier les infos d'un Bien`
                        }
                    )
                },
                    // sinon
                    () => {
                        request.flash('error', `nous n'avons pas trouver votre bien dans la Base de donnée`);
                        // response.redirect(' /dashboardView');
                        response.redirect('/listOffers')
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
        }
        request.flash('error', `Vous devez être connecté pour accéder à l'administration.`);
        response.redirect('/dashboardView');
    }

    printTableGoodForSaleUsersSide(request, response) {
        // ON CRÉE LA VARIABLE let repoSeller QUI EST UN OBJET / INSTENCE DE LA CLASS repossellers REQUIRES EN HAUT DE PAGE
        let repoSeller = new repoSellers();
        // console.log('ici 3')
        repoSeller.getallSellersinMyDbb().then(allSellersinMyDbb => {
            // // on doit l appeler allSellersinMyDbb comme dans le reposirory allSellersinMyDbb
            // console.log(allSellersinMyDbb);
            // console.log(allSellersinMyDbb[0].lastnameSeller);
            // // pour avoir toutes les valeurs d une variable je dois faire une loupe
            // let i = 0
            // for (i = 0; i, i < allSellersinMyDbb[i].lastnameSeller; i++) {
            //     console.log(allSellersinMyDbb.lastnameSeller);
            // }


            // on place allSellersinMyDbb qui est un un tableau comme variable a utilisé dans pug dans le rendu de la repose : { allSellersinMyDbb }
            // C'est ici qu on refere le chemin de la vue liste_homeview 
            response.render('listPages/listOffers', { allSellersinMyDbb })

        }, (err) => {
            console.log(err)
            request.flash('error', `Nous n'avons pas réussi a récupéré les données existantes sur notre serveur`);
            response.redirect('/dashboardView');
        })
        // let resultFromEachDbbTables = {

        // }
    }

    printTableGoodForSale(request, response) {
        // ON CRÉE LA VARIABLE let repoSeller QUI EST UN OBJET / INSTENCE DE LA CLASS repossellers REQUIRES EN HAUT DE PAGE
        let repoSeller = new repoSellers();
        // console.log('ici 3')
        repoSeller.getSellerFormText().then(allSellersinMyDbb => {
            // // on doit l appeler allSellersinMyDbb comme dans le reposirory allSellersinMyDbb
            // console.log(allSellersinMyDbb);
            // console.log(allSellersinMyDbb[0].lastnameSeller);
            // // pour avoir toutes les valeurs d une variable je dois faire une loupe
            // let i = 0
            // for (i = 0; i, i < allSellersinMyDbb[i].lastnameSeller; i++) {
            //     console.log(allSellersinMyDbb.lastnameSeller);
            // }


            // on place allSellersinMyDbb qui est un un tableau comme variable a utilisé dans pug dans le rendu de la repose : { allSellersinMyDbb }
            // C'est ici qu on refere le chemin de la vue liste_homeview 
            // response.render('admin/list/list_homeView', { allSellersinMyDbb })
            console.log(`check est ce que je suis dan sle terminal?`);
            return;

        }, (err) => {
            console.log(err)
            request.flash('error', `Nous n'avons pas réussi a récupéré les données existantes sur notre serveur`);
            response.redirect('/dashboardView');
        })
        // let resultFromEachDbbTables = {

        // }
    }

    deleteHome(request, response) {
        if (typeof request.session === 'undefined' || typeof request.session.user === 'undefined') {
            request.flash('error', `Vous devez être connecté pour accéder à l'administration.`);
            response.redirect('/connexion');
            return;
        }

        if (request.params.id != undefined && request.params.id != '') {
            let repo = new repoSellers();
            repo.deleteOne({ _id: request.params.id }).then(() => {
                console.log(request.params.id)
                console.log(`je checke la valeur d _id ds deleteForm ds Home_list controlleur`)
                request.flash('notify', 'Le bien a été supprimé.');
                response.redirect('/list_homeView');
            }, () => {
                request.flash('error', 'La suppression du bien a échoué.');
                response.redirect('/list_homeView');
            });
        }
        else {
            request.flash('error', 'Une erreur est survenue.');
            response.redirect('/list_homeView');
        }
    };

    // J'ai besoin d un app.post pour renvoyer ses informations du serveur au navuagateur
    getSellerFormText(request, response) {
        if (typeof request.session === 'undefined' || typeof request.session.user === 'undefined') {
            request.flash('error', `problème pour joindre la base de Donnée, réessayez`);
            response.redirect('/list_homeView');
            return;
        }

        if (request.params.id != undefined && request.params.id != '') {
            let repo = new repoSellers();
            repo.getSellerById({ _id: request.params.id }).then(() => {
                console.log(_id);
                console.log('je suis ds le controlleur au niveau de epo.getSellerById')
                request.flash('notify', `Bienvenue Dans la zone d'update de vos informatioins.`);
                response.render('/registerHomesView');
            }, () => {
                request.flash('error', 'La suppression du bien a échoué.');
                response.redirect('/list_homeView');
            });
        }
        else {
            request.flash('error', 'Une erreur est survenue.');
            response.redirect('/list_homeView');
        }
    };

};



