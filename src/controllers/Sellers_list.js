require('../../app/bdd_connect.js');
let repoSellers = require('../repository/Sellers.js');
slug = require('mongoose-slug-updater');
module.exports = class HomeListClass {




    printTableGoodForSaleUsersSide(request, response) {
        // ON CRÉE LA VARIABLE let repoSeller QUI EST UN OBJET / INSTENCE DE LA CLASS repossellers REQUIRES EN HAUT DE PAGE
        let repoSeller = new repoSellers();
        // console.log('ici 3')
        repoSeller.getallSellersinMyBdd().then(allSellersinMyBdd => {
            // on place allSellersinMyBdd qui est un un tableau comme variable a utilisé dans pug dans le rendu de la repose : { allSellersinMyBdd }
            // C'est ici qu on refere le chemin de la vue liste_homeview 
            response.render('admin/list/list_homeView', { allSellersinMyBdd })
            // console.log(allSellersinMyBdd)

        }, (err) => {
            console.log(err)
            request.flash('error', `Nous n'avons pas réussi a récupéré les données existantes sur notre serveur`);
            response.redirect('/dashboardView');
        })
    }

    // 

    deleteHome(request, response) {
        if (request.params.id != undefined && request.params.id != '') {
            let repo = new repoSellers();
            repo.deleteOne({ _id: request.params.id }).then(() => {
                // console.log(request.params.id)
                // console.log(`je checke la valeur d _id ds deleteForm ds Home_list controlleur`)
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

    // printTableGoodForSale(request, response) {
    //     // ON CRÉE LA VARIABLE let repoSeller QUI EST UN OBJET / INSTENCE DE LA CLASS repossellers REQUIRES EN HAUT DE PAGE
    //     let repoSeller = new repoSellers();
    //     // console.log('ici 3')
    //     repoSeller.getallSellersinMyBdd().then(allSellersinMyBdd => {

    //         // on place allSellersinMyBdd qui est un un tableau comme variable a utilisé dans pug dans le rendu de la repose : { allSellersinMyBdd }
    //         // C'est ici qu on refere le chemin de la vue liste_homeview 
    //         // response.render('admin/list/list_homeView', { allSellersinMyBdd })
    //         // console.log(`check est ce que je suis dan sle terminal?`);
    //         return;

    //     }, (err) => {
    //         console.log(err)
    //         request.flash('error', `Nous n'avons pas réussi a récupéré les données existantes sur notre serveur`);
    //         response.redirect('/dashboardView');
    //     })     
    // }

};