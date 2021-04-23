let repoSellers = require('../repository/Sellers.js');
module.exports = class Home {
    print(request, response) {
        let repoSeller = new repoSellers();
        // console.log('ici 3')
        repoSeller.getallSellersinMyDbb().then(allSellersinMyDbb => {
            // on place allSellersinMyDbb qui est un un tableau comme variable a utilisé dans pug dans le rendu de la repose : { allSellersinMyDbb }
            // C'est ici qu on refere le chemin de la vue liste_homeview 
            response.render('home', { allSellersinMyDbb });
        });
    }

    printSingleArticle(request, response) {
        if (typeof request.params.slug !== "undefined") {
            let promise = (new repoSellers).getSellerBySlug(request.params.slug);
            promise.then((formContent) => {
                // formContent est la réposne de getSellerById
                response.render('listPages/singleOfferView', {
                    formInfoNewHome: formContent
                }
                );
            });
        } else {
            response.redirect('/');
        }
    }
};
