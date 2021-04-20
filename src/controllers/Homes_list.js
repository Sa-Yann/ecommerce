require('../../app/bdd_connect.js');
let repoSellers = require('../repository/Sellers.js');

module.exports = class HomeListClass {
    printTableGoodForSale(request, response) {
        // ON CRÉE LA VARIABLE let repoSeller QUI EST UN OBJET / INSTENCE DE LA CLASS repossellers REQUIRES EN HAUT DE PAGE
        let repoSeller = new repoSellers();
        repoSeller.getallSellersinMyDbb().then(allSellersinMyDbb => {
            // // on doit l appeler allSellersinMyDbb comme dans le reposirory allSellersinMyDbb
            console.log(allSellersinMyDbb);
            // console.log(allSellersinMyDbb[0].lastnameSeller);
            // // pour avoir toutes les valeurs d une variable je dois faire une loupe
            // let i = 0
            // for (i = 0; i, i < allSellersinMyDbb[i].lastnameSeller; i++) {
            //     console.log(allSellersinMyDbb.lastnameSeller);
            // }


            // on place allSellersinMyDbb qui est un un tableau comme variable a utilisé dans pug dans le rendu de la repose : { allSellersinMyDbb }
            response.render('admin/list/list_homeView', { allSellersinMyDbb })

        }, (err) => {
            console.log(err)
            request.flash('error', `Nous n'avons pas réussi a récupéré les données existantes sur notre serveur`);
            response.redirect('/dashboardView');
        })
        // let resultFromEachDbbTables = {

        // }
    }

};



