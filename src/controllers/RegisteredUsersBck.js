// const { response } = require('express');
let repoUsers = require('../repository/Users');


module.exports = class ListRegisteredBck {

    // renderListRegisteredUsers(resquest, response) {
    //     response.render('admin/list/list_registeredUsersBck')
    // }

    printTableListUsersBck(request, response) {
        // ON CRÉE LA VARIABLE let repoSeller QUI EST UN OBJET / INSTENCE DE LA CLASS repoUsers REQUIRES EN HAUT DE PAGE
        let usersRepo = new repoUsers();
        // console.log('ici 3')
        usersRepo.getallUsersinMyBdd().then(allUsersinMyBdd => {
            // console.log(allUsersinMyBdd)

            // on place allUsersinMyDbb qui est un un tableau comme variable a utilisé dans pug dans le rendu de la repose : { allUsersinMyDbb }
            // C'est ici qu on refere le chemin de la vue list_registeredUsersBck
            response.render('admin/list/list_registeredUsersBck', { allUsersinMyBdd })
            console.log(`check est ce que je suis dans printTableListUsersBck`);
            return;

        }, (err) => {
            console.log(err)
            request.flash('error', `Nous n'avons pas réussi a récupéré les données existantes sur notre serveur`);
            response.redirect('/dashboardView');
        })

    }

    printFormClientEditBck(request, response, next) {



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



};

