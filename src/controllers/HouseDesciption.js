let repoSellers = require('../repository/Sellers.js');
module.exports = class Home {

    printSingleArticle(request, response) {
        if (typeof request.params.slug !== "undefined") {
            let promise = (new repoSellers).getSellerBySlug(request.params.slug);
            promise.then((singleHouseInfos) => {
                // formContent est la réposne de getSellerById
                response.render('listPages/singleOfferView', {
                    formInfoNewHome: singleHouseInfos
                }
                );
            });
        } else {
            response.redirect('/');
        }
    }

};




