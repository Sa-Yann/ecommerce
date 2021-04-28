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
                // formContent est la réposne de getSellerBySlug
                response.render('listPages/singleOfferView', {
                    formInfoNewHome: formContent
                }
                );
            });
        } else {
            response.redirect('/');
        }
    }

    // Render the info from One Seller house
    print(request, response) {
        let repoSeller = new repoSellers();
        // console.log('ici 3')
        repoSeller.getallSellersinMyBdd().then(allSellersinMyDbb => {
            // on place allSellersinMyDbb qui est un un tableau comme variable a utilisé dans pug dans le rendu de la repose : { allSellersinMyDbb }
            // C'est ici qu on refere le chemin de la vue liste_homeview 
            response.render('home', { allSellersinMyDbb });
        });
    }


    list(request, response) {
        let repo = (new repoSellers(request));
        let page = parseInt(request.query.page) || 1;

        let limit = 10; // nombre d'éléments par page
        let offset = (limit * page) - limit;

        // countBy devra retourner le nombre d'éléments 
        // (il peut y avoir un filtre si il existe des criteres)
        repo.countBy({}).then((count) => {
            let last = Math.ceil(count / limit);
            // // le filtre sera le même que dans countBy
            repo.findBy({}, limit, offset).then((data) => {
                response.render('home', {
                    data,
                    page,
                    last
                });
            });
        });
    }




};




