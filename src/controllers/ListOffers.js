// require('../../app/bdd_connect.js');
let repoUsers = require('../repository/Users.js');


module.exports = class UserHomeList {
    printTableGoodForSale(request, response) {
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
            response.render('admin/list/ListOffers', { allSellersinMyDbb })

        }, (err) => {
            console.log(err)
            request.flash('error', `Nous n'avons pas réussi a récupéré les données existantes sur notre serveur`);
            response.redirect('/home');
        })
        // let resultFromEachDbbTables = {

        // }
    }



    // J'ai besoin d un app.post pour renvoyer ses informations du serveur au navuagateur
    getSellerFormText(request, response) {
        if (typeof request.session === 'undefined' || typeof request.session.user === 'undefined') {
            request.flash('error', `problème pour joindre la base de Donnée, réessayez`);
            response.redirect('/ListOffers');
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
                response.redirect('/ListOffers');
            });
        }
        else {
            request.flash('error', 'Une erreur est survenue.');
            response.redirect('/ListOffers');
        }
    };
}
